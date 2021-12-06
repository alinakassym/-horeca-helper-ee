import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import CloseButton from '../../../components/buttons/CloseButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const dimensions = Dimensions.get('screen');

export const BottomModal = ({
  visible,
  text,
  onChangeText,
  children,
  isValid,
  onClose,
  onSend,
}) => {
  const [textHeight, setTextHeight] = useState(35);

  const setHeight = val => {
    setTextHeight(val > 108 ? 108 : val);
  };

  return (
    <>
      <Modal visible={visible} animationType="fade" transparent={true}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <View style={styles.wrap}>
            <CloseButton onPress={onClose} />
            <Text style={styles.title}>Apply for Job</Text>
            {children}
            <View style={styles.inputSection}>
              <TextInput
                multiline={true}
                value={text}
                onContentSizeChange={event => {
                  setHeight(event.nativeEvent.contentSize.height);
                }}
                onChangeText={onChangeText}
                style={[styles.input, {height: Math.max(35, textHeight)}]}
              />
            </View>
            <View style={styles.btn}>
              <PrimaryButton
                color={(!isValid && '#E2E5E8') || null}
                label={'Send'}
                onPress={onSend}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrap: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 18,
    paddingBottom: 40,
    paddingHorizontal: 20,
    width: dimensions.width,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginTop: 12,
    marginBottom: 20,
    marginLeft: 4,
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    lineHeight: 32,
    color: '#151F47',
  },
  inputSection: {
    height: 108,
  },
  input: {
    maxHeight: 108,
    fontSize: 14,
    lineHeight: 18,
    color: '#151F47',
    borderBottomWidth: 1.5,
    borderBottomColor: '#2A8BE4',
  },
  btn: {
    marginTop: 40,
  },
});
