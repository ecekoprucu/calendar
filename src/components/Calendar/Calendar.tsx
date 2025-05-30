import { Box, Paper, Dialog } from "@mui/material";
import CalendarHeader from "./CalendarHeader";
import WeekView from "./WeekView";
import { useCalendar } from "../../hooks/useCalendar";
import { useCallback, useMemo, useState } from "react";
import { Event } from "../../types/Event";
import {
  ENUM_MODAL_ADD_EVENT,
  ENUM_MODAL_UPDATE_EVENT,
} from "../../enums/modals";
import CreateEventModal from "../modals/CreateEvent";
import UpdateEventModal from "../modals/UpdateEvent";

interface DialogOptionsProps {
  isOpen: boolean;
  type: string | null;
  data: Event | null;
}

const Calendar = () => {
  const { events, weekDays, timeSlots } = useCalendar();

  const [dialogOptions, setDialogOptions] = useState<DialogOptionsProps>({
    isOpen: false,
    data: null,
    type: null,
  });

  const handleOpenDialog = useCallback((data: Event | null, type: string) => {
    setDialogOptions({
      isOpen: true,
      data,
      type,
    });
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOptions((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const innerDialogComponent = useMemo(() => {
    switch (dialogOptions.type) {
      case ENUM_MODAL_ADD_EVENT:
        return <CreateEventModal onClose={handleCloseDialog} />;
      case ENUM_MODAL_UPDATE_EVENT:
        return (
          <UpdateEventModal
            data={dialogOptions.data}
            onClose={handleCloseDialog}
          />
        );
      default:
        return <></>;
    }
  }, [dialogOptions, handleCloseDialog]);

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
      <CalendarHeader handleOpenDialog={handleOpenDialog} />
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <WeekView
          handleOpenDialog={handleOpenDialog}
          weekDays={weekDays}
          timeSlots={timeSlots}
          events={events}
        />
      </Box>
      <Dialog open={dialogOptions.isOpen} onClose={handleCloseDialog}>
        {innerDialogComponent}
      </Dialog>
    </Paper>
  );
};

export default Calendar;
