import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {typography} from '../../styles/typography';
import {PrimaryColors} from '../../styles/colors';
import {IconCheck} from '../../assets/icons/main/IconCheck';
import _ from 'lodash';

const propTypes = {
  items: PropTypes.array,
  itemKey: PropTypes.string,
  activeItems: PropTypes.array,
  onSelect: PropTypes.func,
};

class MultiSelect extends React.PureComponent {
  render() {
    const {items, itemKey, activeItems, onSelect} = this.props;
    const includes = val =>
      _.includes(
        activeItems.map(el => el.id),
        val.id,
      );

    return (
      <View style={globalStyles.section}>
        {items.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onSelect && onSelect(item)}
            key={index}
            style={[
              globalStyles.row,
              globalStyles.alignCenter,
              globalStyles.mb5,
            ]}>
            {includes(item) ? (
              <View style={styles.activePoint}>
                <IconCheck color={PrimaryColors.white} size={12} />
              </View>
            ) : (
              <View style={styles.point} />
            )}
            <Text style={[typography.text2, typography.textColorElement]}>
              {item[itemKey]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  point: {
    marginRight: 8,
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: PrimaryColors.grey2,
  },
  activePoint: {
    marginRight: 8,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: PrimaryColors.brand,
  },
});

MultiSelect.propTypes = propTypes;
export default MultiSelect;
