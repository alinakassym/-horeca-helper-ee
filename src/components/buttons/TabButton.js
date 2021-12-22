import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string,
  onPress: PropTypes.func,
};

class TabButton extends React.PureComponent {
  render() {
    const {isActive, label, onPress} = this.props;
    if (isActive) {
      return (
        <Pressable
          style={[styles.tabBtn, styles.tabBtnActive]}
          onPress={onPress}>
          <Text style={[styles.tabBtnTitle, styles.tabBtnActiveTitle]}>
            {label}
          </Text>
        </Pressable>
      );
    }
    return (
      <Pressable style={styles.tabBtn} onPress={onPress}>
        <Text style={styles.tabBtnTitle}>{label}</Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  tabBtn: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: PrimaryColors.brand,
  },
  tabBtnTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey2,
  },
  tabBtnActiveTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.brand,
  },
});

TabButton.propTypes = propTypes;
export default TabButton;
