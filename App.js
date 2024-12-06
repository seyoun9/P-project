import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainStack from './navigation/MainStack';
import AdminStack from './navigation/AdminStack';

const RootStack = createStackNavigator();

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // isAdmin 상태 변경에 따른 화면 전환
  useEffect(() => {
    console.log('isAdmin changed:', isAdmin);
  }, [isAdmin]);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAdmin ? (
          <RootStack.Screen name="AdminStack">
            {() => <AdminStack setIsAdmin={setIsAdmin} />}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name="MainStack">
            {() => <MainStack setIsAdmin={setIsAdmin} />}
          </RootStack.Screen>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
