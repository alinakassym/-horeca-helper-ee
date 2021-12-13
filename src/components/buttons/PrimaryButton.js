import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PrimaryColors} from '../../styles/colors';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

class PrimaryButton extends React.PureComponent {
  render() {
    const {label, color, onPress} = this.props;
    const btnColor = color || PrimaryColors.brand;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.btn, {backgroundColor: btnColor}]}>
        <Text style={styles.btnLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
  },
  btnLabel: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.white,
  },
});

PrimaryButton.propTypes = propTypes;

export default PrimaryButton;
