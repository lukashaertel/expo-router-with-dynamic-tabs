import {useContext} from "react";
import {DataContxt} from "@/app/_layout";
import {Redirect, RelativePathString} from "expo-router";

export default function TracksRedirector() {
    // Get the first track. Ignore redirect if there's no data yet, we shouldn't be here then.
    const firstTrack = useContext(DataContxt).tracks[0]?.Id;
    if (!firstTrack) return null;

    // Redirect to the first actual track, this goes to +not-found.
    return <Redirect href={`/events/tracks/${firstTrack}` as RelativePathString}/>
}