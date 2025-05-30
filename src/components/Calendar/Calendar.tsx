import { Box, Paper } from "@mui/material";
import CalendarHeader from "./CalendarHeader";
import WeekView from "./WeekView";
import { useCalendar } from "../../hooks/useCalendar";

const Calendar = () => {
  const { events, weekDays, timeSlots } = useCalendar();

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        bgcolor: "background.default",
      }}
    >
      <CalendarHeader />
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <WeekView weekDays={weekDays} timeSlots={timeSlots} events={events} />
      </Box>
    </Paper>
  );
};

export default Calendar;
