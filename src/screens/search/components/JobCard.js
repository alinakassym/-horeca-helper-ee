import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors} from '../../../styles/colors';
import SmallBadge from '../../../components/SmallBadge';

const dimensions = Dimensions.get('screen');

export const JobCard = ({item, onPress}) => {
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };
  return (
    <Pressable style={globalStyles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.leftCol}>
          <Text style={styles.positionTitle}>{item?.position?.title_ru}</Text>
          <SmallBadge style={{marginLeft: 8}} text={'TOP'} color={'#9B51E0'} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: item.company.photoUrl}} />
          {item.isActive && <View style={styles.indicator} />}
        </View>
      </View>
    </Pressable>
  );
};

const width = dimensions.width;
const imageSize = 80;
const padding = 20;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  leftCol: {
    width: width - imageSize - padding * 2 - 8,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  imageWrapper: {
    position: 'relative',
    marginLeft: 8,
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: imageSize,
    overflow: 'hidden',
  },
  positionTitle: {
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
});
