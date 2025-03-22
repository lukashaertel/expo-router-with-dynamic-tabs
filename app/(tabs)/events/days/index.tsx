import {useContext} from "react";
import {DataContxt} from "@/app/_layout";
import {Redirect, RelativePathString} from "expo-router";

export default function DaysRedirector() {
    // Get the first day. Ignore redirect if there's no data yet, we shouldn't be here then.
    const firstDay = useContext(DataContxt).days[0]?.Id;
    if (!firstDay) return null;

    // Redirect to the first actual day, this goes to +not-found.
    return <Redirect href={`/events/days/${firstDay}` as RelativePathString}/>
}