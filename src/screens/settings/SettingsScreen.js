import React, {useState} from 'react';
import {Dimensions, StyleSheet, SafeAreaView, View} from 'react-native';
// styles
import {globalStyles} from '../../styles/globalStyles';
// components
import Header from '../../components/Header';
import ExpansionPanel from '../../components/ExpansionPanel';
import RadioBtn from '../../components/buttons/RadioBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
// store
import store from '../../store';
import {useSelector} from 'react-redux';
import {setLang} from '../../store/slices/locale';
// i18n
import i18n from '../../assets/i18n/i18n';

const dimensions = Dimensions.get('screen');
const width = dimensions.width;

export const SettingsScreen = ({navigation}) => {
  const {locale} = useSelector(state => state);
  const languages = locale.languages;
  const [currentLanguage, setLanguage] = useState(locale.lang);

  const changeLanguage = async value => {
    try {
      await i18n.changeLanguage(value);
      setLanguage(value);
      await AsyncStorage.setItem('i18n', value);
      store.dispatch(setLang(value));
    } catch (e) {
      console.log('changeLanguage err: ', e);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={i18n.t('Settings')}
      />
      <View style={globalStyles.mt3}>
        <ExpansionPanel
          items={[{title: i18n.t('Language')}]}
          expandedBlockStyle={styles.wrapperRadio}>
          {languages.map((item, index) => (
            <RadioBtn
              style={styles.radioBtn}
              key={index}
              item={item}
              itemKey={'title'}
              activeItem={_.find(languages, l => l.code === currentLanguage)}
              onSelect={() => changeLanguage(item.code)}
            />
          ))}
        </ExpansionPanel>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperRadio: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioBtn: {
    width: width * 0.5 - 20,
  },
});
