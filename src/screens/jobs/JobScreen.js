import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import {getJobById} from '../../services/JobsService';
import moment from 'moment';

export const JobScreen = ({route, navigation}) => {
  const jobId = route.params ? route.params.jobId : null;

  const [job, onChange] = React.useState({});
  const [loading, setLoading] = useState(true);

  const formatDate = date => {
    return moment(date).format('MMM-D, YYYY');
  };

  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const data = await getJobById(jobId);
          onChange(data.data);
          setLoading(false);
        } catch (e) {
          console.log('getJobById err: ', e);
        }
      });
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          {job.position && (
            <Text style={styles.positionTitle}>{job.position.title}</Text>
          )}
          <View style={styles.row}>
            <View style={[styles.col, {width: '20%'}]}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.img}
                  source={{uri: job.company.photoUrl}}
                />
              </View>
            </View>
            <View style={[styles.col, {width: '80%'}]}>
              <Text style={styles.companyTitle}>{job.company.title}</Text>
              <Text style={styles.companyDescription}>
                {job.company.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          {job.city && (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Location:</Text>
              <Text style={styles.text}> {job.city.title}</Text>
            </View>
          )}

          {job.salaryMin && job.salaryMax ? (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Salary:</Text>
              <Text style={styles.salary}>
                {' '}
                {numberWithSpaces(job.salaryMin)} -{' '}
                {numberWithSpaces(job.salaryMax)} KZT
              </Text>
            </View>
          ) : job.salaryMin ? (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Salary:</Text>
              <Text style={styles.salary}>
                {' '}
                from {numberWithSpaces(job.salaryMin)} KZT
              </Text>
            </View>
          ) : (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Salary:</Text>
              <Text style={styles.salary}>
                {' '}
                to {numberWithSpaces(job.salaryMax)} KZT
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          {!!job.description && job.description.length > 3 && (
            <View style={{width: '95%'}}>
              <Text style={[styles.text, styles.textBold]}>
                Description:
                <Text textBreakStrategy={'simple'} style={styles.text}>
                  {' '}
                  {job.description} Lorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Totam, veritatis?
                </Text>
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.createdAt}>
            Created on: {formatDate(job.createdAt)}
          </Text>
          <Text style={styles.createdAt}>
            Last updated on: {formatDate(job.updatedAt)}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 28,
  },
  section: {
    paddingHorizontal: 16,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  imageWrapper: {
    marginRight: 16,
    marginBottom: 16,
    height: 60,
    width: 60,
    borderRadius: 4,
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
  createdAt: {
    marginBottom: 4,
  },

  textBold: {
    fontFamily: 'Roboto-Bold',
    color: '#000000',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 8,
    fontSize: 16,
    color: '#000000',
  },
});

export default JobScreen;
