import { createContext, useState, useCallback, ReactNode } from "react";
import { addDays, startOfWeek, endOfWeek, addWeeks } from "date-fns";
import { Event } from "../types/Event";
import { v4 as uuidv4 } from "uuid";

export interface CalendarContextType {
  currentDate: Date;
  events: Event[];
  weekStart: Date;
  weekEnd: Date;
  weekDays: Date[];
  timeSlots: string[];
  nextWeek: () => void;
  previousWeek: () => void;
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  goToToday: () => void;
}

export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

// Generate time slots from 00:00 to 23:30 in 30-minute increments
const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    slots.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return slots;
};

// Mock events data
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Meeting with Design Team",
    start: new Date(new Date("2025-05-29").setHours(10, 0, 0, 0)),
    end: new Date(new Date("2025-05-29").setHours(11, 30, 0, 0)),
    color: "#0077FF",
    description: "Discuss new design system",
  },
  {
    id: "2",
    title: "Lunch with John",
    start: new Date(new Date("2025-05-29").setHours(12, 0, 0, 0)),
    end: new Date(new Date("2025-05-29").setHours(13, 0, 0, 0)),
    color: "#FF9500",
    description: "First of overlapping events",
  },
  {
    id: "3",
    title: "Product Review",
    start: new Date(new Date("2025-05-29").setHours(14, 0, 0, 0)),
    end: new Date(new Date("2025-05-29").setHours(15, 30, 0, 0)),
    color: "#34C759",
    description: "Quarterly product review",
  },
  {
    id: "4",
    title: "Multi-day Event",
    start: new Date(new Date("2025-05-29").setHours(16, 0, 0, 0)),
    end: new Date(new Date("2025-05-30").setHours(11, 0, 0, 0)),
    color: "#5AC8FA",
    description: "Event continuing the next day",
  },
  {
    id: "5",
    title: "Overlapping Event 1",
    start: new Date(new Date("2025-05-29").setHours(11, 0, 0, 0)),
    end: new Date(new Date("2025-05-29").setHours(13, 0, 0, 0)),
    color: "#FF3B30",
    description: "Second overlapping event",
  },
  {
    id: "6",
    title: "Overlapping Event 2",
    start: new Date(new Date("2025-05-29").setHours(12, 30, 0, 0)),
    end: new Date(new Date("2025-05-29").setHours(14, 30, 0, 0)),
    color: "#AF52DE",
    description: "Another overlapping event",
  },
];

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>(mockEvents);

  // Calculate week start and end dates
  // Start from Monday instead of Sunday
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });

  // Generate array of dates for the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Generate time slots
  const timeSlots = generateTimeSlots();

  // Navigation functions
  const nextWeek = useCallback(() => {
    setCurrentDate((prevDate) => addWeeks(prevDate, 1));
  }, []);

  const previousWeek = useCallback(() => {
    setCurrentDate((prevDate) => addWeeks(prevDate, -1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // Event management functions
  const addEvent = useCallback((event: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...event,
      id: uuidv4(),
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }, []);

  const updateEvent = useCallback((updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  }, []);

  const value = {
    currentDate,
    events,
    weekStart,
    weekEnd,
    weekDays,
    timeSlots,
    nextWeek,
    previousWeek,
    addEvent,
    updateEvent,
    deleteEvent,
    goToToday,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
