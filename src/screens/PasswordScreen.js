import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {typography} from '../styles/typography';

// components
import Header from '../components/Header';
import GradientButton from '../components/buttons/GradientButton';
import PasswordInput from '../components/inputs/PasswordInput';

// store
import Users from '../model/users';
import {AuthContext} from '../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from '../assets/i18n/i18n';
import PlainButton from '../components/buttons/PlainButton';

export const PasswordScreen = ({route, navigation}) => {
  const username = (route.params && route.params.phoneEmail) || '';

  const [data, setData] = React.useState({
    username: username,
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

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter(item => {
      return userName === item.username && password === item.password;
    });

    if (data.username.length === 0 || data.password.length === 0) {
      Alert.alert('Wrong Input', 'Password field cannot be empty.', [
        {text: 'Okay'},
      ]);
      return;
    }

    if (foundUser.length === 0) {
      Alert.alert('Invalid Password', 'Password is incorrect.', [
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
    <SafeAreaView style={globalStyles.rootStackContainer}>
      <Header goBack onClose={() => navigation.goBack()} />
      <View style={globalStyles.rootStackContainer}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView>
            <View style={globalStyles.section}>
              <Text style={[typography.h1, globalStyles.mt6]}>
                {i18n.t('Enter')}
              </Text>
              <Text
                style={[typography.text, globalStyles.mt3, globalStyles.mb6]}>
                {i18n.t('Enter your password to login')}
              </Text>
              <PasswordInput
                value={data.password}
                label={i18n.t('Password')}
                secureTextEntry
                onChangeText={val => handlePasswordChange(val)}
                onClear={() => handlePasswordChange('')}
              />
            </View>
          </ScrollView>
          <View style={globalStyles.btnSection}>
            <GradientButton
              label={i18n.t('Continue')}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={globalStyles.btnSection}>
        <PlainButton
          onPress={() => navigation.navigate('ResetPassword')}
          btnStyle={globalStyles.mt6}
          label={i18n.t('Forgot your password?')}
        />
      </View>
    </SafeAreaView>
  );
};
