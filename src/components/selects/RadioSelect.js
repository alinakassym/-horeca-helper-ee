import React from 'react';
import PropTypes from 'prop-types';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  items: PropTypes.array,
  itemKey: PropTypes.string,
  selectedItem: PropTypes.object,
  onSelect: PropTypes.func,
  style: PropTypes.object,
};

class RadioSelect extends React.PureComponent {
  render() {
    const {items, itemKey, selectedItem, onSelect, style} = this.props;
    const Item = value => {
      if (selectedItem && value.value[itemKey] === selectedItem[itemKey]) {
        return (
          <Pressable
            style={[styles.btn, styles.active]}
            onPress={() => onSelect(value.value)}>
            <Text style={[styles.btnText, styles.activeBtnText]}>
              {value.value[itemKey]}
            </Text>
          </Pressable>
        );
      }
      return (
        <Pressable style={styles.btn} onPress={() => onSelect(value.value)}>
          <Text style={styles.btnText}>{value.value[itemKey]}</Text>
        </Pressable>
      );
    };

    return (
      <View style={[styles.wrapper, style]}>
        {items.map((item, index) => (
          <Item value={item} key={index} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },
  btn: {
    marginRight: 8,
    marginBottom: 8,
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: PrimaryColors.grey4,
  },
  active: {
    backgroundColor: PrimaryColors.element,
  },
  btnText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  activeBtnText: {
    color: PrimaryColors.white,
  },
});

RadioSelect.propTypes = propTypes;
export default RadioSelect;
