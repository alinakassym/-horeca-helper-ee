import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import PropTypes from 'prop-types';
import {PrimaryColors} from '../styles/colors';
import CloseButton from './buttons/CloseButton';

const dimensions = Dimensions.get('screen');

const propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.object,
  goBack: PropTypes.bool,
  title: PropTypes.string,
};

class ModalHeader extends React.PureComponent {
  render() {
    const {navigation, children, title} = this.props;
    return (
      <>
        <View style={styles.headerSection}>
          <View style={styles.leftCol}>
            <CloseButton onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.rightCol}>{children}</View>
        </View>
        {!!title && <Text style={styles.headerTitle}>{title}</Text>}
      </>
    );
  }
}

const width = dimensions.width;
const headerSectionPadding = 20;
const leftColWidth = 32 + 16;
const rightColWidth = width - leftColWidth - headerSectionPadding * 2;

const styles = StyleSheet.create({
  headerSection: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 12,
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PrimaryColors.white,
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    width: width,
    fontFamily: 'Inter-Bold',
    fontSize: 26,
    lineHeight: 32,
    color: PrimaryColors.element,
    backgroundColor: PrimaryColors.white,
  },
});

ModalHeader.propTypes = propTypes;

export default ModalHeader;
