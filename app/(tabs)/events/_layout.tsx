import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DayScreen from "@/app/(tabs)/events/[day]";
import {useContext} from "react";
import {DataContxt} from "@/app/_layout";

const Tab = createMaterialTopTabNavigator();

export default function EventsScreen() {
    const data = useContext(DataContxt);

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
