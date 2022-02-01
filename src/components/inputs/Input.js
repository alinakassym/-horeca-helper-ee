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
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

class Input extends React.PureComponent {
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
      onEndEditing,
      onChangeText,
      onFocus,
      onBlur,
      onClear,
      validIcon,
      keyboardType,
      secureTextEntry,
    } = this.props;
    const {focused} = this.state;
    const inputType = keyboardType ? keyboardType : 'default';

    return (
      <View style={styles.inputSection}>
        <Text style={styles.label}>
          {((!!label && focused) || (!!label && !!value)) && `${label}`}
        </Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          keyboardType={inputType}
          value={value}
          style={[
            styles.input,
            {
              borderBottomColor:
                focused || !!value
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
          onEndEditing={e => {
            !!onEndEditing && onEndEditing(e);
            this.setState({...this.state, focused: false});
          }}
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
    color: PrimaryColors.grey1,
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
    top: 24,
    right: 4,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
});

Input.propTypes = propTypes;
export default Input;
