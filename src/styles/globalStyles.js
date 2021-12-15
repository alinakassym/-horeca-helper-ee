import {Dimensions, StyleSheet} from 'react-native';
import {PrimaryColors} from './colors';

const dimensions = Dimensions.get('screen');

export const globalStyles = StyleSheet.create({
  fullScreenSection: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {
    flex: 1,
    backgroundColor: PrimaryColors.background,
  },
  card: {
    marginTop: 8,
    padding: 20,
    width: dimensions.width,
    backgroundColor: PrimaryColors.white,
  },
  inputLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: PrimaryColors.grey2,
  },
  placeholderText: {
    marginBottom: -25,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.grey2,
  },
});
