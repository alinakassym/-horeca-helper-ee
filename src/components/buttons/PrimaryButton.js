import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PrimaryColors} from '../../styles/colors';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
  labelColor: PropTypes.string,
  style: PropTypes.object,
  labelStyle: PropTypes.object,
};

class PrimaryButton extends React.PureComponent {
  render() {
    const {label, color, labelColor, onPress, style, labelStyle, children} =
      this.props;
    const btnColor = color || PrimaryColors.brand;
    const btnLabelColor = labelColor || PrimaryColors.white;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.btn, {backgroundColor: btnColor}, style]}>
        {children && <View style={styles.icon}>{children}</View>}
        <Text style={[styles.btnLabel, labelStyle, {color: btnLabelColor}]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  btnLabel: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
  },
  icon: {
    marginRight: 6,
  },
});

PrimaryButton.propTypes = propTypes;

export default PrimaryButton;
