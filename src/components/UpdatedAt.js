import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {PrimaryColors} from '../styles/colors';

const propTypes = {
  date: PropTypes.string,
};
class UpdatedAt extends React.PureComponent {
  render() {
    const formatDate = val => moment(val).locale('ru').format('DD MMM YYYY');
    const {date} = this.props;

    return <Text style={styles.updatedAt}>Обновлено {formatDate(date)}</Text>;
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
