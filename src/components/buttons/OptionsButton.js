import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {StatusesColors} from '../../styles/colors';
import {IconOptions} from '../../assets/icons/main/IconOptions';
import {IconDot} from '../../assets/icons/main/IconDot';

const propTypes = {
  applied: PropTypes.bool,
  onPress: PropTypes.func,
};

class OptionsButton extends React.PureComponent {
  render() {
    const {applied, onPress} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.btn}>
        {applied && (
          <IconDot
            color={StatusesColors.red}
            style={styles.iconDot}
            size={10}
          />
        )}
        <IconOptions color={'#151F47'} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    position: 'relative',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#E2E5E8',
    borderWidth: 0.7,
  },
  iconDot: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
});

OptionsButton.propTypes = propTypes;

export default OptionsButton;
