import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {usePathname, useNavigation, useNavigationContainerRef, useFocusEffect} from "expo-router";
import DayScreen from "@/app/(tabs)/events/[day]";
import {useCallback, useContext, useEffect} from "react";
import {DataContxt} from "@/app/_layout";

const Tab = createMaterialTopTabNavigator();

export default function EventsScreen() {
    const data = useContext(DataContxt);

    const ids = data.days.map(item => item.Id);
    const arg = usePathname();
    const name = arg.split('/').at(-1) ?? ids[0];
    const nameUse = ids.includes(name) ? name : ids[0];
    

    return (
        <Tab.Navigator>
            {data.days.map(item =>
                <Tab.Screen
                    key={item.Id} name={item.Id}
                    component={DayScreen}
                    options={{title: item.Name}}/>
            )}
        </Tab.Navigator>
    );
}
