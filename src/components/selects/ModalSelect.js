import React, {useState} from 'react';
import {
  Pressable,
  TouchableOpacity,
  Text,
  View,
  Modal,
  StyleSheet,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {IconClose} from '../../assets/icons/main/IconClose';

export const ModalSelect = ({
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

  const placeholderText = placeholder ? placeholder : 'Select';

  const saveHandler = selectedItem => {
    setItem(selectedItem);
    value[valueKey] = selectedItem;
    setVisible(false);
  };

  const clearValue = () => {
    setItem(null);
    value[valueKey] = null;
    setVisible(false);
  };

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

  return (
    <React.Fragment>
      <View>
        <Text style={globalStyles.label}>{label}</Text>
        {value[valueKey] ? <ValueSection /> : <PlaceHolder />}
      </View>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.wrap}>
            {items.map((listItem, index) => (
              <TouchableOpacity
                style={styles.item}
                key={index}
                onPress={() => {
                  saveHandler(listItem);
                }}>
                <Text style={globalStyles.text}>{listItem[itemTitle]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrap: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  item: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
