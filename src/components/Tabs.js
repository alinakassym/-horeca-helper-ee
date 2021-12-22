import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, StyleSheet, View} from 'react-native';
import {PrimaryColors} from '../styles/colors';
import TabButton from '../components/buttons/TabButton';

const dimensions = Dimensions.get('screen');

const propTypes = {
  activeTab: PropTypes.string,
  tabs: PropTypes.array,
  onSelectTab: PropTypes.func,
};

class Tabs extends React.PureComponent {
  render() {
    const {tabs, activeTab, onSelectTab} = this.props;
    const {children} = this.props;
    return (
      <>
        <View style={styles.row}>
          {tabs.map((item, index) => (
            <TabButton
              onPress={() => onSelectTab(item.name)}
              key={index}
              isActive={item.name === activeTab}
              label={item.label}
            />
          ))}
        </View>
        {children}
      </>
    );
  }
}

const width = dimensions.width;

const styles = StyleSheet.create({
  row: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PrimaryColors.white,
  },
});

Tabs.propTypes = propTypes;
export default Tabs;
