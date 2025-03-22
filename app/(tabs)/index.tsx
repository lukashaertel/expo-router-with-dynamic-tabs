import {Image, StyleSheet} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Link, RelativePathString} from "expo-router";
import {useContext} from "react";
import {DataContxt} from "@/app/_layout";

export default function HomeScreen() {
    const data = useContext(DataContxt);

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
                <ThemedText type="title">Navigate to a day</ThemedText>
            </ThemedView>

            {/* Top level link without a day ID, handled by redirect. */}
            <ThemedText type="defaultSemiBold">
                <Link href="/events/days">Event days</Link>
            </ThemedText>

            {/* Render a list of links to the individual days. */}
            {data.days.map(item => <ThemedText key={item.Id}>
                <Link href={`/events/days/${item.Id}` as RelativePathString}>{item.Name}</Link>
            </ThemedText>)}
        </ParallaxScrollView>
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
