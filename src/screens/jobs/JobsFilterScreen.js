import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput} from 'react-native';
import {
  getPositions,
  getCategories,
  getCities,
  getGenders,
  getSchedules,
} from '../../services/DictionariesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {useSelector, useDispatch} from 'react-redux';
import {setFilter, setFilterApplied} from '../../store/slices/jobs';
import {globalStyles} from '../../styles/globalStyles';
import PlainButton from '../../components/buttons/PlainButton';
import {Autocomplete} from '../../components/selects/Autocomplete';

export const JobsFilterScreen = ({navigation}) => {
  const filterState = useSelector(state => state.jobs.filter);
  const filterResetState = useSelector(state => state.jobs.filterReset);
  const sortBy = useSelector(state => state.jobs.sortBy);

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({...filterState});

  const [positions, setPositions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [listSortBy, setSortBy] = useState(sortBy);

  const apply = async () => {
    await dispatch(setFilter(filters));
    await dispatch(setFilterApplied(true));
    navigation.navigate('Jobs');
  };

  const resetFilter = async () => {
    await dispatch(setFilter(filterResetState));
    await dispatch(setFilterApplied(false));
    navigation.navigate('Jobs');
  };

  const getData = async () => {
    return Promise.all([
      getCategories(),
      getCities(),
      getPositions(),
      getGenders(),
      getSchedules(),
    ]);
  };

  useEffect(() => {
    function fetchData() {
      const unsubscribe = navigation.addListener('focus', async () => {
        getData()
          .then(
            ([
              categoriesData,
              citiesData,
              positionsData,
              gendersData,
              schedulesData,
            ]) => {
              setPositions(positionsData);
              setCategories(categoriesData);
              setCities(citiesData);
              setGenders(gendersData);
              setSchedules(schedulesData);
            },
          )
          .catch(err => {
            console.log(err);
          });
      });
      return unsubscribe;
    }
    fetchData();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/*Order by*/}
      <ModalSelect
        onChangeText={val => {
          setFilters({...filters, orderBy: val});
        }}
        label={'Order by'}
        value={filters}
        valueKey={'orderBy'}
        items={listSortBy}
        itemTitle={'title'}
      />

      {/*City*/}
      <Autocomplete
        onChangeText={val => {
          setFilters({...filters, city: val});
        }}
        label={'City'}
        value={filters}
        valueKey={'city'}
        items={cities}
        itemTitle={'title'}
      />

      {/*categories*/}
      <ModalSelect
        onChangeText={val => {
          setFilters({...filters, companyCategory: val});
        }}
        label={'Category'}
        value={filters}
        valueKey={'companyCategory'}
        items={categories}
        itemTitle={'title'}
      />

      {/*Position*/}
      <Autocomplete
        onChangeText={val => {
          setFilters({...filters, position: val});
        }}
        label={'Position'}
        value={filters}
        valueKey={'position'}
        items={positions}
        itemTitle={'title'}
      />

      {/*Salary*/}
      <View>
        <Text style={globalStyles.label}>Salary</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={globalStyles.text}>Min</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={globalStyles.primaryInput}
              onChangeText={val => {
                setFilters({
                  ...filters,
                  salaryMin: val.length > 0 ? Number(val) : null,
                });
              }}
              value={filters.salaryMin ? filters.salaryMin.toString() : null}
            />
          </View>
          <View style={styles.col}>
            <Text style={globalStyles.text}>Max</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={globalStyles.primaryInput}
              onChangeText={val => {
                setFilters({
                  ...filters,
                  salaryMax: val.length > 0 ? Number(val) : null,
                });
              }}
              value={filters.salaryMax ? filters.salaryMax.toString() : null}
            />
          </View>
        </View>
      </View>

      {/*Schedule*/}
      <ModalSelect
        onChangeText={val => {
          setFilters({...filters, schedule: val});
        }}
        label={'Schedule'}
        value={filters}
        valueKey={'schedule'}
        items={schedules}
        itemTitle={'title'}
      />

      {/*Age*/}
      <View>
        <Text style={globalStyles.label}>Age</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={globalStyles.text}>From</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={globalStyles.primaryInput}
              onChangeText={val => {
                setFilters({
                  ...filters,
                  ageMin: val.length > 0 ? Number(val) : null,
                });
              }}
              value={filters.ageMin ? filters.ageMin.toString() : null}
            />
          </View>
          <View style={styles.col}>
            <Text style={globalStyles.text}>To</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={globalStyles.primaryInput}
              onChangeText={val => {
                setFilters({
                  ...filters,
                  ageMax: val.length > 0 ? Number(val) : null,
                });
              }}
              value={filters.ageMax ? filters.ageMax.toString() : null}
            />
          </View>
        </View>
      </View>

      {/*Genders*/}
      <ModalSelect
        onChangeText={val => {
          setFilters({...filters, gender: val});
        }}
        label={'Gender'}
        value={filters}
        valueKey={'gender'}
        items={genders}
        itemTitle={'title'}
      />

      {/*Experience*/}
      <View>
        <Text style={globalStyles.label}>Experience</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={globalStyles.text}>From</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={globalStyles.primaryInput}
              onChangeText={val => {
                setFilters({
                  ...filters,
                  experienceMin: val.length > 0 ? Number(val) : null,
                });
              }}
              value={
                filters.experienceMin ? filters.experienceMin.toString() : null
              }
            />
          </View>
          <View style={styles.col}>
            <Text style={globalStyles.text}>To</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={globalStyles.primaryInput}
              onChangeText={val => {
                setFilters({
                  ...filters,
                  experienceMax: val.length > 0 ? Number(val) : null,
                });
              }}
              value={
                filters.experienceMax ? filters.experienceMax.toString() : null
              }
            />
          </View>
        </View>
      </View>

      <View style={styles.btnSection}>
        <View style={styles.btn}>
          <PrimaryButton label={'Apply'} onPress={() => apply()} />
        </View>
        <PlainButton label={'Reset filters'} onPress={() => resetFilter()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    marginRight: -5,
    marginLeft: -5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
  },
  btnSection: {
    marginBottom: 42,
  },
  btn: {
    marginBottom: 16,
  },
});
