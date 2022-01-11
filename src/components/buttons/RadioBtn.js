import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  item: PropTypes.object,
  itemKey: PropTypes.string,
  activeItem: PropTypes.object,
  onSelect: PropTypes.func,
  style: PropTypes.object,
};

class RadioBtn extends React.PureComponent {
  render() {
    const {item, itemKey, activeItem, onSelect, style} = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.item, style]}
        onPress={onSelect}>
        {activeItem && activeItem?.id === item?.id ? (
          <View style={styles.radioBtnActive} />
        ) : (
          <View style={styles.radioBtn} />
        )}
        <Text style={styles.itemText}>{item[itemKey]}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBtn: {
    marginRight: 8,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: PrimaryColors.grey2,
    borderWidth: 1,
  },
  radioBtnActive: {
    marginRight: 8,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderColor: PrimaryColors.brand,
    borderWidth: 6,
  },
  itemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
});

RadioBtn.propTypes = propTypes;
export default RadioBtn;
