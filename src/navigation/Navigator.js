import React from 'react';
import {JobsScreen} from '../screens/jobs/JobsScreen';
import {JobsFilterScreen} from '../screens/jobs/JobsFilterScreen';
import {JobScreen} from '../screens/jobs/JobScreen';
import {RatingScreen} from '../screens/rating/RatingScreen';
import {MessagesScreen} from '../screens/messages/MessagesScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {ProfileEditScreen} from '../screens/profile/ProfileEditScreen';
import {AddWorkScreen} from '../screens/profile/AddWorkScreen';
import {EditWorkScreen} from '../screens/profile/EditWorkScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconVacancies} from '../assets/icons/tabs/IconVacancies';
import {IconRating} from '../assets/icons/tabs/IconRating';
import {IconNotifications} from '../assets/icons/tabs/IconNotifications';
import {IconProfile} from '../assets/icons/tabs/IconProfile';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

export const Navigator = () => {
  useSelector(state => state.jobs.filter);
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Profile"
        screenListeners={{
          state: e => {
            console.log('state changed', e.data.state.history);
          },
          blur: e => {
            console.log('blur: ', e);
          },
        }}
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            bottom: 0, // note: 0 is for iOS, Android might need 12 here
          },
          tabBarActiveTintColor: '#185AB7',
          tabBarStyle: {
            // note: don't set height, or set screen-specific heights
            marginBottom: 2,
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
      initialRouteName="App"
      screenOptions={{
        headerTintColor: '#185AB7',
        headerTitleStyle: {
          color: '#333333',
        },
      }}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Back" component={TabStack} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          options={{
            headerTitle: 'Filters',
          }}
          name="JobsFilterScreen"
          component={JobsFilterScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Job',
          }}
          name="JobScreen"
          component={JobScreen}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          options={{
            headerTitle: 'Profile',
          }}
          name="ProfileEditScreen"
          component={ProfileEditScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Add work',
          }}
          name="AddWorkScreen"
          component={AddWorkScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Edit work',
          }}
          name="EditWorkScreen"
          component={EditWorkScreen}
        />
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
