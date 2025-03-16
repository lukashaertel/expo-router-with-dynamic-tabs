import {Image, StyleSheet, Platform} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {Link, RelativePathString} from "expo-router";
import {useContext} from "react";
import {DataContxt} from "@/app/_layout";

export default function HomeScreen() {
    const data = useContext(DataContxt);
    const ids = data.days.map(item => item.Id);
    
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
                <ThemedText type="title">Welcome!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedText><Link href={"/events" as RelativePathString}>Events root</Link></ThemedText>
            <ThemedText><Link href={`/events/${ids[0]}` as RelativePathString}>First day</Link></ThemedText>
            <ThemedText><Link href={`/events/${ids.at(-1)}` as RelativePathString}>Last day</Link></ThemedText>
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
