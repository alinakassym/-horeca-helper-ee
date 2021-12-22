import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PrimaryColors} from '../../styles/colors';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
  style: PropTypes.object,
};

class OutlineButton extends React.PureComponent {
  render() {
    const {label, color, onPress, style} = this.props;
    const btnColor = color || PrimaryColors.brand;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.btn, style, {borderColor: btnColor}]}>
        <Text style={[styles.btnLabel, {color: btnColor}]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  btnLabel: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.white,
  },
});

OutlineButton.propTypes = propTypes;

export default OutlineButton;
