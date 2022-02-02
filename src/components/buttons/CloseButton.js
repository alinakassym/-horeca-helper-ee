import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {IconClose} from '../../assets/icons/main/IconClose';

const propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
};

class CloseButton extends React.PureComponent {
  render() {
    const {onPress, style} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.btn, style]}>
        <IconClose color={'#8391A1'} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E5E8',
    borderWidth: 1,
  },
});

CloseButton.propTypes = propTypes;

export default CloseButton;
