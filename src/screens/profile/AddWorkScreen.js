import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// components
import Header from '../../components/Header';
import GradientButton from '../../components/buttons/GradientButton';
import MultilineInput from '../../components/inputs/MultilineInput';
import LinearGradient from 'react-native-linear-gradient';
import Autocomplete from '../../components/selects/Autocomplete';
import {DateSelect} from '../../components/selects/DateSelect';

// services
import {postWork} from '../../services/EmployeesService';
import {getCities, getPositions} from '../../services/DictionariesService';
import {getCompanies} from '../../services/CompaniesService';

// locale
import i18n from '../../assets/i18n/i18n';
import {useSelector} from 'react-redux';

export const AddWorkScreen = ({navigation}) => {
  const {locale} = useSelector(state => state);
  const suffix = locale.suffix;
  const titleKey = `title${suffix}`;

  const [isFocused, setIsFocused] = useState(false);
  const [work, setWork] = useState({
    company: null,
    position: null,
    description: null,
    city: null,
    startDate: null,
    endDate: null,
  });
  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [positions, setPositions] = useState([]);

  const save = async () => {
    const isValid =
      work.company &&
      work.position &&
      work.city &&
      work.startDate &&
      work.endDate;
    if (isValid) {
      const data = {
        companyId: work.company ? work.company.id : null,
        positionId: work.position ? work.position.id : null,
        description: work.description,
        cityId: work.city ? work.city.id : null,
        startDate: work.startDate,
        endDate: work.endDate,
      };
      try {
        await postWork(data);
        navigation.navigate('MyExperience');
      } catch (e) {
        console.log('postWork err: ', e);
      }
    } else {
      Alert.alert(
        i18n.t('Warning'),
        i18n.t('Please fill in all the required fields'),
      );
    }
  };

  const getData = async () => {
    return Promise.all([getCompanies(), getCities(), getPositions()]);
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const [companiesData, citiesData, positionsData] = await getData();
          setCompanies(companiesData);
          setCities(citiesData);
          setPositions(positionsData);
        } catch (e) {
          console.log('getData err: ', e);
        }
      });
    }
    fetchData();
  }, [navigation]);

  return (
    <SafeAreaView style={[globalStyles.container, styles.bg]}>
      <Header
        modal
        onClose={() => navigation.goBack()}
        title={i18n.t('Basic information')}
      />
      <KeyboardAwareScrollView
        style={globalStyles.section}
        enableResetScrollToCoords={false}>
        <Autocomplete
          label={i18n.t('City')}
          value={work.city}
          items={cities}
          itemKey={titleKey}
          onSelect={val => setWork({...work, city: val})}
          onClear={() => setWork({...work, city: null})}
        />

        <Autocomplete
          label={i18n.t('Name')}
          value={work.company}
          items={companies}
          itemKey={'title'}
          onSelect={val => setWork({...work, company: val})}
          onClear={() => setWork({...work, company: null})}
        />

        <Autocomplete
          label={i18n.t('Position')}
          value={work.position}
          items={positions}
          itemKey={titleKey}
          onSelect={val => setWork({...work, position: val})}
          onClear={() => setWork({...work, position: null})}
        />

        <DateSelect
          label={i18n.t('Start date')}
          value={work}
          valueKey={'startDate'}
        />
        <DateSelect
          label={i18n.t('End date')}
          value={work}
          valueKey={'endDate'}
          minimumDate={new Date(work.startDate)}
        />

        <MultilineInput
          style={styles.multilineInput}
          label={i18n.t('Description')}
          value={work.description}
          onChangeText={val => {
            setWork({...work, description: val});
          }}
          marginBottom={100}
          onInputFocus={val => {
            setIsFocused(val);
          }}
        />
      </KeyboardAwareScrollView>
      {!isFocused && (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.btn}>
          <GradientButton label={i18n.t('Save')} onPress={() => save()} />
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: PrimaryColors.white,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  multilineInput: {
    marginTop: 20,
  },
});
