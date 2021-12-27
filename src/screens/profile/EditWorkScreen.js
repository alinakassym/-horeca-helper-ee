import React, {useEffect, useState} from 'react';
import {StyleSheet, Alert, SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

// components
import Header from '../../components/Header';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import OutlineButton from '../../components/buttons/OutlineButton';
import MultilineInput from '../../components/MultilineInput';
import {DateSelect} from '../../components/selects/DateSelect';
import {Autocomplete} from '../../components/selects/Autocomplete';
import LinearGradient from 'react-native-linear-gradient';

// services
import {deleteWork, updateWork} from '../../services/EmployeesService';
import {getCities, getPositions} from '../../services/DictionariesService';
import {getCompanies} from '../../services/CompaniesService';

export const EditWorkScreen = ({route, navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [work, setWork] = useState(route.params.value);
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
        id: work.id,
        companyId: work.company ? work.company.id : null,
        positionId: work.position ? work.position.id : null,
        description: work.description,
        cityId: work.city ? work.city.id : null,
        startDate: work.startDate,
        endDate: work.endDate,
      };
      try {
        await updateWork(data);
        navigation.navigate('ProfileWorkScreen', {id: work.id});
      } catch (e) {
        console.log('updateWork err: ', e);
      }
    } else {
      Alert.alert('Warning', 'Please fill in all the required fields');
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

  const removeWork = async () => {
    try {
      await deleteWork(work.id);
      navigation.navigate('Profile');
    } catch (e) {
      console.log('deleteWork err: ', e);
    }
  };

  const confirmDeletion = () => {
    Alert.alert('Delete Job', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Delete', onPress: () => removeWork(), style: 'destructive'},
    ]);
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.bg]}>
      <Header
        modal
        onClose={() => navigation.goBack()}
        title={'Основная информация'}
      />
      <KeyboardAwareScrollView
        style={[globalStyles.section, styles.mb]}
        enableResetScrollToCoords={false}>
        <Autocomplete
          onCloseModal={() => navigation.goBack()}
          label={'Город'}
          onChangeText={val => {
            setWork({...work, city: val});
          }}
          value={work}
          valueKey={'city'}
          items={cities}
          itemTitle={'title'}
          required={true}
        />

        <Autocomplete
          label={'Название компании'}
          onChangeText={val => {
            setWork({...work, company: val});
          }}
          value={work}
          valueKey={'company'}
          items={companies}
          itemTitle={'title'}
          required={true}
        />

        <Autocomplete
          label={'Должность'}
          onChangeText={val => {
            setWork({...work, position: val});
          }}
          value={work}
          valueKey={'position'}
          items={positions}
          itemTitle={'title'}
          required={true}
        />
        <DateSelect
          label={'Дата начала'}
          value={work}
          valueKey={'startDate'}
          required={true}
          androidVariant="nativeAndroid"
        />
        <DateSelect
          label={'Дата окончания'}
          value={work}
          valueKey={'endDate'}
          minimumDate={new Date(work.startDate)}
          required={true}
          androidVariant="nativeAndroid"
        />

        <MultilineInput
          style={styles.multilineInput}
          label={'Описание'}
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
          <PrimaryButton
            style={globalStyles.mb3}
            label={'Save'}
            onPress={() => save()}
          />
          <OutlineButton
            label={'Delete work'}
            color={StatusesColors.red}
            onPress={() => confirmDeletion()}
          />
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mb: {
    marginBottom: 120,
  },
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
