'use client'
import { CalendarContext } from "./CalendarContextProvider";
import React from "react";
export const UseAuthContext = () => {
    const {selectedDate, setSelectedDate, displayedDate, setDisplayedDate, events,
        setEvents} = React.useContext(CalendarContext)
    return {selectedDate, setSelectedDate, displayedDate, setDisplayedDate, events,
        setEvents};
}