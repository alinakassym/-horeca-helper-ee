import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

class PrimaryButton extends React.PureComponent {
  render() {
    const {label, color, onPress} = this.props;
    const btnColor = color ? color : '#185AB7';
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.btn, {backgroundColor: btnColor}]}>
        <Text style={styles.btnLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  btnLabel: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

PrimaryButton.propTypes = propTypes;

export default PrimaryButton;
