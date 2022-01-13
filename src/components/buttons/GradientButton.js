import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
  style: PropTypes.object,
};

class GradientButton extends React.PureComponent {
  render() {
    const {label, onPress, style} = this.props;

    const colors = ['#38B6EC', '#31A0E8', '#2A8BE4'];
    return (
      <TouchableOpacity style={style} activeOpacity={0.5} onPress={onPress}>
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
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  btnLabel: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: '#FFFFFF',
  },
});

GradientButton.propTypes = propTypes;

export default GradientButton;
