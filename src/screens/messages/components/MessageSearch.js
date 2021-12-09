import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {IconSearch} from '../../../assets/icons/tabs/IconSearch';
import {IconClose} from '../../../assets/icons/main/IconClose';

export const MessageSearch = ({text, onChangeText, onEndEditing, onBlur}) => {
  return (
    <View style={styles.search}>
      <Text style={styles.header}>
        <Text style={styles.textBold}>Чат </Text>с соискателями
      </Text>
      <View style={styles.inputSection}>
        <TextInput
          value={text}
          style={styles.input}
          placeholder={'Поиск'}
          placeholderTextColor={'#B9C1CA'}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
        />
        <View style={styles.iconSearch}>
          <IconSearch size={24} color={'#B9C1CA'} />
        </View>

        {text.length > 0 && (
          <TouchableOpacity activeOpacity={0.7} style={styles.iconClear}>
            <IconClose size={15} color={'#8391A1'} width={2} />
          </TouchableOpacity>
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
    paddingRight: 40,
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
    top: 15,
    right: 13,
    padding: 2,
  },
});
