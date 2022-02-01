import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import NextButton from './buttons/NextButton';
import {PrimaryColors} from '../styles/colors';
import {typography} from '../styles/typography';
import {Trans} from 'react-i18next';

const dimensions = Dimensions.get('screen');

const width = dimensions.width;
const progressBarWidth = width * 0.3;

const propTypes = {
  step: PropTypes.string,
  steps: PropTypes.string,
  progress: PropTypes.number,
  onPress: PropTypes.func,
};

class Steps extends React.PureComponent {
  render() {
    const {step, steps, progress, onPress} = this.props;
    const progressStyle = {
      width: progress
        ? progressBarWidth * (progress / 100)
        : progressBarWidth * 0.3,
    };

    return (
      <View style={styles.stepsBlock}>
        <Text style={[typography.text, typography.textColorElement]}>
          <Trans i18nKey="Step out of" values={{step: step, steps: steps}} />
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, progressStyle]} />
        </View>
        <NextButton onPress={onPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stepsBlock: {
    marginLeft: -2,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width + 4,
    borderRadius: 1,
    shadowColor: PrimaryColors.grey1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'visible',
  },
  progressBar: {
    position: 'relative',
    marginRight: 32,
    height: 5,
    width: progressBarWidth,
    borderRadius: 3,
    backgroundColor: PrimaryColors.grey3,
    overflow: 'hidden',
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 5,
    borderRadius: 3,
    backgroundColor: PrimaryColors.brand,
  },
});

Steps.propTypes = propTypes;
export default Steps;
