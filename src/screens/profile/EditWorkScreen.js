import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {deleteWork, updateWork} from '../../services/EmployeesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import {getCities, getPositions} from '../../services/DictionariesService';
import {getCompanies} from '../../services/CompaniesService';
import {DateSelect} from '../../components/selects/DateSelect';

export const EditWorkScreen = ({route, navigation}) => {
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
