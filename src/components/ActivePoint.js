import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {PrimaryColors, StatusesColors} from '../styles/colors';

const propTypes = {
  style: PropTypes.object,
};

class ActivePoint extends React.PureComponent {
  render() {
    const {style} = this.props;
    return <View style={[styles.isActive, style]} />;
  }
}

const styles = StyleSheet.create({
  isActive: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: PrimaryColors.white,
    backgroundColor: StatusesColors.green,
  },
});

ActivePoint.propTypes = propTypes;
export default ActivePoint;
