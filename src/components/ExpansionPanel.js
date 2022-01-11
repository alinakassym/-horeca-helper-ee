import React from 'react';
import PropTypes from 'prop-types';
import {Pressable, View, Text, StyleSheet, Dimensions} from 'react-native';

// styles
import {PrimaryColors} from '../styles/colors';

// icons
import {IconExpandDown} from '../assets/icons/main/IconExpandDown';
import {IconExpandUp} from '../assets/icons/main/IconExpandUp';

const propTypes = {
  items: PropTypes.array,
  expandedBlockStyle: PropTypes.object,
};

const dimensions = Dimensions.get('screen');

class ExpansionPanel extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      currentItem: null,
    };
  }

  render() {
    const {items, expandedBlockStyle, children} = this.props;
    const {currentItem} = this.state;
    return (
      <React.Fragment>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <Pressable
              style={styles.panelHeader}
              onPress={() => {
                if (index === currentItem) {
                  this.setState({...this.state, currentItem: null});
                } else {
                  this.setState({...this.state, currentItem: index});
                }
              }}>
              <Text style={styles.title}>{item.title}</Text>
              {index === currentItem ? (
                <IconExpandUp size={16} color={PrimaryColors.element} />
              ) : (
                <IconExpandDown size={16} color={PrimaryColors.element} />
              )}
            </Pressable>
            {index === currentItem && item.body && (
              <Text style={styles.body}>{item.body}</Text>
            )}
            {index === currentItem && (
              <View style={[styles.expandedBlock, expandedBlockStyle]}>
                {children}
              </View>
            )}
            {index < items.length && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  panelHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PrimaryColors.white,
  },
  divider: {
    borderBottomColor: PrimaryColors.grey3,
    borderBottomWidth: 0.7,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  body: {
    padding: 20,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 16,
    color: PrimaryColors.element,
    backgroundColor: PrimaryColors.white,
  },
  expandedBlock: {
    width: dimensions.width,
    paddingHorizontal: 20,
    backgroundColor: PrimaryColors.white,
  },
});

ExpansionPanel.propTypes = propTypes;
export default ExpansionPanel;
