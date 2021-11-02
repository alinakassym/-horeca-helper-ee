import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
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
    borderColor: '#CCCCCC',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  text: {
    color: '#000000',
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
    borderColor: '#CCCCCC',
  },

  // --- start of Filters TopBar --- //
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F6F6F6',
  },
  filterBtn: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterApplied: {
    position: 'absolute',
    top: 1,
    left: 22,
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#E74C3C',
  },
  filterBtnRightText: {
    marginLeft: 6,
    fontSize: 14,
  },
  filterBtnLeftText: {
    marginRight: 4,
    fontSize: 14,
  },
  // --- end of Filters TopBar --- //
});
