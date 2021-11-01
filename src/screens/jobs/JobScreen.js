import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
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
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.positionTitle}>
            {job.position.title} {job.schedule && `(${job.schedule.title})`}
          </Text>
          {job.salaryMin && job.salaryMax ? (
            <Text style={styles.salary}>
              {job.salaryMin} - {job.salaryMax} KZT
            </Text>
          ) : job.salaryMin ? (
            <Text style={styles.salary}>From {job.salaryMin} KZT</Text>
          ) : (
            <Text style={styles.salary}>To {job.salaryMax} KZT</Text>
          )}
          {job.city && <Text style={styles.cityTitle}>{job.city.title}</Text>}
          <Text style={styles.companyTitle}>{job.company.title}</Text>
          <Text style={styles.companyDescription}>
            {job.company.description}
          </Text>
          <Text style={styles.description}>{job.description}</Text>
          <Text style={styles.createdAt}>Created at: {job.createdAt}</Text>
        </View>

        <View style={[styles.col, styles.floatLeftTop]}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: job.company.photoUrl}} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
  },
  col: {
    flexDirection: 'column',
  },
  floatLeftTop: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: -28,
  },
  imageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: '#767676',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  positionTitle: {
    marginBottom: 18,
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    color: '#000000',
  },
  salary: {
    marginBottom: 18,
    fontSize: 16,
    color: '#000000',
  },
  cityTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#000000',
  },
  companyTitle: {
    marginBottom: 4,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#000000',
  },
  companyDescription: {
    marginBottom: 18,
    fontSize: 16,
  },
  description: {
    marginBottom: 18,
    fontSize: 16,
    color: '#000000',
  },
  createdAt: {},
});

export default JobScreen;
