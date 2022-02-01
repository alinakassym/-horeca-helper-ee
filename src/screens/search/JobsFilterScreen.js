import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconBucket} from '../../assets/icons/main/IconBucket';

// components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import PlainButton from '../../components/buttons/PlainButton';
import GroupButton from '../../components/buttons/GroupButton';
import ExpansionPanel from '../../components/ExpansionPanel';
import RadioBtn from '../../components/buttons/RadioBtn';
import NumberInput from '../../components/inputs/NumberInput';
import GradientButton from '../../components/buttons/GradientButton';
import LinearGradient from 'react-native-linear-gradient';

// store
import {useDispatch, useSelector} from 'react-redux';
import {setFilter, setFilterApplied} from '../../store/slices/jobs';

// services
import {
  getCategories,
  getCities,
  getGenders,
  getPositions,
  getSchedules,
} from '../../services/DictionariesService';

// locale
import i18n from '../../assets/i18n/i18n';

const dimensions = Dimensions.get('screen');

export const JobsFilterScreen = ({navigation}) => {
  const {locale} = useSelector(state => state);
  const suffix = locale.suffix;
  const titleKey = `title${suffix}`;

  const filterState = useSelector(state => {
    const {jobs} = state;
    return jobs.filter;
  });
  const filterResetState = useSelector(state => {
    const {jobs} = state;
    return jobs.filterReset;
  });
  const sortBy = useSelector(state => {
    const {jobs} = state;
    return jobs.sortBy;
  });

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({...filterState});

  const [positions, setPositions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [listSortBy] = useState(sortBy);

  const apply = async () => {
    console.log({filters});
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
    navigation.addListener('focus', async () => {
      try {
        const [
          categoriesData,
          citiesData,
          positionsData,
          gendersData,
          schedulesData,
        ] = await getData();

        setCategories(categoriesData);
        setCities(citiesData);
        setPositions(positionsData);
        setGenders(gendersData);
        setSchedules(schedulesData);
      } catch (e) {
        console.log('getData err: ', e);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        headerStyle={globalStyles.mr4}
        goBack
        onClose={() => navigation.goBack()}
        title={i18n.t('Filter')}>
        <PlainButton
          onPress={() => resetFilter()}
          btnStyle={styles.resetBtn}
          label={i18n.t('Reset')}>
          <IconBucket
            width={1.5}
            size={16}
            color={PrimaryColors.brand}
            style={globalStyles.mr2}
          />
        </PlainButton>
      </Header>
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <View style={globalStyles.card}>
          <GroupButton
            label={i18n.t('Sort by')}
            selectedItem={filters.orderBy}
            items={listSortBy}
            itemKey={titleKey}
            onSelect={val => {
              setFilters({...filters, orderBy: val});
            }}
          />
        </View>

        <View style={[globalStyles.mt3, globalStyles.mb6]}>
          {/*Категория*/}
          <ExpansionPanel
            items={[{title: i18n.t('Category')}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {categories.map((cItem, index) => (
              <RadioBtn
                style={
                  categories.length > 3 ? styles.radioBtn2 : styles.radioBtn1
                }
                key={index}
                item={cItem}
                itemKey={titleKey}
                activeItem={filters.companyCategory}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    companyCategory:
                      cItem?.id === filters.companyCategory?.id ? null : cItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Город*/}
          <ExpansionPanel
            items={[{title: i18n.t('City')}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {cities.map((cItem, index) => (
              <RadioBtn
                style={cities.length > 3 ? styles.radioBtn2 : styles.radioBtn1}
                key={index}
                item={cItem}
                itemKey={titleKey}
                activeItem={filters.city}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    city: cItem?.id === filters.city?.id ? null : cItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Позиция*/}
          <ExpansionPanel
            items={[{title: i18n.t('Position')}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {positions.map((pItem, index) => (
              <RadioBtn
                style={
                  positions.length > 3 ? styles.radioBtn2 : styles.radioBtn1
                }
                key={index}
                item={pItem}
                itemKey={titleKey}
                activeItem={filters.position}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    position: pItem?.id === filters.position?.id ? null : pItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Расписание*/}
          <ExpansionPanel
            items={[{title: i18n.t('Schedule')}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {schedules.map((sItem, index) => (
              <RadioBtn
                style={
                  schedules.length > 3 ? styles.radioBtn2 : styles.radioBtn1
                }
                key={index}
                item={sItem}
                itemKey={titleKey}
                activeItem={filters.schedule}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    schedule: sItem?.id === filters.schedule?.id ? null : sItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Зарплата*/}
          <ExpansionPanel
            items={[{title: i18n.t('Salary')}]}
            expandedBlockStyle={styles.wrapperInputs}>
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={i18n.t('From')}
              value={filters.salaryMin ? filters.salaryMin.toString() : null}
              onChangeText={val => {
                setFilters({...filters, salaryMin: val});
              }}
              onClear={() => {
                setFilters({...filters, salaryMin: null});
              }}
            />
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={i18n.t('To')}
              value={filters.salaryMax ? filters.salaryMax.toString() : null}
              onChangeText={val => {
                setFilters({...filters, salaryMax: val});
              }}
              onClear={() => {
                setFilters({...filters, salaryMax: null});
              }}
            />
          </ExpansionPanel>

          {/*Возраст*/}
          <ExpansionPanel
            items={[{title: i18n.t('Age')}]}
            expandedBlockStyle={styles.wrapperInputs}>
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={i18n.t('From')}
              value={filters.ageMin ? filters.ageMin.toString() : null}
              onChangeText={val => {
                setFilters({...filters, ageMin: val});
              }}
              onClear={() => {
                setFilters({...filters, ageMin: null});
              }}
            />
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={i18n.t('To')}
              value={filters.ageMax ? filters.ageMax.toString() : null}
              onChangeText={val => {
                setFilters({...filters, ageMax: val});
              }}
              onClear={() => {
                setFilters({...filters, ageMax: null});
              }}
            />
          </ExpansionPanel>

          {/*Пол*/}
          <ExpansionPanel
            items={[{title: i18n.t('Gender')}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {genders.map((gItem, index) => (
              <RadioBtn
                style={styles.radioBtn2}
                key={index}
                item={gItem}
                itemKey={titleKey}
                activeItem={filters.gender}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    gender: gItem?.id === filters.gender?.id ? null : gItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Опыт*/}
          <ExpansionPanel
            items={[{title: i18n.t('Experience')}]}
            expandedBlockStyle={styles.wrapperInputs}>
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={i18n.t('From')}
              value={
                filters.experienceMin ? filters.experienceMin.toString() : null
              }
              onChangeText={val => {
                setFilters({...filters, experienceMin: val});
              }}
              onClear={() => {
                setFilters({...filters, experienceMin: null});
              }}
            />
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={i18n.t('To')}
              value={
                filters.experienceMax ? filters.experienceMax.toString() : null
              }
              onChangeText={val => {
                setFilters({...filters, experienceMax: val});
              }}
              onClear={() => {
                setFilters({...filters, experienceMax: null});
              }}
            />
          </ExpansionPanel>
        </View>
      </KeyboardAwareScrollView>
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 1)',
        ]}
        style={styles.btnSection}>
        <GradientButton
          style={styles.btn}
          label={'Применить фильтр'}
          onPress={() => apply()}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const width = dimensions.width;

const styles = StyleSheet.create({
  btnSection: {
    marginTop: -20,
    paddingTop: 22,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 90,
    alignItems: 'center',
  },
  btn: {
    width: width * 0.45,
    minWidth: 180,
  },
  resetBtn: {
    paddingVertical: 4,
    minHeight: 18,
    alignSelf: 'flex-end',
  },
  wrapperRadio: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioBtn1: {
    width: width - 40,
  },
  radioBtn2: {
    width: width * 0.5 - 20,
  },
  wrapperInputs: {
    marginLeft: -20,
    paddingLeft: 40,
    width: width + 20,
    flexDirection: 'row',
  },
  numberInput: {
    marginRight: 20,
    width: width * 0.5 - 30,
  },
});
