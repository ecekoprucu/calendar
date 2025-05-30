import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Add, Today } from "@mui/icons-material";
import { format, isSameDay } from "date-fns";
import { useCalendar } from "../../hooks/useCalendar";

const CalendarHeader = () => {
  const { currentDate, previousWeek, nextWeek, goToToday } = useCalendar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 600,
              mr: 2,
              display: { xs: "none", sm: "block" },
            }}
          >
            Calendar
          </Typography>

          <Button
            variant="contained"
            startIcon={<Today />}
            onClick={goToToday}
            disabled={isSameDay(currentDate, new Date())}
            sx={{
              mr: 2,
              minWidth: isMobile ? "auto" : undefined,
              px: isMobile ? 1 : 2,
            }}
          >
            {isMobile ? "" : "Today"}
          </Button>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={previousWeek} size="small">
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={nextWeek} size="small">
              <ChevronRight />
            </IconButton>
          </Box>

          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              fontWeight: 500,
              ml: 2,
              fontSize: { xs: "0.9rem", sm: "1.25rem" },
            }}
          >
            {format(currentDate, "MMMM yyyy")}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          sx={{
            minWidth: isMobile ? "auto" : undefined,
            px: isMobile ? 1 : 2,
          }}
        >
          {isMobile ? "" : "Create"}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default CalendarHeader;
