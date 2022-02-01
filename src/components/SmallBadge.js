import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {PrimaryColors} from '../styles/colors';

const propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.object,
};

class SmallBadge extends React.PureComponent {
  render() {
    const {text, color, style} = this.props;
    const bgColor = {
      backgroundColor: color,
    };
    return <Text style={[styles.smallBadge, bgColor, style]}>{text}</Text>;
  }
}

const styles = StyleSheet.create({
  smallBadge: {
    paddingVertical: 2,
    paddingHorizontal: 11,
    height: 22,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    color: PrimaryColors.white,
  },
});

SmallBadge.propTypes = propTypes;
export default SmallBadge;
