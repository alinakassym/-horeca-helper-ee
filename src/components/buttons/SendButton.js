import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {IconSend} from '../../assets/icons/main/IconSend';

const propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
};

class SendButton extends React.PureComponent {
  render() {
    const {onPress} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={[styles.btn]}>
        <IconSend color={'#8391A1'} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingTop: 10,
    paddingRight: 2,
    height: 46,
    width: 46,
    alignItems: 'center',
    borderRadius: 36,
    backgroundColor: '#E2E5E8',
  },
});

SendButton.propTypes = propTypes;

export default SendButton;
