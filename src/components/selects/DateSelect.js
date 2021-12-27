import React, {useState} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import moment from 'moment';

// styles
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconClose} from '../../assets/icons/main/IconClose';

// components
import DatePicker from 'react-native-date-picker';

export const DateSelect = ({label, value, valueKey, minimumDate}) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(value[valueKey]);

  const saveHandler = val => {
    setOpen(false);
    setItem(val);
    value[valueKey] = val;
  };

  const clearValue = () => {
    setItem(null);
    value[valueKey] = null;
    setOpen(false);
  };

  const ValueSection = () => {
    return (
      <View style={styles.block}>
        <Text style={styles.label}>{label}</Text>
        <Pressable
          onPress={() => {
            setOpen(true);
          }}>
          <Text style={styles.valueText}>
            {moment(item).format('MM-DD-YYYY')}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            clearValue();
          }}
          style={styles.clearBtn}>
          <IconClose size={20} color={PrimaryColors.grey1} />
        </Pressable>
      </View>
    );
  };

  const PlaceHolder = () => {
    return (
      <View style={styles.blockPlaceholder}>
        <Pressable
          onPress={() => {
            setOpen(true);
          }}>
          <Text style={styles.placeholderText}>{label}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <React.Fragment>
      {item ? <ValueSection /> : <PlaceHolder />}
      <DatePicker
        modal
        mode={'date'}
        open={open}
        minimumDate={minimumDate}
        date={new Date(item)}
        onConfirm={date => {
          saveHandler(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
});
