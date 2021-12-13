import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import BackButton from './buttons/BackButton';
import PropTypes from 'prop-types';

const dimensions = Dimensions.get('screen');

const propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.array,
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
            <View style={styles.rightCol}>{children}</View>
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
    backgroundColor: '#FFFFFF',
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
