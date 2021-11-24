import React from 'react';
import {
  TextInput,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Users from '../model/users';
import {AuthContext} from '../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {getHhToken} from '../services/AuthService';

import {useDispatch} from 'react-redux';
import {setToken} from '../store/slices/auth';

GoogleSignin.configure({
  webClientId:
    '80837938097-68a9l5aphmdccseksn9mr0scil5moimt.apps.googleusercontent.com',
  androidClientId:
    '80837938097-5prvgmdnbmsain6on7k1nss2fhhgtr0h.apps.googleusercontent.com',
  iosClientId:
    '80837938097-pld9kvi5epu69pm9ehqm411kifa2fq68.apps.googleusercontent.com',
  offlineAccess: true,
});

export const SignInScreen = () => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    userGoogleInfo: {},
    loaded: false,
  });

  const {signIn} = React.useContext(AuthContext);

  const storeData = async item => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(item));
    } catch (error) {
      // Error saving data
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setData({
        ...data,
        userGoogleInfo: userInfo,
        loaded: true,
      });

      console.log('SignInScreen googleToken:', userInfo.idToken);
      console.log('SignInScreen userInfo:', userInfo);

      if (userInfo.idToken) {
        getHhToken(userInfo.idToken)
          .then(async authData => {
            console.log('SignInScreen authData:', authData);
            const foundUser = [
              {
                email: userInfo.user.email,
                id: userInfo.user.id,
                password: userInfo.user.id,
                userToken: userInfo.idToken,
                hhToken: authData.hhToken,
                username: userInfo.user.email,
                photoUrl: userInfo.user.photoUrl,
              },
            ];

            await dispatch(setToken(authData.hhToken));
            await storeData(foundUser[0]);
            AsyncStorage.setItem('hhToken', authData.hhToken).then(() => {
              signIn(foundUser);
            });
          })
          .catch(e => {
            console.log('SignInScreen', e);
          });
      }
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter(item => {
      return userName === item.username && password === item.password;
    });

    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    if (foundUser.length === 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }
    storeData(foundUser[0]).then(() => {});
    AsyncStorage.setItem('hhToken', foundUser[0].hhToken).then(() => {
      signIn(foundUser);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View>
          <View style={styles.cardBottomInnerBox}>
            <View style={styles.action}>
              <TextInput
                style={styles.inputText}
                placeholder="Email/Phone number"
                placeholderTextColor="#767676"
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor="#767676"
                secureTextEntry={!!data.secureTextEntry}
                autoCapitalize="none"
                onChangeText={val => handlePasswordChange(val)}
              />
            </View>
            <View style={styles.action}>
              <TouchableOpacity style={styles.btnRow}>
                <Text style={styles.textBtn}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action}>
              <View style={styles.buttonPlain}>
                <Text style={styles.buttonPlainText}>Create Account</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.socialsBlock}>
              <View>
                <GoogleSigninButton
                  style={styles.googleBtn}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={googleSignIn}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  socialIcon: {
    marginHorizontal: 40,
  },
  card: {
    display: 'flex',
    paddingTop: '30%',
    paddingHorizontal: 40,
  },
  cardBottomInnerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 14,
    backgroundColor: '#F3F3F3',
    color: '#000000',
  },
  btnRow: {flex: 1, paddingHorizontal: 4},
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 14,
    backgroundColor: '#185AB7',
  },
  buttonPlain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 14,
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  buttonPlainText: {
    fontFamily: 'Roboto-Medium',
    color: '#185AB7',
    textTransform: 'uppercase',
  },
  textBtn: {
    fontFamily: 'Roboto-Medium',
    textAlign: 'right',
    color: '#185AB7',
  },
  shadow: {
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  cardRow: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  socialsBlock: {
    display: 'flex',
    flex: 1,
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleBtn: {
    width: 280,
    height: 48,
  },
});
