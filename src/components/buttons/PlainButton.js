import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
};

class PlainButton extends React.PureComponent {
  render() {
    const {label, color, onPress, style, labelStyle} = this.props;
    const children = this.props.children;
    const btnColor = color ? color : PrimaryColors.brand;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.btn, style]}>
        {children}
        <Text style={[styles.btnLabel, labelStyle, {color: btnColor}]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
});

PlainButton.propTypes = propTypes;

export default PlainButton;
