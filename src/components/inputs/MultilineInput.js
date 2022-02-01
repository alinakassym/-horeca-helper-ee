import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  marginBottom: PropTypes.number,
  onChangeText: PropTypes.func,
  onInputFocus: PropTypes.func,
  style: PropTypes.object,
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
    const {label, value, marginBottom, onChangeText, onInputFocus, style} =
      this.props;
    const {height, focused} = this.state;
    const inputMaxHeight = 120;
    const setHeight = val => {
      const res = val > inputMaxHeight ? inputMaxHeight : val;
      this.setState({...this.state, height: res});
    };
    return (
      <View
        style={[
          styles.inputSection,
          {marginBottom: marginBottom || 20},
          style,
        ]}>
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
            setHeight(event.nativeEvent.contentSize.height - 10);
          }}
          onFocus={() => {
            this.setState({...this.state, focused: true});
            onInputFocus(true);
          }}
          onBlur={() => {
            this.setState({...this.state, focused: false});
            onInputFocus(false);
          }}
          onChangeText={val => onChangeText(val)}
          style={[
            globalStyles.inputText,
            styles.borderBottom,
            {
              height: Math.max(40, height),
              borderBottomColor: focused
                ? PrimaryColors.brand
                : !focused && !!value
                ? PrimaryColors.element
                : PrimaryColors.grey3,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputSection: {
    minHeight: 40,
  },
  borderBottom: {
    borderBottomWidth: 1.5,
  },
});

MultilineInput.propTypes = propTypes;
export default MultilineInput;
