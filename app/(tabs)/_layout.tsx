import {Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {

    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>

            {/* Static screen, not important. */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}
            />

            {/* Static screen, not important. */}
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="paperplane.fill" color={color}/>,
                }}
            />

            {/* Index matches no day ID specified and redirects to the actual first day. */}
            <Tabs.Screen
                name="events/days/index"
                options={{
                    // We match the index route and hide it in the tabs navigator, as it is a route that is only
                    // redirecting to the actual route.
                    href: null
                }}
            />

            {/* Matches all day IDs rendering them as the same component, preventing issues where navigation causes */}
            {/* an immediate re-render. */}
            <Tabs.Screen
                name="events/days/+not-found"
                options={{
                    // +not-found matches the days when we select it. But we link it to /events/days so the redirector
                    // component can handle going to the first day. This will also allow navigating directly to
                    // /events/days from anywhere else and have it go to the proper route.
                    title: 'Events',
                    href: `/events/days`
                }}
            />
        </Tabs>
    );
}
