import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';

const dimensions = Dimensions.get('screen');

export const ProfileHeader = ({firstName, lastName, description, photoUrl}) => {
  return (
    <View style={styles.col}>
      <View style={styles.row}>
        <Text style={styles.title}>
          {firstName} {lastName}
        </Text>
        <View style={styles.imageWrapper}>
          {photoUrl && <Image style={styles.image} source={{uri: photoUrl}} />}
        </View>
      </View>
      {description?.length > 0 && (
        <Text numberOfLines={3} style={styles.description}>
          {description}
        </Text>
      )}
    </View>
  );
};

const width = dimensions.width - 20;
const padding = 20;
const imageSize = 64;

const styles = StyleSheet.create({
  col: {
    paddingVertical: 24,
    width: width,
    flexDirection: 'column',
    borderColor: PrimaryColors.grey3,
    borderBottomWidth: 0.7,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: width - imageSize - padding * 2,
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    lineHeight: 28,
    color: PrimaryColors.element,
  },
  imageWrapper: {
    marginLeft: padding,
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    marginTop: padding,
    width: width - padding,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
});
