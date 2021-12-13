import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {IconSearch} from '../../../assets/icons/tabs/IconSearch';
import {IconClose} from '../../../assets/icons/main/IconClose';
import {PrimaryColors} from '../../../styles/colors';
import Header from '../../../components/Header';

export const MessageSearch = ({text, onChangeText, onEndEditing, onClear}) => {
  return (
    <View style={styles.search}>
      <Header title={'Чат'} subtitle={'с соискателями'} />
      <View style={styles.inputSection}>
        <TextInput
          value={text}
          style={styles.input}
          placeholder={'Поиск'}
          placeholderTextColor={PrimaryColors.grey2}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
        />
        <View style={styles.iconSearch}>
          <IconSearch size={24} color={PrimaryColors.grey2} />
        </View>

        {text.length > 0 && (
          <TouchableOpacity
            onPress={onClear}
            activeOpacity={0.7}
            style={styles.iconClear}>
            <IconClose size={15} color={PrimaryColors.grey1} width={2} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: PrimaryColors.white,
  },
  inputSection: {
    position: 'relative',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 0,
    paddingLeft: 48,
    paddingRight: 38,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: PrimaryColors.grey4,
    color: PrimaryColors.element,
  },
  iconSearch: {
    position: 'absolute',
    top: 12,
    left: 32,
  },
  iconClear: {
    position: 'absolute',
    top: 15,
    right: 33,
    padding: 2,
  },
});
