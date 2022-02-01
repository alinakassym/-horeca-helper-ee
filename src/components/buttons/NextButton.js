import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {IconExpandRight} from '../../assets/icons/main/IconExpandRight';
import {PrimaryColors} from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
};

class NextButton extends React.PureComponent {
  render() {
    const {onPress, style} = this.props;
    const colors = ['#38B6EC', '#31A0E8', '#2A8BE4'];
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <LinearGradient
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.btn, style]}>
          <IconExpandRight size={24} width={2} color={PrimaryColors.white} />
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingLeft: 2,
    height: 46,
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
    backgroundColor: '#E2E5E8',
  },
});

NextButton.propTypes = propTypes;

export default NextButton;
