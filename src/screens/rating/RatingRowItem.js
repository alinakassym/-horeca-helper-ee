import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {IconStar} from '../../assets/icons/main/IconStar';

export const RatingRowItem = ({name, location, position, item}) => {
  return (
    <View style={[styles.row, styles.divider]}>
      <View style={styles.col}>
        <View style={styles.imageWrapper}>
          <Image />
        </View>
        <View>
          <Text style={globalStyles.label1}>{name}</Text>
          <Text style={globalStyles.caption}>
            {location} - {position}
          </Text>
          <Text style={globalStyles.caption}>{item}</Text>
        </View>
      </View>
      <View style={styles.col}>
        <Text style={[globalStyles.label1, {marginRight: 8}]}>5</Text>
        <IconStar color={'#F1C40F'} fillColor={'#F1C40F'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  imageWrapper: {
    marginRight: 16,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#767676',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
  },
});
