import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

class LightGradientButton extends React.PureComponent {
  render() {
    const {label, onPress} = this.props;

    const colors = [
      'rgba(56,182,236,0.15)',
      'rgba(49,160,232,0.15)',
      'rgba(42,139,228,0.15)',
    ];
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <LinearGradient
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.btn]}>
          <Text style={styles.btnLabel}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    minHeight: 48,
    borderRadius: 8,
  },
  btnLabel: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 16,
    color: PrimaryColors.brand,
  },
});

LightGradientButton.propTypes = propTypes;

export default LightGradientButton;
