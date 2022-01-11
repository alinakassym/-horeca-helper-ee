import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {PrimaryColors} from '../../styles/colors';
import {IconClose} from '../../assets/icons/main/IconClose';
import {IconCheck} from '../../assets/icons/main/IconCheck';
import Header from '../Header';
import GradientButton from '../buttons/GradientButton';
import RadioBtn from '../buttons/RadioBtn';

const propTypes = {
  label: PropTypes.string,
  modalTitle: PropTypes.string,
  value: PropTypes.object,
  itemText: PropTypes.string,
  items: PropTypes.array,
  onSaveSelection: PropTypes.func,
  onClear: PropTypes.func,
  validIcon: PropTypes.object,
};

const dimensions = Dimensions.get('screen');

class ModalSelect extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      modal: false,
      activeItem: null,
    };
  }
  render() {
    const {
      label,
      modalTitle,
      value,
      itemText,
      items,
      onSaveSelection,
      onClear,
      validIcon,
    } = this.props;
    const {modal, activeItem} = this.state;

    const ValueSection = () => {
      return (
        <View style={styles.block}>
          <Text style={styles.label}>{label}</Text>
          <Pressable
            onPress={() => {
              this.setState({...this.state, modal: true, activeItem: value});
            }}>
            <Text style={styles.valueText}>{value[itemText]}</Text>
          </Pressable>
          <Pressable onPress={onClear} style={styles.clearBtn}>
            <IconClose
              style={styles.icon}
              size={16}
              color={PrimaryColors.grey1}
            />
            {validIcon || (
              <IconCheck size={16} color={PrimaryColors.brand} width={2} />
            )}
          </Pressable>
        </View>
      );
    };

    const PlaceHolder = () => {
      return (
        <View style={styles.blockPlaceholder}>
          <Pressable
            onPress={() => {
              this.setState({...this.state, modal: true});
            }}>
            <Text style={styles.placeholderText}>{label}</Text>
          </Pressable>
        </View>
      );
    };

    return (
      <React.Fragment>
        {value ? <ValueSection /> : <PlaceHolder />}
        <Modal visible={modal} animationType="fade" transparent={true}>
          <Pressable
            style={styles.overlay}
            onPress={() => {
              this.setState({...this.state, modal: false});
            }}>
            <View style={styles.wrap}>
              <Header
                onClose={() => this.setState({...this.state, modal: false})}
                modal
                title={!!modalTitle ? modalTitle : null}
              />
              <View style={styles.itemsBlock}>
                {items.map((listItem, index) => (
                  <RadioBtn
                    key={index}
                    itemKey={itemText}
                    activeItem={activeItem}
                    item={listItem}
                    onSelect={() =>
                      this.setState({...this.state, activeItem: listItem})
                    }
                  />
                ))}
                <GradientButton
                  onPress={() => {
                    onSaveSelection(activeItem);
                    this.setState({...this.state, modal: false});
                  }}
                  label={'Сохранить'}
                />
              </View>
            </View>
          </Pressable>
        </Modal>
      </React.Fragment>
    );
  }
}

const width = dimensions.width;

const styles = StyleSheet.create({
  overlay: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrap: {
    position: 'absolute',
    bottom: 0,
    width: width,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  itemsBlock: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
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
    right: 4,
    bottom: 10,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 4,
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

ModalSelect.propTypes = propTypes;
export default ModalSelect;
