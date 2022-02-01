import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  autoFocus: PropTypes.bool,
  value: PropTypes.any,
  onRef: PropTypes.func,
  refName: PropTypes.string,
  onKeyPress: PropTypes.func,
  onChangeText: PropTypes.func,
};

const CodeNumberInput = React.forwardRef((props, ref) => {
  const {autoFocus, value, onChangeText, onKeyPress} = props;
  const [focused, setFocused] = useState(false);

  const getInputWrapperStyles = val => {
    return {
      borderColor: focused
        ? PrimaryColors.element
        : val
        ? PrimaryColors.brand
        : PrimaryColors.grey3,
    };
  };

  const focusHandler = focus => {
    setFocused(focus);
  };

  return (
    <View style={[styles.inputSection, getInputWrapperStyles(value)]}>
      {!focused && !value && <View style={styles.dash} />}
      {value && <Text style={styles.number}>{value}</Text>}
      <TextInput
        ref={ref}
        autoFocus={autoFocus}
        caretHidden={true}
        style={styles.input}
        keyboardType={'number-pad'}
        textAlign={'center'}
        textAlignVertical={'center'}
        blurOnSubmit={false}
        onFocus={() => focusHandler(true)}
        onBlur={() => focusHandler(false)}
        value={value}
        onChangeText={val => onChangeText(val)}
        onKeyPress={onKeyPress}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputSection: {
    position: 'relative',
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 12,
    height: 64,
    width: 64,
  },
  dash: {
    position: 'absolute',
    bottom: 18,
    width: 16,
    borderBottomWidth: 2,
    borderColor: PrimaryColors.grey3,
  },
  number: {
    fontFamily: 'Inter-Regular',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    lineHeight: 32,
    color: PrimaryColors.brand,
    // backgroundColor: 'red',
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingVertical: 18,
    paddingHorizontal: 24,
    margin: 0,
    height: 64,
    width: 64,
    fontSize: 24,
    lineHeight: 24,
    color: 'transparent',
    // backgroundColor: 'red',
  },
});

CodeNumberInput.propTypes = propTypes;
export default CodeNumberInput;
