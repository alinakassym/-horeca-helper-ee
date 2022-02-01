import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from './SignInScreen';
import {SignUpScreen} from './SignUpScreen';
import {WelcomeScreen} from './WelcomeScreen';
import {RegistrationScreen} from './RegistrationScreen';
import {ConfirmationCodeScreen} from './ConfirmationCodeScreen';
import {PasswordScreen} from './PasswordScreen';
import {CreatePasswordScreen} from './CreatePasswordScreen';
import {ResetPasswordScreen} from './ResetPasswordScreen';

const RootStack = createStackNavigator();

export const RootStackScreen = () => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="Welcome" component={WelcomeScreen} />
    <RootStack.Screen name="Registration" component={RegistrationScreen} />
    <RootStack.Screen
      name="ConfirmationCode"
      component={ConfirmationCodeScreen}
    />
    <RootStack.Screen name="CreatePassword" component={CreatePasswordScreen} />
    <RootStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <RootStack.Screen name="Password" component={PasswordScreen} />
    <RootStack.Screen name="SignIn" component={SignInScreen} />
    <RootStack.Screen name="SignUp" component={SignUpScreen} />
  </RootStack.Navigator>
);
