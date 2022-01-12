import {StyleSheet} from 'react-native';
import {PrimaryColors} from './colors';

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 30,
    lineHeight: 36,
    color: PrimaryColors.element,
  },

  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
});
