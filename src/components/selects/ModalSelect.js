import React, { useState } from 'react';
import { Pressable, TouchableOpacity, Text, View, TextInput, Button, Modal, Alert, StyleSheet } from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
export const ModalSelect = ({ label, value, valueKey, items, itemTitle, onChange, onCancel, placeholder }) => {
  const [selected, setSelected] = useState(value[valueKey]);
  const [visible, setVisible] = useState(false);

  const placeholderText = placeholder ? placeholder : 'Select'

  const saveHandler = (selectedItem) => {
    value[valueKey] = selectedItem;
    setVisible(false);
  }

  return (
    <React.Fragment>
      <Pressable onPress={() => {setVisible(true)}}>
        <Text style={globalStyles.label}>{label}</Text>
        {value[valueKey]
          ? <Text style={globalStyles.select}>{value[valueKey][itemTitle]}</Text>
          : <Text style={globalStyles.select}>{placeholderText}</Text>}

      </Pressable>
      <Modal visible={visible} animationType='slide' transparent={true}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.wrap}>
            {items.map((item, index) => (
              <TouchableOpacity style={styles.item} key={index} onPress={() => {saveHandler(item)}}>
                <Text>{item[itemTitle]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  wrap: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  item: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
