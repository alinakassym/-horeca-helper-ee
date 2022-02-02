import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {typography} from '../../styles/typography';
import {PrimaryColors} from '../../styles/colors';
import {IconCheck} from '../../assets/icons/main/IconCheck';
import _ from 'lodash';
import {IconBuilding} from '../../assets/icons/main/IconBuilding';
import {IconCalendar} from '../../assets/icons/main/IconCalendar';
import moment from 'moment';

const propTypes = {
  locale: PropTypes.string,
  description: PropTypes.bool,
  items: PropTypes.array,
  itemKey: PropTypes.string,
  activeItems: PropTypes.array,
  onSelect: PropTypes.func,
};

class MultiSelect extends React.PureComponent {
  render() {
    const {locale, description, items, itemKey, activeItems, onSelect} =
      this.props;
    const includes = val =>
      _.includes(
        activeItems.map(el => el.id),
        val.id,
      );

    moment.locale(locale);
    const formattedDate = date => {
      const fd = moment(date).format('MMMM YYYY');
      return fd.slice(0, 1).toUpperCase() + fd.substr(1, fd.length - 1);
    };

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
            <View>
              <Text style={[typography.text2, typography.textColorElement]}>
                {item[itemKey]}
              </Text>
              {description && (
                <>
                  <View style={[styles.row, globalStyles.mt3]}>
                    <IconBuilding
                      width={2.5}
                      size={16}
                      color={PrimaryColors.grey1}
                    />
                    <Text style={styles.title}>{item?.company?.title}</Text>
                  </View>
                  <View style={[styles.row, globalStyles.mt2]}>
                    <IconCalendar
                      width={1.5}
                      size={16}
                      color={PrimaryColors.grey1}
                    />
                    <Text style={styles.title}>
                      {formattedDate(item?.startDate)}
                      {' - '}
                      {formattedDate(item?.endDate)}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const dimensions = Dimensions.get('screen');
const width = dimensions.width;

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
  row: {
    width: width - 40,
    flexDirection: 'row',
  },
  title: {
    marginLeft: 6,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 16,
    color: PrimaryColors.grey1,
  },
});

MultiSelect.propTypes = propTypes;
export default MultiSelect;
