import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryColors} from '../../styles/colors';
import {IconClose} from '../../assets/icons/main/IconClose';
import {IconCheck} from '../../assets/icons/main/IconCheck';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  validIcon: PropTypes.object,
  hideValidIcon: PropTypes.bool,
  style: PropTypes.object,
};

class NumberInput extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
  }
  render() {
    const {
      label,
      value,
      onChangeText,
      onFocus,
      onBlur,
      onClear,
      validIcon,
      style,
    } = this.props;
    const {focused} = this.state;
    return (
      <View style={[styles.inputSection, style]}>
        <Text
          style={[
            styles.label,
            {
              color: focused ? PrimaryColors.brand : PrimaryColors.grey1,
            },
          ]}>
          {((!!label && focused) || (!!label && !!value)) && `${label}`}
        </Text>
        <TextInput
          keyboardType={'number-pad'}
          value={value}
          style={[
            styles.input,
            {
              borderBottomColor: focused
                ? PrimaryColors.brand
                : value
                ? PrimaryColors.element
                : PrimaryColors.grey3,
            },
          ]}
          placeholder={focused ? '' : label}
          placeholderTextColor={PrimaryColors.grey2}
          onChangeText={onChangeText}
          onBlur={() => {
            if (onBlur) {
              onBlur(false);
            }
          }}
          onFocus={val => {
            if (onFocus) {
              onFocus(val);
            }
            this.setState({...this.state, focused: true});
          }}
          onEndEditing={() => this.setState({...this.state, focused: false})}
        />

        {!!value && value.length > 0 && (
          <TouchableOpacity
            onPress={onClear}
            activeOpacity={0.7}
            style={styles.iconClear}>
            <IconClose
              style={styles.icon}
              size={16}
              color={PrimaryColors.grey1}
              width={2}
            />
            {validIcon || (
              <IconCheck size={16} color={PrimaryColors.brand} width={2} />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputSection: {
    position: 'relative',
  },
  label: {
    marginBottom: 4,
    height: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 14,
  },
  input: {
    marginBottom: 20,
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
    borderBottomWidth: 1.5,
    borderBottomColor: PrimaryColors.grey3,
  },
  iconClear: {
    position: 'absolute',
    top: 22,
    right: 4,
    padding: 2,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 4,
  },
});

NumberInput.propTypes = propTypes;
export default NumberInput;
