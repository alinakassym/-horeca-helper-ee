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

export const ChooseWorkScreen = ({route, navigation}) => {
  const [me] = useState(route.params && route.params.me);
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState([]);

  const addItem = val => {
    const include = _.includes(
      selectedWork.map(item => item.id),
      val.id,
    );
    if (include) {
      const arrWithRemoved = _.remove(selectedWork, el => el.id !== val.id);
      setSelectedWork(arrWithRemoved);
    } else {
      const uniqArr = _.uniqBy([...selectedWork, val], 'id');
      setSelectedWork(uniqArr);
    }
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
        onClose={() => navigation.goBack(2)}
        modal
        title={'Укажите опыт работы'}>
        <StepProgress step={3} />
      </Header>
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <MultiSelect
          description
          activeItems={selectedWork}
          items={works}
          itemKey={'title_ru'}
          onSelect={val => addItem(val)}
        />
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection}>
        <GradientButton style={globalStyles.mt5} label={i18n.t('Next')} />
      </View>
    </SafeAreaView>
  );
};
