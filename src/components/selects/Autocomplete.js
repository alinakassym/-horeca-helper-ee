import React, {useEffect, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Modal,
  VirtualizedList,
  StyleSheet,
  TextInput,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {IconClose} from '../../assets/icons/main/IconClose';
import _ from 'lodash';

export const Autocomplete = ({
  required,
  label,
  value,
  valueKey,
  items,
  itemTitle,
  placeholder,
}) => {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(value[valueKey]);
  const [filteredList, setFilteredList] = useState([]);

  const placeholderText = placeholder ? placeholder : 'Select';

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
      <View style={styles.valueSection}>
        <Pressable
          onPress={() => {
            setVisible(true);
          }}>
          <Text style={globalStyles.select}>{item[itemTitle]}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            clearValue();
          }}
          style={styles.clearBtn}>
          <IconClose color={'#898989'} />
        </Pressable>
      </View>
    );
  };

  const PlaceHolder = () => {
    return (
      <Pressable
        onPress={() => {
          setVisible(true);
        }}>
        {required ? (
          <Text style={[globalStyles.select, {color: '#E74C3C'}]}>
            {placeholderText}
          </Text>
        ) : (
          <Text style={globalStyles.select}>{placeholderText}</Text>
        )}
      </Pressable>
    );
  };

  const getItemCount = () => {
    return filteredList.length;
  };

  const getItem = (filteredList, index) => ({
    id: index,
    title: filteredList[index].title,
  });

  const getFilteredList = searchText => {
    if (searchText && searchText.length >= 1) {
      setFilteredList(
        _.filter(items, el => {
          return _.startsWith(el.title, searchText);
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
      <View>
        <Text style={globalStyles.label}>{label}</Text>
        {value[valueKey] ? <ValueSection /> : <PlaceHolder />}
      </View>
      <Modal visible={visible} animationType="slide" transparent={false}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.topBarIcon}
            onPress={() => {
              setFilteredList(items);
              setVisible(false);
            }}>
            <IconClose />
          </Pressable>
          <View style={styles.topBarTitleSection}>
            <Text style={styles.topBarTitle}>{label}</Text>
          </View>
        </View>
        <View style={styles.searchSection}>
          <TextInput
            onChangeText={val => {
              getFilteredList(val);
            }}
            style={globalStyles.primaryInput}
          />
        </View>
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
  topBar: {
    padding: 16,
    marginHorizontal: -4,
    width: '102%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
  },
  topBarIcon: {
    marginRight: 16,
  },
  topBarTitleSection: {
    paddingRight: 32,
    flex: 1,
    alignItems: 'center',
  },
  topBarTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#000000',
  },
  searchSection: {
    paddingHorizontal: 16,
  },
  wrap: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  item: {
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  itemTitle: {
    color: '#000000',
  },
  valueSection: {
    position: 'relative',
  },
  clearBtn: {
    position: 'absolute',
    right: 11,
    top: 12.5,
  },
});
