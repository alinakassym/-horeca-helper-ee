import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Modal,
  VirtualizedList,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

// styles
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconClose} from '../../assets/icons/main/IconClose';

// components
import Header from '../Header';
import Input from '../Input';

export const Autocomplete = ({label, value, valueKey, items, itemTitle}) => {
  const [searchText, setSearchText] = useState('');
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(value[valueKey]);
  const [filteredList, setFilteredList] = useState([]);

  const saveHandler = selectedItem => {
    setItem(selectedItem);
    value[valueKey] = selectedItem;
    setFilteredList(items);
    setVisible(false);
  };

  const clearValue = () => {
    setItem(null);
    value[valueKey] = null;
    setVisible(false);
  };

  useEffect(() => {
    setFilteredList(items);
  }, [items]);

  const ValueSection = () => {
    return (
      <View style={styles.block}>
        <Text style={styles.label}>{label}</Text>
        <Pressable
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={styles.valueText}>{item[itemTitle]}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            clearValue();
          }}
          style={styles.clearBtn}>
          <IconClose size={20} color={'#898989'} />
        </Pressable>
      </View>
    );
  };

  const PlaceHolder = () => {
    return (
      <View style={styles.blockPlaceholder}>
        <Pressable
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={styles.placeholderText}>{label}</Text>
        </Pressable>
      </View>
    );
  };

  const getItemCount = () => {
    return filteredList.length;
  };

  const getItem = (filteredList, index) => ({
    id: filteredList[index].id,
    title: filteredList[index].title,
  });

  const getFilteredList = searchText => {
    if (searchText && searchText.length >= 1) {
      setFilteredList(
        _.filter(items, el => {
          return _.startsWith(el.title.toLowerCase(), searchText.toLowerCase());
        }),
      );
    } else {
      setFilteredList(items);
    }
  };

  const Item = ({item}) => (
    <Pressable
      onPress={() => {
        saveHandler(item);
      }}
      style={styles.item}>
      <Text style={styles.itemTitle}>{item[itemTitle]}</Text>
    </Pressable>
  );

  return (
    <React.Fragment>
      {value[valueKey] ? <ValueSection /> : <PlaceHolder />}
      <Modal visible={visible} animationType="slide" transparent={false}>
        <Header
          goBack
          onClose={() => {
            setFilteredList(items);
            setVisible(false);
          }}
          title={label}
        />
        <Input
          text={searchText}
          onChangeText={val => {
            setSearchText(val);
            getFilteredList(val);
          }}
        />
        <VirtualizedList
          data={filteredList}
          renderItem={({item, index}) => <Item index={index} item={item} />}
          getItemCount={getItemCount}
          getItem={getItem}
        />
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  block: {
    position: 'relative',
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: PrimaryColors.element,
  },
  label: {
    marginBottom: 6,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: PrimaryColors.grey1,
  },
  valueText: {
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  clearBtn: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  blockPlaceholder: {
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: PrimaryColors.grey3,
  },
  placeholderText: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.grey2,
  },
  item: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  itemTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
});
