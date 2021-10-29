import React from 'react';
import {Text, View, Pressable, StyleSheet, Image} from 'react-native';

export const JobCard = ({item, onPress}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.positionTitle}>
            {item.position.title} {item.schedule && `(${item.schedule.title})`}
          </Text>
          {item.salaryMin && item.salaryMax ? (
            <Text style={styles.salary}>
              {item.salaryMin} - {item.salaryMax} $
            </Text>
          ) : item.salaryMin ? (
            <Text style={styles.salary}>From {item.salaryMin} $</Text>
          ) : (
            <Text style={styles.salary}>To {item.salaryMax} $</Text>
          )}
          {item.city && <Text style={styles.cityTitle}>{item.city.title}</Text>}
          <Text style={styles.companyTitle}>{item.company.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.createdAt}>{item.createdAt}</Text>
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
  floatLeftTop: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
