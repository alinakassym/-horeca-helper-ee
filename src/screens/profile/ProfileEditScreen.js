import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {globalStyles} from '../../styles/globalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {updateEmployee} from '../../services/EmployeesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import {DateSelect} from '../../components/selects/DateSelect';

import {
  getCities,
  getGenders,
  getPositions,
  getSchedules,
} from '../../services/DictionariesService';
import {Autocomplete} from '../../components/selects/Autocomplete';

export const ProfileEditScreen = ({route, navigation}) => {
  const [employee, setEmployee] = useState(route.params.value);
  const [cities, setCities] = useState([]);
  const [positions, setPositions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [isValidFirstName, setIsValidFirstName] = useState(false);

  const [loading, setLoading] = useState(true);

  function firstNameChanged(val) {
    setIsValidFirstName(val && val.length >= 2);
    setEmployee({...employee, firstName: val});
  }

  const save = async () => {
    if (isValidFirstName) {
      const data = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        photoUrl: employee.photoUrl,
        googleId: employee.googleId,
        positionId: employee.position ? employee.position.id : null,
        description: employee.position ? employee.description : '',
        cityId: employee.city ? employee.city.id : null,
        birthDate: employee.birthDate,
        genderId: employee.gender ? employee.gender.id : null,
        experience: employee.experience,
        scheduleId: employee.schedule ? employee.schedule.id : null,
        salary: employee.salary,
      };
      updateEmployee(data).then(() => {
        navigation.navigate('Profile');
      });
    } else {
      Alert.alert('Warning', 'Username must be at least 2 characters');
    }
  };

  useEffect(() => {
    async function fetchData() {
      return navigation.addListener('focus', async () => {
        getCities()
          .then(citiesData => {
            // console.log('cities: ', citiesData);
            setCities(citiesData);
          })
          .catch(e => {
            console.log('getCities err:', e);
          });
        getPositions()
          .then(positionsData => {
            // console.log('positions: ', positionsData);
            setPositions(positionsData);
          })
          .catch(e => {
            console.log('getPositions err:', e);
          });
        getGenders()
          .then(gendersData => {
            // console.log('genders: ', gendersData);
            setGenders(gendersData);
          })
          .catch(e => {
            console.log('getGenders err:', e);
          });
        getSchedules()
          .then(schedulesData => {
            // console.log('schedules: ', schedulesData);
            setSchedules(schedulesData);
            setLoading(false);
          })
          .catch(e => {
            console.log('getSchedules err:', e);
          });

        setIsValidFirstName(
          employee.firstName && employee.firstName.length >= 2,
        );
      });
    }
    fetchData().then();
  }, [employee.firstName, navigation]);

  if (loading) {
    return (
      <View style={styles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableResetScrollToCoords={false}>
      <Text style={globalStyles.label}>First name</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={val => {
            firstNameChanged(val);
          }}
          value={employee.firstName}
        />
        {!isValidFirstName && (
          <Text style={styles.warningText}>
            Username must be at least 2 characters
          </Text>
        )}
      </View>

      <Text style={globalStyles.label}>Last name</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setEmployee({...employee, lastName: val});
        }}
        value={employee.lastName}
      />

      <DateSelect
        label={'Date of birth'}
        value={employee}
        valueKey={'birthDate'}
      />

      <ModalSelect
        label={'Gender'}
        onChangeText={val => {
          setEmployee({...employee, gender: val});
        }}
        value={employee}
        valueKey={'gender'}
        items={genders}
        itemTitle={'title'}
      />

      <Autocomplete
        label={'Location'}
        onChangeText={val => {
          setEmployee({...employee, city: val});
        }}
        value={employee}
        valueKey={'city'}
        items={cities}
        itemTitle={'title'}
      />

      <Autocomplete
        label={'Position'}
        onChangeText={val => {
          setEmployee({...employee, position: val});
        }}
        value={employee}
        valueKey={'position'}
        items={positions}
        itemTitle={'title'}
      />

      <ModalSelect
        label={'Schedule'}
        onChangeText={val => {
          setEmployee({...employee, schedule: val});
        }}
        value={employee}
        valueKey={'schedule'}
        items={schedules}
        itemTitle={'title'}
      />

      <Text style={globalStyles.label}>Salary</Text>
      <TextInput
        style={globalStyles.primaryInput}
        keyboardType={'number-pad'}
        onChangeText={val => {
          setEmployee({
            ...employee,
            salary: val.length > 0 ? Number(val) : null,
          });
        }}
        value={employee.salary ? employee.salary.toString() : null}
      />

      <Text style={globalStyles.label}>E-mail</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setEmployee({...employee, email: val});
        }}
        value={employee.email}
      />

      <Text style={globalStyles.label}>Description</Text>
      <TextInput
        multiline={true}
        style={[globalStyles.primaryInput, globalStyles.multiline]}
        onChangeText={val => {
          setEmployee({...employee, description: val});
        }}
        value={employee.description}
      />

      <View style={styles.btn}>
        <PrimaryButton label={'Save'} onPress={() => save()} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  fullScreenSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  profilePhoto: {
    marginBottom: 24,
    paddingTop: 16,
    alignItems: 'center',
  },
  imageWrapper: {
    height: 128,
    width: 128,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: '#cccccc',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  btn: {
    marginBottom: 42,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  warningText: {
    color: '#E74C3C',
  },
});
