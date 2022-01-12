import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {PrimaryColors} from '../styles/colors';
import {typography} from '../styles/typography';

// icons
import WelcomeImage from '../assets/images/WelcomeImage';
import {IconGoogle} from '../assets/icons/social/IconGoogle';

// components
import PrimaryButton from '../components/buttons/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// store
import {AuthContext} from '../store/context';

// services
import {getHhToken} from '../services/AuthService';

GoogleSignin.configure({
  // webClientId is taken from android/app/google-services.json
  webClientId:
    '929223236001-cn8ig9bh06moiafbop0t48afcrnraej3.apps.googleusercontent.com',
  offlineAccess: true,
});

const dimensions = Dimensions.get('screen');
const width = dimensions.width;
const imageSize = width > 340 ? 300 : width - 40;
const paddingTop = width > 340 ? (width - imageSize - 20) / 2 : 20;

export const WelcomeScreen = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
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

  const storeData = async item => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(item));
    } catch (error) {
      // Error saving data
    }
  };

  const googleSignIn = async () => {
    try {
      setLoading(true);
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

            await storeData(foundUser[0]);
            signIn(foundUser);
          })
          .catch(e => {
            console.log('SignInScreen', e);
            setLoading(false);
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
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.fullScreenSection}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.rootStackContainer}>
      <ScrollView>
        <View style={globalStyles.alignCenter}>
          <View style={styles.section}>
            <WelcomeImage size={imageSize} style={globalStyles.mb5} />
            <Text style={[typography.h1, globalStyles.mb4]}>
              {'Добро пожаловать\nв Horeca Helper'}
            </Text>
            <Text style={[typography.text, globalStyles.mb6]}>
              Пожалуйста выберите удобный способ для входа или регистрации в
              приложение
            </Text>
            <PrimaryButton
              onPress={() => navigation.navigate('SignIn')}
              style={styles.btn}
              color={PrimaryColors.grey4}
              labelStyle={styles.labelStyle}
              labelColor={PrimaryColors.element}
              label={'Войти по логину'}
            />
            <View style={styles.googleButtonWrapper}>
              <IconGoogle style={styles.googleButtonIcon} color={'#FFFFFF'} />
              <Text style={[styles.labelStyle, styles.googleButtonText]}>
                Продолжить с Google
              </Text>
              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={googleSignIn}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingTop: paddingTop,
    paddingBottom: 20,
    width: imageSize,
  },
  btn: {
    marginTop: 8,
    paddingVertical: 18,
  },
  googleButtonWrapper: {
    position: 'relative',
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#EA4335',
    overflow: 'hidden',
  },
  googleButton: {
    height: 56,
    width: imageSize,
    opacity: 0,
  },
  googleButtonIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  googleButtonText: {
    position: 'absolute',
    top: 18,
    width: '100%',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  labelStyle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
  },
});
