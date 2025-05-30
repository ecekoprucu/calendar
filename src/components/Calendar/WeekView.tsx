import { Box, Typography } from "@mui/material";
import { format, isToday, isSameDay, areIntervalsOverlapping } from "date-fns";
import { Event } from "../../types/Event";
import TimeColumn from "./TimeColumn";
import EventItem from "./EventItem";

interface WeekViewProps {
  weekDays: Date[];
  timeSlots: string[];
  events: Event[];
}

const WeekView = ({ weekDays, timeSlots, events }: WeekViewProps) => {
  // Calculate column width
  const colWidth = `calc(100% / ${weekDays.length})`;

  // Function to find events for a given day
  const getEventsForDay = (day: Date) => {
    return events.filter((event) => {
      // Events that start on this day
      if (isSameDay(event.start, day)) return true;

      // Events that continue from previous days
      if (event.start < day && event.end > day) return true;

      return false;
    });
  };

  // Function to calculate event position and width
  const calculateEventPositions = (dayEvents: Event[], day: Date) => {
    // Group overlapping events
    const eventGroups: Event[][] = [];

    for (const event of dayEvents) {
      // Check if this event overlaps with any existing group
      let addedToGroup = false;

      for (const group of eventGroups) {
        // Check if event overlaps with any event in this group
        const overlapsWithGroup = group.some((groupEvent) =>
          areIntervalsOverlapping(
            { start: event.start, end: event.end },
            { start: groupEvent.start, end: groupEvent.end }
          )
        );

        if (overlapsWithGroup) {
          group.push(event);
          addedToGroup = true;
          break;
        }
      }

      // If not added to any existing group, create a new group
      if (!addedToGroup) {
        eventGroups.push([event]);
      }
    }

    // Calculate position and width for each event in each group
    const positionedEvents = dayEvents.map((event) => {
      // Find the group this event belongs to
      const group = eventGroups.find((g) => g.includes(event))!;
      const index = group.indexOf(event);
      const width = 100 / group.length;
      const left = index * width;

      return {
        ...event,
        width: `${width}%`,
        left: `${left}%`,
        day,
      };
    });

    return positionedEvents;
  };

  return (
    <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* Time labels column */}
      <TimeColumn timeSlots={timeSlots} />

      {/* Day columns */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          // overflow: "auto",
          position: "relative",
        }}
      >
        {/* Day headers */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 2,
            bgcolor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "divider",
            width: "calc(100vw - 60px)",
            height: 90,
            justifyContent: "flex-end",
          }}
        >
          {weekDays.map((day) => (
            <Box
              key={day.toISOString()}
              sx={{
                width: colWidth,
                py: 1.5,
                px: 1,
                textAlign: "center",
                borderRight: "1px solid",
                borderColor: "divider",
                bgcolor: isToday(day) ? "primary.light" : "background.paper",
                color: isToday(day) ? "primary.contrastText" : "text.primary",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                {format(day, "EEE")}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: isToday(day) ? 600 : 400,
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  mx: "auto",
                  ...(isToday(day) && {
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                  }),
                }}
              >
                {format(day, "d")}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Time grid with events */}
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            position: "relative",
            top: 90,
            justifyContent: "flex-end",
            // height: timeSlots.length * 50,
          }}
        >
          {weekDays.map((day) => {
            const dayEvents = getEventsForDay(day);
            const positionedEvents = calculateEventPositions(dayEvents, day);

            return (
              <Box
                key={day.toISOString()}
                sx={{
                  width: colWidth,
                  position: "relative",
                  borderRight: "1px solid",
                  borderColor: "divider",
                }}
              >
                {/* Time grid cells */}
                {timeSlots.map((time, index) => (
                  <Box
                    key={`${day.toISOString()}-${time}`}
                    sx={{
                      height: 50,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      bgcolor:
                        index % 2 === 0
                          ? "background.paper"
                          : "background.default",
                    }}
                  />
                ))}

                {/* Events */}
                {positionedEvents.map((positionedEvent) => (
                  <EventItem
                    key={positionedEvent.id}
                    event={positionedEvent}
                    day={day}
                    timeSlots={timeSlots}
                  />
                ))}
              </Box>
            );
          })}

          {/* Current time indicator */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${
                ((new Date().getHours() * 60 + new Date().getMinutes()) / 60) *
                  100 +
                50 // Addition of top 30 mins
              }px`,
              height: 2,
              bgcolor: "error.main",
              zIndex: 1,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WeekView;
