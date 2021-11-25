// have to load 'react-native-gesture-handler' at the beginning
// to avoid e.g. "unsupported top level event type onGuestureHandlerEvent" crashes
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AuthContext} from './src/store/context';
import {RootStackScreen} from './src/screens/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigator} from './src/navigation/Navigator';
import store from './src/store/index';
import {Provider} from 'react-redux';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

import {setToken} from './src/store/slices/auth';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          hhToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          hhToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          hhToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          hhToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async foundUser => {
        const hhToken = String(foundUser[0].hhToken);
        const userName = foundUser[0].username;

        try {
          await AsyncStorage.setItem('hhToken', hhToken);
          store.dispatch(setToken(hhToken));
        } catch (e) {
          console.log(e);
        }

        dispatch({type: 'LOGIN', id: userName, token: hhToken});
      },
      signOut: async () => {
        try {
          await GoogleSignin.signOut();
          await AsyncStorage.removeItem('hhToken');
        } catch (e) {
          console.log('signOut err:', e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {},
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let hhToken;
      hhToken = null;
      try {
        hhToken = await AsyncStorage.getItem('hhToken');
        store.dispatch(setToken(hhToken));
      } catch (e) {
        console.log(e);
      }

      dispatch({type: 'RETRIEVE_TOKEN', token: hhToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.hhToken !== null ? <Navigator /> : <RootStackScreen />}
          </NavigationContainer>
        </AuthContext.Provider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
