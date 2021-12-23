import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import BackButton from './buttons/BackButton';
import PropTypes from 'prop-types';
import {PrimaryColors} from '../styles/colors';

const dimensions = Dimensions.get('screen');

const propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.object,
  goBack: PropTypes.bool,
  options: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

class Header extends React.PureComponent {
  render() {
    const {navigation, children, goBack, options, title, subtitle} = this.props;
    return (
      <React.Fragment>
        {goBack ? (
          <View style={styles.headerSection}>
            <View style={styles.leftCol}>
              <BackButton onPress={() => navigation.goBack()} />
            </View>
            {title ? (
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
            ) : (
              <View style={styles.rightCol}>{children}</View>
            )}
          </View>
        ) : options ? (
          <View style={[styles.headerSection, styles.optionsHeaderSection]}>
            <Text style={[styles.optionsRightCol, styles.title]}>
              {title} <Text style={styles.subtitle}>{subtitle}</Text>
            </Text>
            <View style={styles.optionsLeftCol}>{children}</View>
          </View>
        ) : (
          <View style={styles.headerSection}>
            <Text style={[styles.title, styles.mt]}>
              {title} <Text style={styles.subtitle}>{subtitle}</Text>
            </Text>
          </View>
        )}
      </React.Fragment>
    );
  }
}

const headerSectionPadding = 20;
const leftColWidth = 40 + 8;
const rightColWidth =
  dimensions.width - leftColWidth - headerSectionPadding * 2;

const styles = StyleSheet.create({
  headerSection: {
    padding: headerSectionPadding,
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PrimaryColors.white,
  },
  optionsHeaderSection: {
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  header: {
    width: dimensions.width - headerSectionPadding * 2,
    marginLeft: -leftColWidth,
    paddingLeft: leftColWidth,
    paddingRight: leftColWidth - headerSectionPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsRightCol: {
    width: rightColWidth - 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsLeftCol: {
    width: leftColWidth + 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mt: {
    marginTop: 10,
  },
  title: {
    marginTop: 4,
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    lineHeight: 28,
    color: '#151F47',
  },
  subtitle: {
    fontFamily: 'Inter-Light',
  },
});

Header.propTypes = propTypes;

export default Header;
