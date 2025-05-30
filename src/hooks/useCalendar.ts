import { useContext } from "react";
import {
  CalendarContext,
  CalendarContextType,
} from "../contexts/CalendarContext";

export const useCalendar = (): CalendarContextType => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("context not found");
  }
  return context;
};
