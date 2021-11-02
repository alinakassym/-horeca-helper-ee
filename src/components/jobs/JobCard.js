import React from 'react';
import {Text, View, Pressable, StyleSheet, Image} from 'react-native';
import moment from 'moment';

export const JobCard = ({item, onPress}) => {
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={[styles.col, styles.textData]}>
          <Text style={styles.positionTitle}>
            {item.position.title} {item.schedule && `(${item.schedule.title})`}
          </Text>
          {item.salaryMin && item.salaryMax ? (
            <Text style={styles.salary}>
              {numberWithSpaces(item.salaryMin)} -{' '}
              {numberWithSpaces(item.salaryMax)} KZT
            </Text>
          ) : item.salaryMin ? (
            <Text style={styles.salary}>
              From {numberWithSpaces(item.salaryMin)} KZT
            </Text>
          ) : (
            <Text style={styles.salary}>
              To {numberWithSpaces(item.salaryMax)} KZT
            </Text>
          )}
          {item.city && <Text style={styles.cityTitle}>{item.city.title}</Text>}
          <Text style={styles.companyTitle}>{item.company.title}</Text>
          {!!item.description && (
            <Text numberOfLines={1} style={styles.description}>
              {item.description}
            </Text>
          )}
          <Text style={styles.createdAt}>
            Last updated on: {moment(item.updatedAt).format('MMM YYYY')}
          </Text>
        </View>

        <View style={[styles.col, styles.floatLeftTop]}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: item.company.photoUrl}} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'column',
  },
  textData: {
    maxWidth: 280,
  },
  floatLeftTop: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 4,
    backgroundColor: '#767676',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  positionTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#000000',
  },
  salary: {
    marginBottom: 8,
    color: '#000000',
  },
  cityTitle: {
    marginBottom: 2,
    color: '#000000',
  },
  companyTitle: {
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    marginBottom: 4,
  },
  createdAt: {},
});
