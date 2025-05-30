import { CssBaseline, ThemeProvider } from "@mui/material";
import Calendar from "./components/Calendar/Calendar";
import { CalendarProvider } from "./contexts/CalendarContext";
import { theme } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV2";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CalendarProvider>
          <SnackbarProvider>
            <Calendar />
          </SnackbarProvider>
        </CalendarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
