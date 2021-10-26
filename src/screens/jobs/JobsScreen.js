import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {searchJobs} from '../../services/JobsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {JobCard} from '../../components/jobs/JobCard';

export const JobsScreen = ({navigation}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const unsubscribe = navigation.addListener('focus', async () => {
        // The screen is focused
        const hhToken = await AsyncStorage.getItem('hhToken');
        searchJobs({}, hhToken)
          .then(result => {
            console.log('jobs: ', result.data);
            setJobs(result.data.items);
          })
          .catch(e => {
            console.log('searchJobs err:', e);
          });
      });

      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }
    fetchData().then();
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Astana</Text>
        <Text style={styles.title}>123</Text>
      </View>

      {/*<Text>{jobs.toString()}</Text>*/}
      <ScrollView>
        <View style={styles.section}>
          {jobs &&
            jobs.map((item, index) => <JobCard key={index} item={item} />)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    marginTop: 16,
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
  section: {
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  btn: {
    marginBottom: 16,
  },
});
