import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal, Pressable, StyleSheet} from 'react-native';
import {PrimaryColors} from '../styles/colors';
import ModalButton from './buttons/ModalButton';
import Header from './Header';

const propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  onCancel: PropTypes.func,
};

class BottomModal extends React.PureComponent {
  render() {
    const {visible, title, onCancel, children} = this.props;
    const padding = !title && {
      padding: 8,
    };
    const blockStyle = !title && {
      paddingBottom: 0,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: PrimaryColors.grey5,
    };

    return (
      <Modal visible={visible} animationType="fade" transparent={true}>
        <Pressable onPress={onCancel} style={styles.overlay}>
          <View style={[styles.wrapper, padding]}>
            <Pressable style={[styles.section, blockStyle]}>
              {!!title && (
                <Header
                  style={styles.resetPaddings}
                  modal
                  onClose={onCancel}
                  title={title}
                />
              )}
              {children}
            </Pressable>
            {!title && (
              <Pressable onPress={onCancel} style={[styles.block, blockStyle]}>
                <ModalButton label={'Отмена'} onPress={onCancel} />
              </Pressable>
            )}
          </View>
        </Pressable>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  section: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  block: {
    marginTop: 4,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  resetPaddings: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

BottomModal.propTypes = propTypes;
export default BottomModal;
