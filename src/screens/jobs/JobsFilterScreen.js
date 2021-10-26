import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPositions} from '../../services/DictionariesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import PrimaryButton from '../../components/buttons/PrimaryButton';

export const JobsFilterScreen = ({route, navigation}) => {
  const [filters, setFilters] = useState({});

  const [positions, setPositions] = useState([]);

  const apply = () => {
    navigation.navigate('Jobs', { value: filters });
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
        label={'Position'}
        value={filters}
        valueKey={'position'}
        items={positions}
        itemTitle={'title'}
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
