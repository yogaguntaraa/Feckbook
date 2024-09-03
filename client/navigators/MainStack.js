import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import PostScreen from '../screens/Post';
import DetailScreen from '../screens/DetailPost';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './TabNav';
// import { useContext, useState } from 'react';
// import AuthContext from '../App'

const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main" component={TabNav} options={{ headerShown: false }} />
            <Stack.Screen
                name="Post" component={PostScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="DetailPost" component={DetailScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
                name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}