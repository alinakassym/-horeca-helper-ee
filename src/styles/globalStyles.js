import {Dimensions, StyleSheet} from 'react-native';
import {PrimaryColors} from './colors';

const dimensions = Dimensions.get('screen');

export const globalStyles = StyleSheet.create({
  fullScreenSection: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {
    position: 'relative',
    height: dimensions.height,
    flex: 1,
    backgroundColor: PrimaryColors.background,
  },
  rootStackContainer: {
    flex: 1,
    backgroundColor: PrimaryColors.white,
  },
  section: {
    paddingHorizontal: 20,
    width: dimensions.width,
    backgroundColor: PrimaryColors.white,
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
    color: PrimaryColors.grey1,
  },
  inputText: {
    paddingHorizontal: 0,
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  placeholderText: {
    marginBottom: -25,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.grey2,
  },

  // flex
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },

  // margins
  ml1: {
    marginLeft: 4,
  },
  ml2: {
    marginLeft: 6,
  },
  ml3: {
    marginLeft: 8,
  },
  ml4: {
    marginLeft: 16,
  },
  ml5: {
    marginLeft: 20,
  },
  ml6: {
    marginLeft: 24,
  },
  mr1: {
    marginRight: 4,
  },
  mr2: {
    marginRight: 6,
  },
  mr3: {
    marginRight: 8,
  },
  mr4: {
    marginRight: 16,
  },
  mr5: {
    marginRight: 20,
  },
  mr6: {
    marginRight: 24,
  },
  mb1: {
    marginBottom: 4,
  },
  mb2: {
    marginBottom: 6,
  },
  mb3: {
    marginBottom: 8,
  },
  mb4: {
    marginBottom: 16,
  },
  mb5: {
    marginBottom: 20,
  },
  mb6: {
    marginBottom: 24,
  },
  mt1: {
    marginTop: 4,
  },
  mt2: {
    marginTop: 6,
  },
  mt3: {
    marginTop: 8,
  },
  mt4: {
    marginTop: 16,
  },
  mt5: {
    marginTop: 20,
  },
  mt6: {
    marginTop: 24,
  },
});
