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
import MultiSelect from '../../components/selects/MultiSelect';
import _ from 'lodash';
import DisabledButton from '../../components/buttons/DisabledButton';

export const ChooseWorkScreen = ({route, navigation}) => {
  const [me] = useState(route.params && route.params.me);
  const [resume, setResume] = useState(route.params && route.params.resume);
  const [works, setWorks] = useState(
    resume && resume.works ? resume.works.map(el => el.id) : [],
  );
  const [selectedWorks, setSelectedWorks] = useState([]);

  const addItem = val => {
    const include = _.includes(
      selectedWorks.map(item => item.id),
      val.id,
    );
    if (include) {
      const arrWithRemoved = _.remove(selectedWorks, el => el.id !== val.id);
      setSelectedWorks(arrWithRemoved);
    } else {
      const uniqArr = _.uniqBy([...selectedWorks, val], 'id');
      setResume({...resume, workIds: uniqArr.map(el => el.id)});
      setSelectedWorks(uniqArr);
    }
  };

  const next = () => {
    navigation.navigate('SpecifySalary', {me, resume});
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const worksData = me.works.map(el => {
          return {
            id: el.id,
            title: el.position.title,
            title_ru: el.position.title_ru,
            company: el.company,
            startDate: el.startDate,
            endDate: el.endDate,
          };
        });
        setWorks(worksData);
      } catch (e) {
        console.log('getData err: ', e);
      }
    });
  }, [me, navigation]);
  return (
    <SafeAreaView
      style={[globalStyles.container, globalStyles.rootStackContainer]}>
      <Header
        onClose={() => navigation.navigate('MyCV')}
        modal
        title={'Укажите опыт работы'}>
        <StepProgress step={3} />
      </Header>
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <MultiSelect
          description
          activeItems={selectedWorks}
          items={works}
          itemKey={'title_ru'}
          onSelect={val => addItem(val)}
        />
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection}>
        {selectedWorks.length > 0 ? (
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
