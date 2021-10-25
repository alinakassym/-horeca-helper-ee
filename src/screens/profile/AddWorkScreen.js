import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {postWork} from '../../services/EmployeesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import {
  getCities,
  getGenders,
  getPositions, getSchedules,
} from '../../services/DictionariesService';
import {getCompanies} from "../../services/CompaniesService";

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
  };

  useEffect(() => {
    function fetchData() {
      const unsubscribe = navigation.addListener('focus', async () => {
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

      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }
    fetchData();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <ModalSelect
        label={'Location'}
        onChangeText={val => {
          setWork({...work, city: val});
        }}
        value={work}
        valueKey={'city'}
        items={cities}
        itemTitle={'title'}
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
      />

      <Text style={globalStyles.label}>Description</Text>
      <TextInput
        style={[globalStyles.primaryInput, globalStyles.multiline]}
        onChangeText={val => {
          setWork({...work, description: val});
        }}
        value={work.description}
      />

      <View style={styles.btn}>
        <PrimaryButton label={'Save'} onPress={() => save()} />
      </View>
    </ScrollView>
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
