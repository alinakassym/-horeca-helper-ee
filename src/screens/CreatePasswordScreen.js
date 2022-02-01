import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {typography} from '../styles/typography';

// components
import Header from '../components/Header';
import GradientButton from '../components/buttons/GradientButton';
import PasswordInput from '../components/inputs/PasswordInput';

import i18n from '../assets/i18n/i18n';
import Steps from '../components/Steps';

export const CreatePasswordScreen = ({route, navigation}) => {
  const reset = (route.params && route.params.reset) || false;

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onRegister = () => {
    if (password === confirmPassword) {
      navigation.navigate('Registration');
    } else {
      Alert.alert(
        i18n.t('Invalid Password'),
        i18n.t('You entered two different passwords. Please try again'),
        [{text: 'OK'}],
      );
    }
  };

  return (
    <SafeAreaView style={globalStyles.rootStackContainer}>
      <Header goBack onClose={() => navigation.goBack()} />
      <View style={globalStyles.flex1}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView>
            <View style={globalStyles.section}>
              <Text style={[typography.h1, globalStyles.mt6, globalStyles.mb5]}>
                {reset ? i18n.t('Reset password') : i18n.t('Registration')}
              </Text>
              {!reset && (
                <Text
                  style={[typography.text, globalStyles.mt3, globalStyles.mb6]}>
                  {i18n.t('Create password for next login')}
                </Text>
              )}
              <PasswordInput
                value={password}
                label={i18n.t('New password')}
                onChangeText={val => setPassword(val)}
              />
              <PasswordInput
                value={confirmPassword}
                label={i18n.t('Repeat password')}
                onChangeText={val => setConfirmPassword(val)}
              />
            </View>
          </ScrollView>
          {!reset && (
            <View style={globalStyles.btnSection}>
              <GradientButton
                onPress={() => onRegister()}
                label={i18n.t('Register')}
              />
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
      {reset && (
        <Steps
          onPress={() => navigation.navigate('Registration')}
          steps={'3'}
          step={'3'}
          progress={100}
        />
      )}
    </SafeAreaView>
  );
};
