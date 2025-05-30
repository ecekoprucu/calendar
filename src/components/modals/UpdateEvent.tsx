import { useCallback, useMemo, useState } from "react";
import { useCalendar } from "../../hooks/useCalendar";
import { Event } from "../../types/Event";
import { addDays, isBefore, isValid } from "date-fns";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { enqueueSnackbar } from "notistack";
import { isEmpty } from "lodash";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

interface UpdateEventProps {
  data: Event | null;
  onClose: () => void;
}

const UpdateEventModal = ({ data, onClose }: UpdateEventProps) => {
  const { updateEvent } = useCalendar();

  const [formValues, setFormValues] = useState({
    id: data?.id ?? "",
    title: data?.title ?? "",
    start: data?.start ?? new Date(),
    end: data?.end ?? addDays(new Date(), 1),
    color: data?.color ?? "#B80000",
    description: data?.description ?? "",
  });

  const changeFormValues = useCallback(
    (key: string, value: string | PickerValue) => {
      setFormValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handleUpdateEvent = useCallback(() => {
    updateEvent(formValues);

    enqueueSnackbar("Event successfully added", {
      variant: "success",
    });

    onClose();
  }, [formValues]);

  const shouldDisableAddButton = useMemo(
    () =>
      isEmpty(formValues.title) ||
      !isValid(formValues.start) ||
      !isValid(formValues.end) ||
      !isBefore(formValues.start, formValues.end),
    [formValues]
  );

  return (
    <>
      <DialogTitle>Update Event</DialogTitle>
      <DialogContent>
        <Stack direction="column" gap={1}>
          <FormControl>
            <InputLabel variant="standard" htmlFor="title">
              Name
            </InputLabel>
            <Input
              onChange={(e) => changeFormValues("title", e.target.value)}
              value={formValues.title}
              id="title"
              placeholder="Enter Title"
            />
          </FormControl>
          <FormControl>
            <InputLabel variant="standard" htmlFor="description">
              Description
            </InputLabel>
            <Input
              onChange={(e) => changeFormValues("description", e.target.value)}
              value={formValues.description}
              id="description"
              placeholder="Enter Description"
            />
          </FormControl>
        </Stack>
        <Stack gap={1} mt={2}>
          <Box>
            <Typography fontWeight={500} variant="body2">
              Start Date
            </Typography>
            <DateTimePicker
              onChange={(date) => changeFormValues("start", date)}
              value={formValues.start}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </Box>
          <Box>
            <Typography fontWeight={500} variant="body2">
              End Date
            </Typography>
            <DateTimePicker
              onChange={(date) => changeFormValues("end", date)}
              value={formValues.end}
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleUpdateEvent}
          disabled={shouldDisableAddButton}
          variant="contained"
        >
          Update Event
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default UpdateEventModal;
