import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  primaryInput: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC'
  },
  select: {
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC'
  }
});
