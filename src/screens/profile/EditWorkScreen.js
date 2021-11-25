import React, {useEffect, useState} from 'react';
import {Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {globalStyles} from '../../styles/globalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {deleteWork, updateWork} from '../../services/EmployeesService';
import {getCities, getPositions} from '../../services/DictionariesService';
import {getCompanies} from '../../services/CompaniesService';
import {DateSelect} from '../../components/selects/DateSelect';
import {Autocomplete} from '../../components/selects/Autocomplete';

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
        navigation.navigate('Profile');
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
    <KeyboardAwareScrollView
      style={styles.container}
      enableResetScrollToCoords={false}>
      <Autocomplete
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

      <Autocomplete
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

      <Autocomplete
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
        androidVariant="nativeAndroid"
      />
      <DateSelect
        label={'End Date'}
        value={work}
        valueKey={'endDate'}
        minimumDate={new Date(work.startDate)}
        required={true}
        androidVariant="nativeAndroid"
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
    </KeyboardAwareScrollView>
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
