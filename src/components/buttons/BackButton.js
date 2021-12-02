import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {IconLeft} from '../../assets/icons/main/IconLeft';

const propTypes = {
  onPress: PropTypes.func,
};

class BackButton extends React.PureComponent {
  render() {
    const {onPress} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.btn}>
        <IconLeft color={'#151F47'} size={28} width={2} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#E2E5E8',
    borderWidth: 0.7,
  },
});

BackButton.propTypes = propTypes;

export default BackButton;
