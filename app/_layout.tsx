import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack, useNavigationContainerRef, usePathname} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {createContext, useEffect, useState} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export interface Day {
    Name: string
    Date: string
    LastChangeDateTimeUtc: string
    Id: string
}

export const DataContxt = createContext({
    days: [] as Day[]
})

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    // const pathname = usePathname();

    const [days, setDays] = useState<Day[]>([]);

    useEffect(() => {
        fetch('https://app.eurofurence.org/EF28/Api/EventConferenceDays')
            .then(res => res.json())
            .then(res => setDays(res));
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);


    const navigationContainerReference = useNavigationContainerRef();

    // useEffect(()=>{
    //     if(pathname.startsWith("/events/")){
    //         navigationContainerReference.navigate('events',{screen:pathname.substring(8)});
    //     }
    // },[navigationContainerReference, pathname])

    if (!loaded || !days.length) {
        return null;
    }


    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <DataContxt.Provider value={{days}}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found"/>
                </Stack>
                <StatusBar style="auto"/>
            </DataContxt.Provider>
        </ThemeProvider>
    );
}
