import React, {useState} from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {IconClose} from '../../assets/icons/main/IconClose';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export const DateSelect = ({
  required,
  label,
  value,
  valueKey,
  minimumDate,
  placeholder,
  clearable,
}) => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(value[valueKey]);

  const placeholderText = placeholder ? placeholder : 'Select';

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
      <View style={styles.valueSection}>
        <Pressable
          onPress={() => {
            setOpen(true);
          }}>
          <Text
            style={[
              globalStyles.select,
              {position: 'relative', width: 400, zIndex: 1},
            ]}>
            {moment(item).format('YYYY-MM-DD')}
          </Text>
        </Pressable>
        {clearable && (
          <Pressable
            onPress={() => {
              clearValue();
            }}
            style={[
              styles.clearBtn,
              {position: 'relative', top: -21, right: -100, zIndex: 2},
            ]}>
            <IconClose color={'#898989'} />
          </Pressable>
        )}
      </View>
    );
  };

  const PlaceHolder = () => {
    return (
      <Pressable
        onPress={() => {
          setOpen(true);
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

  return (
    <React.Fragment>
      <View>
        <Text style={globalStyles.label}>{label}</Text>
        {item ? <ValueSection /> : <PlaceHolder />}
      </View>
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
  valueSection: {
    position: 'relative',
  },
  clearBtn: {
    position: 'absolute',
    right: 11,
    top: 12.5,
  },
});
