import { render, fireEvent, screen } from "@testing-library/react";
import { CalendarProvider } from "../../contexts/CalendarContext";
import { SnackbarProvider } from "notistack";
import Calendar from "../Calendar/Calendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV2";

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date("2025-07-15"));

  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarProvider>
        <SnackbarProvider>
          <Calendar />
        </SnackbarProvider>
      </CalendarProvider>
    </LocalizationProvider>
  );
});

afterEach(() => {
  jest.useRealTimers();
});

test("renders calendar with current week", () => {
  expect(screen.getByText("July 2025"));
});

test("create button exists", () => {
  expect(screen.getByText("Create"));
});

test("renders Add New Event modal", () => {
  const createButton = screen.getByText("Create");

  fireEvent.click(createButton);

  expect(screen.getByText("Add New Event"));
});
