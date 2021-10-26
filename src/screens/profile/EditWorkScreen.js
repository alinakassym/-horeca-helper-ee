import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet, Alert,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {deleteWork, updateWork} from '../../services/EmployeesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import {
  getCities,
  getGenders,
  getPositions, getSchedules,
} from '../../services/DictionariesService';
import {getCompanies} from "../../services/CompaniesService";
import {deleteJobById} from "../../../../horeca-helper-er/src/services/JobsService";

export const EditWorkScreen = ({route, navigation}) => {

  const [work, setWork] = useState(route.params.value);
  const [companies, setCompanies] = useState([]);
  const [cities, setCities] = useState([]);
  const [positions, setPositions] = useState([]);

  const save = async () => {
    const hhToken = await AsyncStorage.getItem('hhToken');
    const data = {
      id: work.id,
      companyId: work.company ? work.company.id : null,
      positionId: work.position ? work.position.id : null,
      description: work.description,
      cityId: work.city ? work.city.id : null,
      startDate: work.startDate,
      endDate: work.endDate,
    };
    updateWork(data, hhToken).then(() => {
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

  const removeWork = async () => {
    const hhToken = await AsyncStorage.getItem('hhToken');
    deleteWork(work.id, hhToken).then(() => {
      navigation.navigate('Profile');
    });
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
      <View style={styles.btnSection}>
        <View style={styles.btn}>
          <PrimaryButton label={'Save'} onPress={() => save()} />
        </View>
        <PrimaryButton
          label={'Delete work'}
          color={'#ea0000'}
          onPress={() => confirmDeletion()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  btnSection: {
    marginBottom: 42,
  },
  btn: {
    marginBottom: 16,
  },
});
