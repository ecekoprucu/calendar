import { CssBaseline, ThemeProvider } from "@mui/material";
import Calendar from "./components/Calendar/Calendar";
import { CalendarProvider } from "./contexts/CalendarContext";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;
