import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {searchJobs} from '../../services/JobsService';
import {JobCard} from '../../components/jobs/JobCard';
import {IconFilter} from '../../assets/icons/main/IconFilter';
import {useSelector} from 'react-redux';
import UsersInfo from './components/UsersInfo';
import OptionsButton from '../../components/buttons/OptionsButton';
import Header from '../../components/Header';

export const JobsScreen = ({navigation}) => {
  const filterState = useSelector(state => state.jobs.filter);
  const isFilterApplied = useSelector(state => state.jobs.isFilterApplied);
  const [usersNumber, setUsersNumber] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortBy = {
    updatedAt: 'date',
    relevance: 'relevance',
    salaryMin: 'min salary',
    salaryMax: 'max salary',
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const result = await searchJobs(filterState);
          setJobs(result.data.items);
          setUsersNumber(result.data.total);
          setLoading(false);
        } catch (e) {
          console.log('searchJobs err:', e);
        }
      });
    }
    fetchData();
  }, [filterState, navigation]);

  if (loading) {
    return (
      <View style={styles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <UsersInfo usersNumber={usersNumber} />
      <Header options title={'Поиск'} subtitle={'соискателей'}>
        <OptionsButton
          onPress={() => {
            navigation.navigate('FilterScreen');
          }}
        />
      </Header>
      <View style={styles.topSection}>
        <Text style={styles.title}>Astana</Text>
        <Text style={styles.title}>123</Text>
      </View>
      <View style={globalStyles.topBar}>
        <TouchableOpacity
          style={globalStyles.filterBtn}
          onPress={() => {
            navigation.navigate('JobsFilterScreen');
          }}>
          <IconFilter color={'#185AB7'} size={32} width={1.5} />
          {isFilterApplied && <View style={globalStyles.filterApplied} />}
          <Text style={globalStyles.filterBtnRightText}>Filters</Text>
        </TouchableOpacity>

        <View style={globalStyles.filterBtn}>
          <Text style={globalStyles.filterBtnLeftText}>
            Ordered by {sortBy[filterState.sortBy]}
          </Text>
        </View>
      </View>

      {jobs.length > 0 ? (
        <ScrollView>
          {jobs &&
            jobs.map((item, index) => (
              <JobCard
                onPress={() => {
                  navigation.navigate('JobScreen', {jobId: item.id});
                }}
                key={index}
                item={item}
              />
            ))}
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>No matches found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreenSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#000000',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  btn: {
    marginBottom: 16,
  },
});
