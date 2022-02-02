import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';

const propTypes = {
  step: PropTypes.number,
};

class StepProgress extends React.PureComponent {
  render() {
    const {step} = this.props;
    const steps = [1, 2, 3, 4];

    const getStepColor = item => {
      if (item <= step) {
        return {
          backgroundColor:
            step > 3
              ? StatusesColors.green
              : step > 2
              ? StatusesColors.orange
              : StatusesColors.yellow,
        };
      }
    };

    return (
      <View style={styles.wrapper}>
        {steps.map((item, index) => (
          <View key={index} style={[styles.step, getStepColor(item)]} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: 10,
    width: 248,
    paddingHorizontal: 4,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  step: {
    marginLeft: -4,
    marginRight: 12,
    height: 10,
    width: 56,
    backgroundColor: PrimaryColors.grey3,
  },
});

StepProgress.propTypes = propTypes;
export default StepProgress;
