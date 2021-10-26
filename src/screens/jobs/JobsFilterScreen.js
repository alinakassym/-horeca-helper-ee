import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getCities,
  getGenders,
  getPositions,
  getSchedules
} from "../../services/DictionariesService";
import {ModalSelect} from '../../components/selects/ModalSelect';
import PrimaryButton from "../../components/buttons/PrimaryButton";

export const JobsFilterScreen = ({route, navigation}) => {
  const [filters, setFilters] = useState({});

  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const apply = () => {
    const filtersData = {
      position: filters.position,
      positionId: filters.position ? filters.position.id : null,
    }
    navigation.navigate('Jobs', { value: filtersData });
  }

  useEffect(() => {
    function fetchData() {
      const unsubscribe = navigation.addListener('focus', async () => {
        // The screen is focused
        const hhToken = await AsyncStorage.getItem('hhToken');
        getCities(hhToken)
          .then(citiesData => {
            // console.log('cities: ', citiesData);
            setCities(citiesData);
          })
          .catch(e => {
            console.log('getCities err:', e);
          });

        getGenders(hhToken)
          .then(gendersData => {
            // console.log('genders: ', gendersData);
            setGenders(gendersData);
          })
          .catch(e => {
            console.log('getGenders err:', e);
          });

        getPositions(hhToken)
          .then(positionsData => {
            // console.log('positions: ', positionsData);
            setPositions(positionsData);
          })
          .catch(e => {
            console.log('getPositions err:', e);
          });

        getSchedules(hhToken)
          .then(schedulesData => {
            // console.log('schedules', schedulesData);
            setSchedules(schedulesData);
          })
          .catch(e => {
            console.log('getSchedules err:', e);
          });
      });

      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }
    fetchData();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/*Position*/}
      <ModalSelect
        onChange={val => {
          setFilters({...filters, positionId: val.id})
        }}
        label={'Position'}
        value={filters}
        valueKey={'position'}
        items={positions}
        itemTitle={'title'}
      />

      <View style={styles.btn}>
        <PrimaryButton label={'Save'} onPress={() => {navigation.navigate('Jobs', { value: filters })}} />
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
