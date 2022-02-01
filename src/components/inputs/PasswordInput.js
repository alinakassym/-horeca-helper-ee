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
import {IconEye} from '../../assets/icons/main/IconEye';
import {IconEyeClosed} from '../../assets/icons/main/IconEyeClosed';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  keyboardType: PropTypes.string,
};

class PasswordInput extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      focused: false,
      showPassword: false,
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
      keyboardType,
    } = this.props;
    const {focused, showPassword} = this.state;
    const inputType = keyboardType ? keyboardType : 'default';

    return (
      <View style={styles.inputSection}>
        <Text style={styles.label}>
          {((!!label && focused) || (!!label && !!value)) && `${label}`}
        </Text>
        <TextInput
          secureTextEntry={!showPassword}
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
            onPress={() =>
              this.setState({...this.state, showPassword: !showPassword})
            }
            activeOpacity={0.7}
            style={styles.iconViewPassword}>
            {showPassword ? <IconEye /> : <IconEyeClosed />}
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
  iconViewPassword: {
    position: 'absolute',
    top: 24,
    right: 4,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

PasswordInput.propTypes = propTypes;
export default PasswordInput;
