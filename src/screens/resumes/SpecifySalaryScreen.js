import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
// styles
import {globalStyles} from '../../styles/globalStyles';
// locale
import i18n from '../../assets/i18n/i18n';
// components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import StepProgress from './components/StepProgress';
import GradientButton from '../../components/buttons/GradientButton';
import NumberInput from '../../components/inputs/NumberInput';
import DisabledButton from '../../components/buttons/DisabledButton';
// services
import * as ResumesService from '../../services/ResumesService';

export const SpecifySalaryScreen = ({route, navigation}) => {
  const [me] = useState(route.params && route.params.me);
  const [resume, setResume] = useState(route.params && route.params.resume);
  const [salary, setSalary] = useState(
    resume && resume.salary && resume.salary.toString(),
  );

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
      } catch (e) {
        console.log('getData err: ', e);
      }
    });
  }, [me, navigation]);

  const createResume = async () => {
    try {
      await ResumesService.create(resume);
      navigation.navigate('MyCV');
    } catch (e) {
      console.log('createResume err: ', e);
    }
  };

  const saveResume = async () => {
    try {
      await ResumesService.update(resume.id, {
        positionId: resume.position.id,
        experience: null,
        scheduleId: resume.schedule.id,
        salary: resume.salary,
        workIds: resume.workIds,
      });
      navigation.navigate('MyCV');
    } catch (e) {
      console.log('saveResume err: ', e);
    }
  };

  return (
    <SafeAreaView
      style={[globalStyles.container, globalStyles.rootStackContainer]}>
      <Header
        onClose={() => navigation.navigate('MyCV')}
        modal
        title={'Укажите желаемую заработную плату'}>
        <StepProgress step={4} />
      </Header>
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <View style={globalStyles.section}>
          <NumberInput
            value={salary}
            label={i18n.t('Salary')}
            onChangeText={val => {
              setResume({...resume, salary: val});
              setSalary(val);
            }}
            onClear={() => setSalary(null)}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection}>
        {resume.createdAt ? (
          <GradientButton
            onPress={() => saveResume()}
            style={globalStyles.mt5}
            label={i18n.t('Save')}
          />
        ) : salary ? (
          <GradientButton
            onPress={() => createResume()}
            style={globalStyles.mt5}
            label={i18n.t('Create CV')}
          />
        ) : (
          <DisabledButton
            label={i18n.t('Create CV')}
            style={globalStyles.mt5}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
