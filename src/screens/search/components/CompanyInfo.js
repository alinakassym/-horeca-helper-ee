import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';

// styles
import {PrimaryColors} from '../../../styles/colors';

// components
import RatingScale from '../../../components/RatingScale';

// utils
import {numberWithSpaces} from '../../../utils/common';

// locale
import i18n from '../../../assets/i18n/i18n';

const dimensions = Dimensions.get('screen');

const propTypes = {
  avgAvgScore: PropTypes.number,
  position: PropTypes.string,
  location: PropTypes.string,
  schedule: PropTypes.string,
  email: PropTypes.string,
  salaryMin: PropTypes.number,
  salaryMax: PropTypes.number,
};

class CompanyInfo extends React.PureComponent {
  render() {
    const {avgAvgScore, position, location, schedule, salaryMin, salaryMax} =
      this.props;

    const getSalary = () => {
      if (salaryMin && salaryMax) {
        return `${numberWithSpaces(salaryMin)} - ${numberWithSpaces(
          salaryMax,
        )}`;
      } else if (salaryMin) {
        return `от ${numberWithSpaces(salaryMin)}`;
      }
      return `до ${numberWithSpaces(salaryMax)}`;
    };

    return (
      <View style={styles.col}>
        {!!avgAvgScore && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Rating')}</Text>
            <View style={styles.rightCol}>
              <RatingScale score={Math.ceil(avgAvgScore)} />
            </View>
          </View>
        )}
        {position && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Position')}</Text>
            <Text style={styles.rightColText}>{position}</Text>
          </View>
        )}
        {location && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Address')}</Text>
            <Text style={styles.rightColText}>{location}</Text>
          </View>
        )}
        {schedule && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Schedule')}</Text>
            <Text style={styles.rightColText}>{schedule}</Text>
          </View>
        )}
        {(salaryMin || salaryMax) && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Salary')}</Text>
            <Text style={styles.rightColText}>{getSalary()} ₸</Text>
          </View>
        )}
      </View>
    );
  }
}

const width = dimensions.width;
const leftColWidth = dimensions.width * 0.2;
const padding = 20;

const styles = StyleSheet.create({
  col: {
    marginTop: 8,
    paddingTop: padding,
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
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'right',
    color: PrimaryColors.grey1,
  },
  rightColText: {
    marginLeft: 8,
    width: width - leftColWidth - 8 - padding * 2,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'right',
    color: PrimaryColors.element,
  },
});

CompanyInfo.propTypes = propTypes;

export default CompanyInfo;
