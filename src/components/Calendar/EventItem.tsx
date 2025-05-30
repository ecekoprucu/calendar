import { MouseEvent, useState } from "react";
import { Box, Typography, Paper, Popover, Button } from "@mui/material";
import { Event } from "../../types/Event";
import {
  format,
  differenceInMinutes,
  startOfDay,
  isSameDay,
  isAfter,
  isBefore,
  endOfDay,
} from "date-fns";
import { ENUM_MODAL_UPDATE_EVENT } from "../../enums/modals";

interface EventItemProps {
  event: Event & {
    width?: string;
    left?: string;
  };
  day: Date;
  timeSlots: string[];
  handleOpenDialog: (data: Event | null, type: string) => void;
}

const EventItem = ({ event, day, handleOpenDialog }: EventItemProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Determine if event starts before this day
  const eventStartsBeforeDay = isBefore(event.start, startOfDay(day));
  // Determine if event ends after this day
  const eventEndsAfterDay = isAfter(event.end, endOfDay(day));

  // Calculate visible start time
  const visibleStart = eventStartsBeforeDay ? startOfDay(day) : event.start;
  // Calculate visible end time
  const visibleEnd = eventEndsAfterDay ? endOfDay(day) : event.end;

  // Calculate top position based on start time
  const startMinutes = visibleStart.getHours() * 60 + visibleStart.getMinutes();
  const top = (startMinutes / 60) * 100;

  // Calculate height based on duration
  const durationMinutes = differenceInMinutes(visibleEnd, visibleStart);
  const height = (durationMinutes / 60) * 100; // 60 (minutes) * 100 (px height of an hour)

  // Determine if this is a continuation from previous day
  const isContinuationStart = eventStartsBeforeDay;
  // Determine if this event continues to the next day
  const isContinuationEnd = eventEndsAfterDay;

  return (
    <>
      <Paper
        elevation={1}
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: `${top + 50}px`, // 50 px buffer because a day has 30 mins from top (100px = 1 hour, 50px = 30mins)
          height: `${height}px`,
          left: event.left || "0",
          width: event.width || "100%",
          bgcolor: event.color || "primary.main",
          color: "#fff",
          padding: "4px 8px",
          overflow: "hidden",
          cursor: "pointer",
          transition: "box-shadow 0.2s ease, transform 0.1s ease",
          zIndex: open ? 10 : 1,
          "&:hover": {
            boxShadow: 3,
            transform: "scale(1.01)",
          },
          ...(isContinuationStart && {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            top: 0,
            height: `${height + 50}px`, // Add 50 px buffer because of the top 30 mins
          }),
          ...(isContinuationEnd && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }),
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
          {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            lineHeight: 1.2,
          }}
        >
          {event.title}
        </Typography>
        {durationMinutes > 30 && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              opacity: 0.9,
              lineHeight: 1.2,
            }}
          >
            {event.description || ""}
          </Typography>
        )}
      </Paper>

      {/* Event details popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, mb: 1, color: event.color }}
          >
            {event.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            {format(event.start, "EEEE, MMMM d, yyyy • h:mm a")} -
            {isSameDay(event.start, event.end)
              ? format(event.end, " h:mm a")
              : format(event.end, " EEEE, MMMM d, yyyy • h:mm a")}
          </Typography>
          {event.description && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              {event.description}
            </Typography>
          )}
          <Button
            onClick={() => handleOpenDialog(event, ENUM_MODAL_UPDATE_EVENT)}
            variant="contained"
          >
            Update Event
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default EventItem;
