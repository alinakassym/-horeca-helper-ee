import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {IconSearch} from '../../../assets/icons/tabs/IconSearch';
import {IconClose} from '../../../assets/icons/main/IconClose';

export const MessageSearch = ({text, onChangeText, onEndEditing}) => {
  return (
    <View style={styles.search}>
      <Text style={styles.header}>
        <Text style={styles.textBold}>Chat </Text>
        with candidates
      </Text>
      <View style={styles.inputSection}>
        <TextInput
          value={text}
          style={styles.input}
          placeholder={'Search'}
          placeholderTextColor={'#B9C1CA'}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
        />
        <View style={styles.iconSearch}>
          <IconSearch size={24} color={'#B9C1CA'} />
        </View>

        {text.length > 0 && (
          <View style={styles.iconClear}>
            <IconClose size={12} color={'#8391A1'} width={2} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    lineHeight: 28,
    color: '#151F47',
  },
  textBold: {
    fontFamily: 'Inter-SemiBold',
  },
  inputSection: {
    position: 'relative',
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 0,
    paddingLeft: 48,
    paddingRight: 8,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: '#F0F2F4',
    color: '#151F47',
  },
  iconSearch: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  iconClear: {
    position: 'absolute',
    top: 16,
    right: 12,
    padding: 2,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#8391A1',
  },
});
