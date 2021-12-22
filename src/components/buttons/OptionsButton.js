import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {IconOptions} from '../../assets/icons/main/IconOptions';

const propTypes = {
  onPress: PropTypes.func,
};

class OptionsButton extends React.PureComponent {
  render() {
    const {onPress} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.btn}>
        <IconOptions color={'#151F47'} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#E2E5E8',
    borderWidth: 0.7,
  },
});

OptionsButton.propTypes = propTypes;

export default OptionsButton;
