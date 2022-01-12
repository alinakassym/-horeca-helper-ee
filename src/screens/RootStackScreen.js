import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WelcomeScreen} from './WelcomeScreen';
import {SignInScreen} from './SignInScreen';
import {SignUpScreen} from './SignUpScreen';

const RootStack = createStackNavigator();

export const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="Welcome" component={WelcomeScreen} />
    <RootStack.Screen name="SignIn" component={SignInScreen} />
    <RootStack.Screen name="SignUp" component={SignUpScreen} />
  </RootStack.Navigator>
);
