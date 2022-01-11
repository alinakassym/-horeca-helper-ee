import React from 'react';
import PropTypes from 'prop-types';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  label: PropTypes.string,
  selectedItem: PropTypes.object,
  items: PropTypes.array,
  itemKey: PropTypes.string,
  onSelect: PropTypes.func,
};

class GroupButton extends React.PureComponent {
  render() {
    const {label, selectedItem, items, itemKey, onSelect} = this.props;

    const Item = ({item, index}) => {
      if (selectedItem[itemKey] === item[itemKey]) {
        const border = index + 1 < items.length && styles.border;
        return (
          <Pressable style={[styles.btn, styles.active, border]}>
            <Text style={[styles.btnText, styles.activeBtnText]}>
              {item[itemKey]}
            </Text>
          </Pressable>
        );
      }
      return (
        <Pressable onPress={() => onSelect(item)} style={styles.btn}>
          <Text style={styles.btnText}>{item[itemKey]}</Text>
        </Pressable>
      );
    };

    return (
      <>
        {!!label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.wrapper}>
          {items.map((item, index) => (
            <Item item={item} key={index} index={index} />
          ))}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: PrimaryColors.element,
    overflow: 'hidden',
  },
  label: {
    marginBottom: 12,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  btn: {
    padding: 6,
    flex: 1,
    alignItems: 'center',
  },
  active: {
    backgroundColor: PrimaryColors.element,
  },
  border: {
    borderRightColor: PrimaryColors.element,
    borderRightWidth: 1,
  },
  btnText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 16,
    color: PrimaryColors.element,
  },
  activeBtnText: {
    color: PrimaryColors.white,
  },
});

GroupButton.propTypes = propTypes;
export default GroupButton;
