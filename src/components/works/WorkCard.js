import React from 'react';
import {StyleSheet, Image, Text, View, Dimensions} from 'react-native';
import {IconExpandRightLight} from '../../assets/icons/main/IconExpandRightLight';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {IconChecked} from '../../assets/icons/main/IconChecked';

const dimensions = Dimensions.get('screen');

export const WorkCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style={[styles.section, styles.row]} onPress={onPress}>
      <View style={styles.leftCol}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: item.company.photoUrl}} />
          {item.isConfirmed && (
            <View style={styles.iconWrapper}>
              <IconChecked color={'#185AB7'} size={18} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.rightCol}>
        <Text style={styles.title}>{item.position.title}</Text>
        <Text style={styles.text}>{item.company.title}</Text>
        {item.startDate && (
          <Text style={styles.date}>
            {moment(item.startDate).format('MMM YYYY')}{' '}
            {item.endDate ? `- ${moment(item.endDate).format('MMM YYYY')}` : ''}
          </Text>
        )}
      </View>
      <View style={styles.expandRight}>
        <IconExpandRightLight color={'#767676'} size={24} width={1.5} />
      </View>
    </TouchableOpacity>
  );
};

const imageSize = dimensions.width * 0.16;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 16,
    width: dimensions.width,
  },
  row: {
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  leftCol: {
    width: imageSize + 16,
    flexDirection: 'column',
  },
  rightCol: {
    width: dimensions.width - imageSize - 74,
  },
  expandRight: {
    width: 24,
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 16,
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: imageSize,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    marginBottom: 4,
    fontSize: 18,
    lineHeight: 20,
    color: '#000000',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 6,
    fontSize: 14,
    color: '#000000',
  },
  date: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 6,
    fontSize: 14,
    color: '#555555',
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
  },
});
