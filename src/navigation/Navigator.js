import React from 'react';

// Screens
// jobs screens
import {JobsScreen} from '../screens/jobs/JobsScreen';
import {JobsFilterScreen} from '../screens/jobs/JobsFilterScreen';
import {JobScreen} from '../screens/jobs/JobScreen';

// rating screens
import {RatingScreen} from '../screens/rating/RatingScreen';

// messages screens
import {MessagesScreen} from '../screens/messages/MessagesScreen';
import {MessagesChatScreen} from '../screens/messages/MessagesChatScreen';

// profile screens
import {AddWorkScreen} from '../screens/profile/AddWorkScreen';
import {EditWorkScreen} from '../screens/profile/EditWorkScreen';
import {ProfileEditScreen} from '../screens/profile/ProfileEditScreen';
import {ProfileScreen} from '../screens/profile/ProfileScreen';
import {ProfileWorkScreen} from '../screens/profile/ProfileWorkScreen';

// Icons
import {IconSearch} from '../assets/icons/tabs/IconSearch';
import {IconRating} from '../assets/icons/tabs/IconRating';
import {IconMessages} from '../assets/icons/tabs/IconMessages';
import {IconProfile} from '../assets/icons/tabs/IconProfile';

// Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Redux
import {useSelector} from 'react-redux';

export const Navigator = () => {
  useSelector(state => {
    const {jobs} = state;
    return jobs.filter;
  });
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const screenOptions = {
    headerTintColor: '#185AB7',
    headerTitleStyle: {
      color: '#333333',
    },
  };

  const TabStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Profile"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#151F47',
          tabBarInactiveTintColor: '#B9C1CA',
          tabBarStyle: {
            // note: don't set height, or set screen-specific heights
            marginBottom: 2,
            shadowColor: '#151F47',
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
              height: 5,
            },
            elevation: 4,
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
            headerShown: false,
            tabBarLabel: 'Jobs',
            tabBarIcon: ({color}) => {
              return <IconSearch color={color} size={24} width={3} />;
            },
          }}
        />
        <Tab.Screen
          name="Rating"
          component={RatingScreen}
          options={{
            tabBarLabel: 'Rating',
            tabBarIcon: ({color}) => {
              return <IconRating color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesScreen}
          options={{
            tabBarLabel: 'Messages',
            tabBarBadge: 10,
            tabBarBadgeStyle: {
              top: 4,
              left: 0,
              backgroundColor: '#EC4C47',
            },
            tabBarIcon: ({color}) => {
              return <IconMessages color={color} size={24} width={1.5} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => {
              return <IconProfile color={color} size={24} width={1.5} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={screenOptions}
      screenListeners={{
        state: e => {
          console.log('state changed', e.data.state.history);
        },
        blur: e => {
          console.log('blur: ', e);
        },
      }}>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Tabs" component={TabStack} />
      </Stack.Group>

      {/*JOBS SCREENS*/}
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

      {/*MESSAGES SCREENS*/}
      <Stack.Group>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MessagesChatScreen"
          component={MessagesChatScreen}
        />
      </Stack.Group>

      {/*PROFILE SCREENS*/}
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
            headerTitle: 'Work Information',
          }}
          name="ProfileWorkScreen"
          component={ProfileWorkScreen}
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
