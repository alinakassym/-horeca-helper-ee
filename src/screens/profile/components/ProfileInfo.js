import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import {IconStar} from '../../../assets/icons/main/IconStar';
import PropTypes from 'prop-types';

const dimensions = Dimensions.get('screen');

const propTypes = {
  avgAvgScore: PropTypes.number,
  contactInfo: PropTypes.string,
  age: PropTypes.number,
  city: PropTypes.string,
  email: PropTypes.string,
};

class ProfileInfo extends React.PureComponent {
  render() {
    const {avgAvgScore, contactInfo, age, city, email} = this.props;
    const getAgeTextRu = () => {
      const unit = age % 10;
      return unit === 0
        ? 'лет'
        : unit === 1
        ? 'год'
        : unit < 5
        ? 'года'
        : 'лет';
    };
    return (
      <View style={styles.col}>
        {avgAvgScore && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>Рейтинг</Text>
            <View style={styles.rightCol}>
              <Text style={styles.text}>{avgAvgScore}</Text>
              <IconStar
                color={StatusesColors.orange}
                fillColor={StatusesColors.orange}
              />
            </View>
          </View>
        )}
        {contactInfo && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>Телефон</Text>
            <Text style={styles.rightColText}>{contactInfo}</Text>
          </View>
        )}
        {age && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>Возраст</Text>
            <Text style={styles.rightColText}>
              {age} {getAgeTextRu()}
            </Text>
          </View>
        )}
        {city && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>Город</Text>
            <Text style={styles.rightColText}>{city}</Text>
          </View>
        )}
        {email && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>Эл.почта</Text>
            <Text style={styles.rightColText}>{email}</Text>
          </View>
        )}
      </View>
    );
  }
}

const width = dimensions.width;
const leftColWidth = dimensions.width * 0.17;
const padding = 20;

const styles = StyleSheet.create({
  col: {
    paddingHorizontal: padding,
    width: width,
    flexDirection: 'column',
    backgroundColor: PrimaryColors.white,
  },
  row: {
    marginBottom: padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftColText: {
    width: leftColWidth,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
  rightCol: {
    marginLeft: 8,
    width: width - leftColWidth - 8 - padding * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    marginRight: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'right',
    color: PrimaryColors.element,
  },
  rightColText: {
    marginLeft: 8,
    width: width - leftColWidth - 8 - padding * 2,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'right',
    color: PrimaryColors.element,
  },
});

ProfileInfo.propTypes = propTypes;

export default ProfileInfo;
