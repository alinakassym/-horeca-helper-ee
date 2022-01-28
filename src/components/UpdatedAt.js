import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {PrimaryColors} from '../styles/colors';
import i18 from '../assets/i18n/i18n';

const propTypes = {
  locale: PropTypes.string,
  date: PropTypes.string,
};
class UpdatedAt extends React.PureComponent {
  render() {
    const {locale, date} = this.props;
    const formatDate = val =>
      moment(val)
        .locale(locale || 'ru')
        .format('DD MMM YYYY');

    return (
      <Text style={styles.updatedAt}>
        {i18.t('Updated at')} {formatDate(date)}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  updatedAt: {
    padding: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'center',
    color: PrimaryColors.grey1,
    backgroundColor: PrimaryColors.grey4,
  },
});

UpdatedAt.propTypes = propTypes;
export default UpdatedAt;
