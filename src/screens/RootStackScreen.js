import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from './SignInScreen';
import {SignUpScreen} from './SignUpScreen';

const RootStack = createStackNavigator();

export const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </RootStack.Navigator>
);
