import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import JoinScreen from '../screens/JoinScreen';
import FindPwScreen from '../screens/FindPwScreen';
import ChangePwScreen from '../screens/ChangePwScreen';
import RecomBookScreen from '../screens/RecomBookScreen';
import DetailsBookScreen from '../screens/DetailsBookScreen';
import SearchBookScreen from '../screens/SearchBookScreen';
import ChatBookScreen from '../screens/ChatBookScreen';
import LibrBookScreen from '../screens/LibrBookScreen';
import ServiceScreen1 from '../screens/ServiceScreen1';
import ServiceScreen2 from '../screens/ServiceScreen2';
import ListMainScreen from '../screens/ListMainScreen';
import ListDetailScreen from '../screens/ListDetailScreen';

const Stack = createStackNavigator();

export default function MainStack({ setIsAdmin }) {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setIsAdmin={setIsAdmin} />}
      </Stack.Screen>
      <Stack.Screen name="ChangePw" component={ChangePwScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="FindPw" component={FindPwScreen} />
      <Stack.Screen name="RecomBook" component={RecomBookScreen} />
      <Stack.Screen name="DetailsBook" component={DetailsBookScreen} />
      <Stack.Screen name="SearchBook" component={SearchBookScreen} />
      <Stack.Screen name="ChatBook" component={ChatBookScreen} />
      <Stack.Screen name="LibrBook" component={LibrBookScreen} />
      <Stack.Screen name="Service1" component={ServiceScreen1} />
      <Stack.Screen name="Service2" component={ServiceScreen2} />
      <Stack.Screen name="ListMain" component={ListMainScreen} />
      <Stack.Screen name="ListDetail" component={ListDetailScreen} />
    </Stack.Navigator>
  );
}
