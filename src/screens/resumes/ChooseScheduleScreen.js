import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
// styles
import {globalStyles} from '../../styles/globalStyles';
// services
import {getSchedules} from '../../services/DictionariesService';
// locale
import i18n from '../../assets/i18n/i18n';
// components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import StepProgress from './components/StepProgress';
import GradientButton from '../../components/buttons/GradientButton';
import MultiSelect from '../../components/selects/MultiSelect';
import _ from 'lodash';
import DisabledButton from '../../components/buttons/DisabledButton';

export const ChooseScheduleScreen = ({route, navigation}) => {
  const [me] = useState(route.params && route.params.me);
  const [resume, setResume] = useState(route.params && route.params.resume);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  const addItem = val => {
    const include = _.includes(
      selectedSchedules.map(item => item.id),
      val.id,
    );
    if (include) {
      const arrWithRemoved = _.remove(
        selectedSchedules,
        el => el.id !== val.id,
      );
      setSelectedSchedules(arrWithRemoved);
    } else {
      const uniqArr = _.uniqBy([...selectedSchedules, val], 'id');
      setResume({...resume, scheduleId: uniqArr[0].id});
      setSelectedSchedules(uniqArr);
    }
  };

  const next = () => {
    navigation.navigate('ChooseWork', {me, resume});
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const schedulesData = await getSchedules();
        setSchedules(schedulesData);
      } catch (e) {
        console.log('getData err: ', e);
      }
    });
  }, [navigation]);
  return (
    <SafeAreaView
      style={[globalStyles.container, globalStyles.rootStackContainer]}>
      <Header
        onClose={() => navigation.goBack(2)}
        modal
        title={'Укажите свою занятость'}>
        <StepProgress step={2} />
      </Header>
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <MultiSelect
          activeItems={selectedSchedules}
          items={schedules}
          itemKey={'title_ru'}
          onSelect={val => addItem(val)}
        />
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection}>
        {selectedSchedules.length > 0 ? (
          <GradientButton
            onPress={() => next()}
            style={globalStyles.mt5}
            label={i18n.t('Next')}
          />
        ) : (
          <DisabledButton label={i18n.t('Next')} style={globalStyles.mt5} />
        )}
      </View>
    </SafeAreaView>
  );
};
