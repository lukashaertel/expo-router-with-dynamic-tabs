import ParallaxScrollView from "@/components/ParallaxScrollView";
import {Image, StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useCallback, useContext, useMemo} from "react";
import {DataContxt, Track} from "@/app/_layout";
import {RelativePathString, router, usePathname} from 'expo-router';
import {useWindowDimensions} from 'react-native';
import {TabView} from 'react-native-tab-view';
import * as React from "react";

/**
 * Track rendering component. This is "technically" a tab view, not a screen.
 * @param track The track, passed from scene map.
 * @constructor
 */
function TrackScreen({track}: { track: Track }) {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{track.Name}</ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

function trackTabTitle(track: Track) {
    return track.Name;
}

/**
 * Handles rendering of the track tab view. As it's the +not-found route, it will remain the same instance instead of
 * creating a new instance (which would happen if we used a dynamic route). This way, animation integration still keeps
 * working.
 * @constructor
 */
export default function TracksScreen() {
    // Get parameter. We need to use pathname, as segments will return +not-found, and we need the actual ID. This
    // should probably be matched better than assuming matches here.
    const track = usePathname().substring('/events/tracks/'.length);

    // Get "convention data".
    const data = useContext(DataContxt);

    // Create a scene renderer that binds all tracks to a track-screen component with the respective property assigned.
    // We should not use a scene map according to https://reactnavigation.org/docs/tab-view/#api-reference.
    const renderScene = useCallback(({route}: { route: { key: string } }) => {
        const item = data.tracks.find(item => item.Id == route.key);
        if (!item) return null;
        return <TrackScreen track={item}/>
    }, [data.tracks]);

    // Create routes from the current list of tracks.
    const routes = useMemo(
        () => data.tracks.map(item => ({key: item.Id, title: trackTabTitle(item)})),
        [data.tracks])

    // Layout is used to determine the initial width of the tabs.
    const layout = useWindowDimensions();

    // Index is retrieved by finding the matching track index. If nothing is found, -1 is returned from the index. We
    // just clamp min to zero so we don't access out of bounds.
    const index = Math.max(0, data.tracks.findIndex(item => item.Id === track));

    // Render as a native tab view. Changing the index uses the actual expo-router navigation, which then goes back
    // to this exact component (as it won't be found), and updates the index via the method above.
    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={index => router.replace(`/events/tracks/${data.tracks[index].Id}` as RelativePathString)}
            initialLayout={{width: layout.width}}
        />
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
