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
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useCalendar } from "../../hooks/useCalendar";
import { GithubPicker } from "react-color";
import { useCallback, useMemo, useState } from "react";
import { addDays, isBefore, isValid } from "date-fns";
import { DateTimePicker } from "@mui/x-date-pickers";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { isEmpty } from "lodash";
import { enqueueSnackbar } from "notistack";

interface CreateEventModalProps {
  onClose: () => void;
}

const CreateEventModal = ({ onClose }: CreateEventModalProps) => {
  const { addEvent } = useCalendar();

  const [formValues, setFormValues] = useState({
    title: "",
    start: new Date(),
    end: addDays(new Date(), 1),
    color: "#B80000",
    description: "",
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

  const handleAddNewEvent = useCallback(() => {
    addEvent(formValues);

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
      <DialogTitle>Add New Event</DialogTitle>
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
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  "data-testid": "startDate",
                } as Partial<TextFieldProps>,
              }}
            />
          </Box>
          <Box>
            <Typography fontWeight={500} variant="body2">
              End Date
            </Typography>
            <DateTimePicker
              data-testid="endDate"
              onChange={(date) => changeFormValues("end", date)}
              value={formValues.end}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  "data-testid": "startDate",
                } as Partial<TextFieldProps>,
              }}
            />
          </Box>
          <Box>
            <Typography mb={1} fontWeight={500} variant="body2">
              Color
            </Typography>
            <GithubPicker
              width="100%"
              onChangeComplete={(color) => changeFormValues("color", color.hex)}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleAddNewEvent}
          disabled={shouldDisableAddButton}
          variant="contained"
        >
          Add Event
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateEventModal;
