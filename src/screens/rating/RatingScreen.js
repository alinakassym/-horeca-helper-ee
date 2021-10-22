import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {IconFilter} from '../../assets/icons/main/IconFilter';
import {IconArrowDown} from '../../assets/icons/main/IconArrowDown';
import {RatingRowItem} from './RatingRowItem';

const items = [
  {
    name: 'John Doe',
    location: 'Astana KZ, MÖKKI',
    position: 'Waiter',
    item: 'Top 10',
  },
  {
    name: 'John Doe',
    location: 'Astana KZ, MÖKKI',
    position: 'Waiter',
    item: 'Top 10',
  },
  {
    name: 'John Doe',
    location: 'Astana KZ, MÖKKI',
    position: 'Waiter',
    item: 'Top 10',
  },
];

export const RatingScreen = () => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.filterBtn}>
          <IconFilter color={'#185AB7'} size={32} width={1.5} />
          <Text style={styles.filterBtnRightText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterBtnLeftText}>Order by rating</Text>
          <IconArrowDown color={'#767676'} size={24} width={1.5} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {items.map((item, index) => (
          <RatingRowItem
            key={index}
            name={item.name}
            location={item.location}
            position={item.position}
            item={item.item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F6F6F6',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtnRightText: {
    marginLeft: 6,
    fontSize: 14,
  },
  filterBtnLeftText: {
    marginRight: 4,
    fontSize: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  imageWrapper: {
    marginRight: 16,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#767676',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
  },
});
