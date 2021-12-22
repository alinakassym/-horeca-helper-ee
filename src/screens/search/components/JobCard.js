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
import {IconBuilding} from '../../../assets/icons/main/IconBuilding';
import {IconAddress} from '../../../assets/icons/main/IconAddress';
import RatingScale from '../../../components/RatingScale';
import GradientButton from '../../../components/buttons/GradientButton';
import OutlineButton from '../../../components/buttons/OutlineButton';

const dimensions = Dimensions.get('screen');

export const JobCard = ({item, onPress}) => {
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  const getSalary = (salaryMin, salaryMax) => {
    if (salaryMin && salaryMax) {
      return `${numberWithSpaces(salaryMin)} - ${numberWithSpaces(salaryMax)}`;
    } else if (salaryMin) {
      return `от ${numberWithSpaces(salaryMin)}`;
    }
    return `до ${numberWithSpaces(salaryMax)}`;
  };
  return (
    <Pressable style={globalStyles.card} onPress={onPress}>
      <View style={[styles.row, styles.mb]}>
        <View style={styles.leftCol}>
          <View style={styles.row}>
            <Text style={styles.positionTitle}>{item?.position?.title_ru}</Text>
            <SmallBadge
              style={{marginLeft: 8}}
              text={'TOP'}
              color={'#9B51E0'}
            />
          </View>
          <View style={[styles.row, styles.alignCenter]}>
            <IconBuilding color={PrimaryColors.grey1} size={16} />
            <Text style={[styles.text, styles.ml]}>{item.company.title}</Text>
          </View>
          <View style={[styles.row, styles.alignCenter]}>
            <IconAddress color={PrimaryColors.grey1} size={16} />
            <Text numberOfLines={1} style={[styles.text, styles.ml]}>
              {item.company.address}
            </Text>
          </View>
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: item.company.photoUrl}} />
          {item.isActive && <View style={styles.indicator} />}
        </View>
      </View>
      <View style={[styles.row, styles.justifyBetween]}>
        <Text style={styles.salary}>
          {getSalary(item.salaryMin, item.salaryMax)} ₸
        </Text>
        <RatingScale score={Math.ceil(item.company.avgAvgScore)} />
      </View>
      <Text style={[styles.text, styles.mb]}>{item.description}</Text>
      <View style={[styles.row]}>
        <GradientButton style={{width: width - 196}} label={'Откликнуться'} />
        <OutlineButton
          style={{marginLeft: 8, width: 148}}
          label={'В избранные'}
        />
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
  alignCenter: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  leftCol: {
    width: width - imageSize - padding * 2 - 8,
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
  ml: {
    marginLeft: 6,
  },
  mb: {
    marginBottom: 24,
  },
  salary: {
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    lineHeight: 24,
    color: PrimaryColors.element,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
});
