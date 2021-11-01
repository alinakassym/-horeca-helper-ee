import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {globalStyles} from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {postWork} from '../../services/EmployeesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import {getCities, getPositions} from '../../services/DictionariesService';
import {getCompanies} from '../../services/CompaniesService';
import {DateSelect} from '../../components/selects/DateSelect';

export const AddWorkScreen = ({navigation}) => {
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
      const hhToken = await AsyncStorage.getItem('hhToken');
      const data = {
        companyId: work.company ? work.company.id : null,
        positionId: work.position ? work.position.id : null,
        description: work.description,
        cityId: work.city ? work.city.id : null,
        startDate: work.startDate,
        endDate: work.endDate,
      };
      postWork(data, hhToken).then(() => {
        navigation.navigate('Profile');
      });
    } else {
      Alert.alert('Warning', 'Please fill in all the required fields');
    }
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        const hhToken = await AsyncStorage.getItem('hhToken');
        getCompanies(hhToken)
          .then(companiesData => {
            console.log('companies: ', companiesData);
            setCompanies(companiesData);
          })
          .catch(e => {
            console.log('getCompanies err:', e);
          });
        getCities(hhToken)
          .then(citiesData => {
            console.log('cities: ', citiesData);
            setCities(citiesData);
          })
          .catch(e => {
            console.log('getCities err:', e);
          });
        getPositions(hhToken)
          .then(positionsData => {
            console.log('positions: ', positionsData);
            setPositions(positionsData);
          })
          .catch(e => {
            console.log('getPositions err:', e);
          });
      });
    }
    fetchData();
  }, [navigation]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableResetScrollToCoords={false}>
      <ModalSelect
        label={'Location'}
        onChangeText={val => {
          setWork({...work, city: val});
        }}
        value={work}
        valueKey={'city'}
        items={cities}
        itemTitle={'title'}
        required={true}
      />

      <ModalSelect
        label={'Company'}
        onChangeText={val => {
          setWork({...work, company: val});
        }}
        value={work}
        valueKey={'company'}
        items={companies}
        itemTitle={'title'}
        required={true}
      />

      <ModalSelect
        label={'Position'}
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
        label={'Start Date'}
        value={work}
        valueKey={'startDate'}
        required={true}
      />
      <DateSelect
        label={'End Date'}
        value={work}
        valueKey={'endDate'}
        minimumDate={new Date(work.startDate)}
        required={true}
      />

      <Text style={globalStyles.label}>Description</Text>
      <TextInput
        multiline={true}
        style={[globalStyles.primaryInput, globalStyles.multiline]}
        onChangeText={val => {
          setWork({...work, description: val});
        }}
        value={work.description}
      />

      <View style={styles.btn}>
        <PrimaryButton label={'Save'} onPress={() => save()} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  btn: {
    marginBottom: 42,
  },
});
