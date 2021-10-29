import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getJobById} from '../../services/JobsService';

export const JobScreen = ({route, navigation}) => {
  const jobId = route.params ? route.params.jobId : null;

  const [job, onChange] = React.useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchData() {
      const unsubscribe = navigation.addListener('focus', async () => {
        // The screen is focused
        const hhToken = await AsyncStorage.getItem('hhToken');

        console.log('jobId', jobId);
        getJobById(jobId, hhToken).then(data => {
          onChange(data.data);
          setLoading(false);
        });
      });

      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }
    fetchData();
  }, [jobId, navigation]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {/*Company*/}
      <Text>Company: {job.company?.title}</Text>

      {/*Position*/}
      <Text>Position: {job.position?.title}</Text>

      {/*Job location*/}
      <Text>Location: {job.city?.title}</Text>

      {/*Schedule*/}
      <Text>Schedule: {job.schedule?.title}</Text>

      {/*Age*/}
      <Text>
        Age: {job.ageMin} - {job.ageMax || 'Not entered'}
      </Text>

      {/*Gender*/}
      <Text>Gender: {job.gender?.title}</Text>

      {/*Experience*/}
      <Text>
        Experience: {job.experienceMin} - {job.experienceMax || 'Not entered'}{' '}
        years
      </Text>

      {/*Salary*/}
      <Text>
        Salary: {job.salaryMin} {job.salaryMax ? `- ${job.salaryMax}` : ''}{' '}
        USD
      </Text>

      {/*Description*/}
      <Text>Description: {job.description}</Text>



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sliderWrapper: {
    paddingTop: 38,
    alignItems: 'center',
  },
  btnSection: {
    marginBottom: 42,
  },
  btn: {
    marginBottom: 16,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
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
});

export default JobScreen;
