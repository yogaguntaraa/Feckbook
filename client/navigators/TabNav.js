import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';


const Tab = createMaterialTopTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? "home-sharp"
              : "home-outline"
          } else if (route.name === 'Profile') {
            iconName = focused
              ? "person"
              : "person-outline"
          }
          return <Ionicons name={iconName} size={20} color={color} />;
        },
        tabBarActiveTintColor: "#3b5998",
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarIndicatorStyle: {
          backgroundColor: '#4267B2',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}