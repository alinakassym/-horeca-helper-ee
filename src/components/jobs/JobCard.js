import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {IconStar} from '../../assets/icons/main/IconStar';
const dimensions = Dimensions.get('screen');

export const JobCard = ({item, onPress}) => {
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };
  return (
    <Pressable style={[styles.card, styles.row]} onPress={onPress}>
      <View style={[styles.leftCol]}>
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
          Last updated on: {moment(item.updatedAt).format('MMM-D, YYYY')}
        </Text>
      </View>

      <View style={[styles.rightCol]}>
        <View style={styles.imageWrapper}>
          <Image style={styles.img} source={{uri: item.company.photoUrl}} />
        </View>
        {item.company.avgAvgScore && (
          <View style={[styles.row, styles.alignCenter]}>
            <View style={styles.scoreIcon}>
              <IconStar color={'#F1C40F'} fillColor={'#F1C40F'} size={14} />
            </View>
            <Text style={styles.text}>{item.company.avgAvgScore} </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const imageSize = dimensions.width * 0.16;

const styles = StyleSheet.create({
  card: {
    width: dimensions.width,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  leftCol: {
    paddingRight: 8,
    width: dimensions.width - imageSize - 32,
  },
  rightCol: {
    width: imageSize,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageWrapper: {
    marginBottom: 8,
    height: imageSize,
    width: imageSize,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
    backgroundColor: '#767676',
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
  text: {
    color: '#000000',
  },
  scoreIcon: {
    marginRight: 4,
    alignItems: 'center',
  },
});
