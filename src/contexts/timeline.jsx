import { createContext, useContext, useState } from "react";

const initialState = {
    timeline: [],
    setTimeline: () => null,
};

const TimelineContext = createContext(initialState);
export const useTimelineContext = () => useContext(TimelineContext);

export default function TimelineProvider({ children }) {
    const [timeline, setTimeline] = useState([]);

    return (
        <TimelineContext.Provider value={{ timeline, setTimeline }}>
            {children}
        </TimelineContext.Provider>
    );
}
