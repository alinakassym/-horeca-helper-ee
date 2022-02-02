import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
// styles
import {globalStyles} from '../../styles/globalStyles';
// services
import {getPositions} from '../../services/DictionariesService';
// locale
import i18n from '../../assets/i18n/i18n';
// components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import StepProgress from './components/StepProgress';
import SearchInput from '../../components/inputs/SearchInput';
import RadioSelect from '../../components/selects/RadioSelect';
import GradientButton from '../../components/buttons/GradientButton';

export const ChoosePositionScreen = ({navigation}) => {
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const positionsData = await getPositions();
        setPositions(positionsData);
      } catch (e) {
        console.log('getData err: ', e);
      }
    });
  }, [navigation]);
  return (
    <SafeAreaView
      style={[globalStyles.container, globalStyles.rootStackContainer]}>
      <Header
        onClose={() => navigation.goBack()}
        modal
        title={'Кем вы хотите работать?'}>
        <StepProgress step={1} />
      </Header>
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <SearchInput text={search} onChangeText={val => setSearch(val)} />
        <View style={styles.section}>
          <RadioSelect
            items={positions}
            itemKey={'title'}
            selectedItem={selectedPosition}
            onSelect={val => setSelectedPosition(val)}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection}>
        <GradientButton
          onPress={() => navigation.navigate('ChooseSchedule')}
          style={globalStyles.mt5}
          label={i18n.t('Next')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
