import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {typography} from '../styles/typography';

// components
import Header from '../components/Header';
import CodeNumberInput from '../components/inputs/CodeNumberInput';
import PlainButton from '../components/buttons/PlainButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import i18n from '../assets/i18n/i18n';
import {Trans} from 'react-i18next';
import {PrimaryColors} from '../styles/colors';
import Steps from '../components/Steps';

export const ConfirmationCodeScreen = ({route, navigation}) => {
  const username = (route.params && route.params.phoneEmail) || '';
  const reset = (route.params && route.params.reset) || false;

  let numberInputRefs = {
    first: undefined,
    second: undefined,
    third: undefined,
    fourth: undefined,
  };

  const [code, setCode] = useState([null, null, null, null]);
  const [timer, setTimer] = useState(59);

  const codeChanged = arr => {
    arr.every(el => el) &&
      navigation.navigate('CreatePassword', {reset: reset});
    setCode(arr);
  };

  const firstInputChanged = val => {
    if (val) {
      const sliced = val.slice(-1);
      const arr = [...sliced, ...code.splice(1)];
      sliced && numberInputRefs.second.focus();
      codeChanged(arr);
    } else {
      setCode([null, ...code.splice(1)]);
    }
  };

  const secondInputChanged = val => {
    if (val) {
      const sliced = val.slice(-1);
      const arr = [...code[0], sliced, ...code.splice(2)];
      sliced && numberInputRefs.third.focus();
      codeChanged(arr);
    } else {
      setCode([...code[0], null, ...code.splice(2)]);
    }
  };

  const thirdInputChanged = val => {
    if (val) {
      const sliced = val.slice(-1);
      const arr = [code[0], code[1], sliced, code[3]];
      sliced && numberInputRefs.fourth.focus();
      codeChanged(arr);
    } else {
      setCode([code[0], code[1], null, code[3]]);
    }
  };

  const fourthInputChanged = val => {
    if (val) {
      const sliced = val.slice(-1);
      const arr = [...code.slice(0, 3), ...sliced];
      codeChanged(arr);
    } else {
      setCode([...code.slice(0, 3), null]);
    }
  };

  const goTo = val => {
    if (!code[val]) {
      switch (val) {
        case 1:
          code[val] === null && numberInputRefs.first.focus();
          firstInputChanged(null);
          break;
        case 2:
          code[val] === null && numberInputRefs.second.focus();
          secondInputChanged(null);
          break;
        case 3:
          code[val] === null && numberInputRefs.third.focus();
          thirdInputChanged(null);
          break;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer && timer > 0) {
        setTimer(timer - 1);
      } else if (timer && timer === 0) {
        setTimer(59);
      } else {
        setTimer(null);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <SafeAreaView style={globalStyles.rootStackContainer}>
      <Header goBack onClose={() => navigation.goBack()} />
      <KeyboardAwareScrollView behavior="position">
        <View style={globalStyles.section}>
          <Text style={[typography.h1, globalStyles.mt6]}>
            {i18n.t('Confirmation code')}
          </Text>
          <Text style={[typography.text, globalStyles.mt3, globalStyles.mb6]}>
            <Trans
              i18nKey="A verification code has been sent to"
              values={{phone: username}}
            />
          </Text>
          <View style={[globalStyles.row, globalStyles.mb6]}>
            {/*FIRST NUMBER*/}
            <CodeNumberInput
              autoFocus
              ref={input => {
                numberInputRefs.first = input;
              }}
              value={code[0]}
              onChangeText={val => firstInputChanged(val)}
            />

            {/*SECOND NUMBER*/}
            <CodeNumberInput
              ref={input => {
                numberInputRefs.second = input;
              }}
              value={code[1]}
              onChangeText={val => secondInputChanged(val)}
              onKeyPress={() => goTo(1)}
            />

            {/*THIRD NUMBER*/}
            <CodeNumberInput
              ref={input => {
                numberInputRefs.third = input;
              }}
              value={code[2]}
              onChangeText={val => thirdInputChanged(val)}
              onKeyPress={() => goTo(2)}
            />

            {/*FOURTH NUMBER*/}
            <CodeNumberInput
              ref={input => {
                numberInputRefs.fourth = input;
              }}
              value={code[3]}
              onChangeText={val => fourthInputChanged(val)}
              onKeyPress={() => goTo(3)}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View
        style={[
          globalStyles.btnSection,
          globalStyles.contentCenter,
          globalStyles.alignCenter,
        ]}>
        {timer ? (
          <View style={styles.wrapper}>
            <Text style={styles.timerTextWrapper}>
              {i18n.t('Available in')}
              <Text style={styles.timerText}>
                {' '}
                00:{timer < 10 ? `0${timer}` : timer}
              </Text>
            </Text>
          </View>
        ) : (
          <PlainButton
            btnStyle={globalStyles.mt6}
            onPress={() => setTimer(59)}
            label={i18n.t('Send new code')}
          />
        )}
      </View>
      {reset && (
        <Steps
          onPress={() => {
            navigation.navigate('CreatePassword', {reset: true});
          }}
          steps={'3'}
          step={'2'}
          progress={66.666}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    width: 182,
  },
  timerTextWrapper: {
    width: '100%',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
  timerText: {
    width: '10%',
    fontFamily: 'Inter-Medium',
    color: PrimaryColors.element,
  },
});
