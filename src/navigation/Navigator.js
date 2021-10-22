import React from 'react';
import {JobsScreen} from '../screens/jobs/JobsScreen';
import {RatingScreen} from '../screens/rating/RatingScreen';
import {MessagesScreen} from '../screens/messages/MessagesScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {ProfileEditScreen} from '../screens/profile/ProfileEditScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconVacancies} from '../assets/icons/tabs/IconVacancies';
import {IconRating} from '../assets/icons/tabs/IconRating';
import {IconNotifications} from '../assets/icons/tabs/IconNotifications';
import {IconProfile} from '../assets/icons/tabs/IconProfile';
import {StyleSheet} from 'react-native';

export const Navigator = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Jobs"
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            bottom: 12,
          },
          tabBarActiveTintColor: '#185AB7',
          tabBarStyle: {
            height: 68,
          },
          tabBarBadgeStyle: {
            top: 12,
            left: 0,
          },
        }}>
        <Tab.Screen
          name="Jobs"
          component={JobsScreen}
          options={{
            tabBarLabel: 'Jobs',
            tabBarIcon: ({focused, color}) => {
              return <IconVacancies color={color} size={28} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Rating"
          component={RatingScreen}
          options={{
            tabBarLabel: 'Rating',
            tabBarIcon: ({focused, color}) => {
              return <IconRating color={color} size={28} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarLabel: 'Messages',
            tabBarBadge: 10,
            tabBarIcon: ({focused, color}) => {
              return <IconNotifications color={color} size={28} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({focused, color}) => {
              return <IconProfile color={color} size={28} width={1.5} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="App">
      <Stack.Group screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Tab" component={TabStack} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          options={{
            headerTitle: 'Profile',
          }}
          name="ProfileEditScreen" component={ProfileEditScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    width: 54,
    borderRadius: 27,
  },
  shadow: {
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
