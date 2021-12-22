import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {searchJobs} from '../../services/JobsService';
import {JobCard} from './components/JobCard';
import {useSelector} from 'react-redux';
import UsersInfo from './components/UsersInfo';
import OptionsButton from '../../components/buttons/OptionsButton';
import Header from '../../components/Header';

export const JobsScreen = ({navigation}) => {
  const filterState = useSelector(state => state.jobs.filter);
  const [usersNumber, setUsersNumber] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
            navigation.navigate('JobsFilterScreen');
          }}
        />
      </Header>

      {jobs.length > 0 ? (
        <ScrollView>
          {jobs &&
            jobs.map((item, index) => (
              <JobCard
                onPress={() => {
                  navigation.navigate('Job', {job: item});
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
