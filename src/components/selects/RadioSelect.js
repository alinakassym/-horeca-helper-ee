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
    const Item = ({item}) => {
      if (selectedItem && item[itemKey] === selectedItem[itemKey]) {
        return (
          <Pressable
            style={[styles.btn, styles.active]}
            onPress={() => onSelect(item)}>
            <Text style={[styles.btnText, styles.activeBtnText]}>
              {item[itemKey]}
            </Text>
          </Pressable>
        );
      }
      return (
        <Pressable style={styles.btn} onPress={() => onSelect(item)}>
          <Text style={styles.btnText}>{item[itemKey]}</Text>
        </Pressable>
      );
    };

    return (
      <View style={[styles.wrapper, style]}>
        {items.map((item, index) => (
          <Item item={item} key={index} />
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
