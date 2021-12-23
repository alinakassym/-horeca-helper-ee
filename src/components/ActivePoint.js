import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {PrimaryColors, StatusesColors} from '../styles/colors';

const propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
};

class ActivePoint extends React.PureComponent {
  render() {
    const {color, style} = this.props;
    const bgColor = {backgroundColor: color ? color : StatusesColors.green};
    return <View style={[styles.isActive, bgColor, style]} />;
  }
}

const styles = StyleSheet.create({
  isActive: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: PrimaryColors.white,
  },
});

ActivePoint.propTypes = propTypes;
export default ActivePoint;
