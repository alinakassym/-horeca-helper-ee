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
import GradientButton from '../../../components/buttons/GradientButton';
import {PrimaryColors} from '../../../styles/colors';
import {globalStyles} from '../../../styles/globalStyles';

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
            <Text style={styles.title}>Отклик на вакансию</Text>
            {children}
            <View style={styles.inputSection}>
              <Text style={[globalStyles.inputLabel, styles.inputLabel]}>
                Сопроводительное письмо
              </Text>
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
              {isValid ? (
                <GradientButton label={'Отправить'} onPress={onSend} />
              ) : (
                <PrimaryButton
                  color={PrimaryColors.grey3}
                  labelColor={PrimaryColors.grey1}
                  label={'Отправить'}
                />
              )}
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
  inputLabel: {
    color: PrimaryColors.brand,
  },
  btn: {
    marginTop: 40,
  },
});
