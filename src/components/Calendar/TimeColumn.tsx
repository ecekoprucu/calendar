import { Box, Typography } from "@mui/material";

interface TimeColumnProps {
  timeSlots: string[];
}

const TimeColumn = ({ timeSlots }: TimeColumnProps) => {
  return (
    <Box
      sx={{
        width: 60,
        flexShrink: 0,
        borderRight: "1px solid",
        borderColor: "divider",
        position: "relative",
        left: 0,
        zIndex: 1,
        bgcolor: "background.paper",
        overflow: "inherit",
      }}
    >
      {/* Empty space to align with day headers */}
      <Box sx={{ height: 90 }} />

      {/* Time labels */}
      {timeSlots.map((time) => (
        <Box
          key={time}
          sx={{
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 50,
            borderColor: "divider",
            position: "relative",
            // Hide :30s
            ...(time.endsWith(":30") && {
              "& > *": {
                visibility: "hidden",
              },
            }),
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              position: "absolute",
              right: 8,
              top: -10,
            }}
          >
            {time}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TimeColumn;
