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
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

class Header extends React.PureComponent {
  render() {
    const {navigation, children, goBack, title, subtitle} = this.props;
    return (
      <View style={styles.headerSection}>
        {goBack ? (
          <>
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
          </>
        ) : (
          <Text style={styles.title}>
            {title} <Text style={styles.subtitle}>{subtitle}</Text>
          </Text>
        )}
      </View>
    );
  }
}

const headerSectionPadding = 20;
const leftColWidth = 40 + 16;
const rightColWidth =
  dimensions.width - leftColWidth - headerSectionPadding * 2;

const styles = StyleSheet.create({
  headerSection: {
    padding: 20,
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PrimaryColors.white,
  },
  headerTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  header: {
    width: dimensions.width - 40,
    marginLeft: -leftColWidth,
    paddingLeft: leftColWidth,
    paddingRight: leftColWidth - 20,
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
  title: {
    marginTop: 10,
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
