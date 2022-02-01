import React from 'react';
import {
  Text,
  Alert,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {typography} from '../styles/typography';

// components
import Header from '../components/Header';
import Input from '../components/inputs/Input';
import GradientButton from '../components/buttons/GradientButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

// store
import Users from '../model/users';
import {AuthContext} from '../store/context';

export const SignInScreen = ({navigation}) => {
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
    <SafeAreaView style={globalStyles.rootStackContainer}>
      <Header goBack onClose={() => navigation.goBack()} />
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={globalStyles.section}>
            <Text style={[typography.h1, globalStyles.mt6]}>
              Вход и регистрация
            </Text>
            <Text style={[typography.text, globalStyles.mt3, globalStyles.mb6]}>
              Введите логин и пароль чтобы войти
            </Text>
            <Input
              value={data.username}
              label={'Логин'}
              onChangeText={val => textInputChange(val)}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            <Input
              value={data.password}
              label={'Пароль'}
              secureTextEntry
              onChangeText={val => handlePasswordChange(val)}
            />
          </View>
        </ScrollView>
        <View style={globalStyles.section}>
          <GradientButton
            label={'Войти'}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
