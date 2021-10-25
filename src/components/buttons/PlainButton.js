import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

class PlainButton extends React.PureComponent {
  render() {
    const {label, color, onPress} = this.props;
    const children = this.props.children;
    const btnColor = color ? color : '#185AB7';
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.btn}>
        {children}
        <Text style={[styles.btnLabel, {color: btnColor}]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    fontSize: 16,
    color: '#FFFFFF',
  },
});

PlainButton.propTypes = propTypes;

export default PlainButton;
