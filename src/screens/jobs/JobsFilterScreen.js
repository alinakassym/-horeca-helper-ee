import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPositions} from '../../services/DictionariesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../store/slices/jobs';
import {globalStyles} from '../../styles/globalStyles';

export const JobsFilterScreen = ({route, navigation}) => {
  const filterState = useSelector((state) => state.jobs.filter)
  const dispatch = useDispatch()

  const [filters, setFilters] = useState({...filterState});

  const [positions, setPositions] = useState([]);

  const apply = async() => {
    await dispatch(setFilter(filters));
    navigation.navigate('Jobs');
  };
  const getData = async() => {
    const hhToken = await AsyncStorage.getItem('hhToken');
    return Promise.all([
      getPositions(hhToken)
    ])
  };

  useEffect(() => {
    function fetchData() {
      const unsubscribe = navigation.addListener('focus', async () => {
        getData()
          .then(([positionsData]) => {
            setPositions(positionsData);
          })
          .catch(err =>{
            console.log(err);
          })

      });
      return unsubscribe;
    }
    fetchData();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/*Position*/}
      <ModalSelect
        onChangeText={val => {
          setFilters({...filters, position: val});
        }}
        label={'Position'}
        value={filters}
        valueKey={'position'}
        items={positions}
        itemTitle={'title'}
      />

      <Text style={globalStyles.label}>Test</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setFilters({...filters, test: val})
        }}
        value={filters.test}
      />

      <View style={styles.btn}>
        <PrimaryButton label={'Save'} onPress={() => apply()} />
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
