import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PrimaryColors} from '../../styles/colors';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
};

class DisabledButton extends React.PureComponent {
  render() {
    const {label} = this.props;
    return (
      <View activeOpacity={0.5} style={styles.btn}>
        <Text style={styles.btnLabel}>{label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
    backgroundColor: PrimaryColors.grey3,
  },
  btnLabel: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
});

DisabledButton.propTypes = propTypes;

export default DisabledButton;
