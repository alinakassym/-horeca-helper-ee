import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import PropTypes from 'prop-types';
import {PrimaryColors} from '../styles/colors';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

class MultilineInput extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      height: 35,
      focused: false,
    };
  }

  render() {
    const {label, value, onChangeText} = this.props;
    const {height, focused} = this.state;
    const inputMaxHeight = 120;
    const setHeight = val => {
      const res = val > inputMaxHeight ? inputMaxHeight : val;
      this.setState({...this.state, height: res});
    };
    return (
      <View style={[styles.inputSection]}>
        {((!!label && focused) || (!!label && !!value)) && (
          <Text style={globalStyles.inputLabel}>{label}</Text>
        )}
        {!!label && !focused && !value && (
          <Text style={globalStyles.placeholderText}>{label}</Text>
        )}
        <TextInput
          multiline={true}
          value={value}
          onContentSizeChange={event => {
            setHeight(event.nativeEvent.contentSize.height);
          }}
          onFocus={() => this.setState({...this.state, focused: true})}
          onBlur={() => this.setState({...this.state, focused: false})}
          onChangeText={val => onChangeText(val)}
          style={[
            styles.input,
            {
              height: Math.max(32, height),
              borderBottomColor: focused
                ? PrimaryColors.brand
                : !focused && !!value
                ? PrimaryColors.element
                : PrimaryColors.grey2,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
    minHeight: 32,
  },
  input: {
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
    borderBottomWidth: 1.5,
  },
});

MultilineInput.propTypes = propTypes;
export default MultilineInput;
