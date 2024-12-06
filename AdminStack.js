import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminHomeScreen from '../screens/AdminHomeScreen';
import AdminAllUserScreen from '../screens/AdminAllUserScreen';
import SearchUserScreen from '../screens/SearchUserScreen';
import AdminInquiryListScreen from '../screens/AdminInquiryListScreen';
import AdminInquiryDetailListScreen from '../screens/AdminInquiryDetailListScreen';
import AdminChangePwScreen from '../screens/AdminChangePwScreen';

const Stack = createStackNavigator();

export default function AdminStack({ setIsAdmin }) {
  return (
    <Stack.Navigator initialRouteName="AdminHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminHome">
        {(props) => <AdminHomeScreen {...props} setIsAdmin={setIsAdmin} />}
      </Stack.Screen>
      <Stack.Screen name="AdminAllUser">
        {(props) => <AdminAllUserScreen {...props} setIsAdmin={setIsAdmin} />}
      </Stack.Screen>
      <Stack.Screen name="SearchUser">
        {(props) => <SearchUserScreen {...props} setIsAdmin={setIsAdmin} />}
      </Stack.Screen>
      <Stack.Screen name="AdminInquiryList">
        {(props) => <AdminInquiryListScreen {...props} setIsAdmin={setIsAdmin} />}
      </Stack.Screen>
      <Stack.Screen name="AdminInquiryDetailList">
  {(props) => <AdminInquiryDetailListScreen {...props} setIsAdmin={setIsAdmin} />}
</Stack.Screen>
      <Stack.Screen name="AdminChangePw">
      {(props) => <AdminChangePwScreen {...props} setIsAdmin={setIsAdmin} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
