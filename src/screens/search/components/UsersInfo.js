import React from 'react';
import {Pressable, StyleSheet, Text, View, Dimensions} from 'react-native';
import {IconDot} from '../../../assets/icons/main/IconDot';
import {IconWarningCircle} from '../../../assets/icons/main/IconWarningCircle';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import PropTypes from 'prop-types';

const dimensions = Dimensions.get('screen');

const propTypes = {
  usersNumber: PropTypes.number,
  onPress: PropTypes.func,
};

class UsersInfo extends React.PureComponent {
  render() {
    const {usersNumber, onPress} = this.props;
    return (
      <View style={styles.row}>
        <View style={styles.onlineUsers}>
          <IconDot color={StatusesColors.green} size={8} />
          <Text style={styles.text}>2{usersNumber} работодателей онлайн</Text>
        </View>
        <Pressable style={styles.btn} onPress={onPress}>
          <IconWarningCircle color={PrimaryColors.grey1} />
        </Pressable>
      </View>
    );
  }
}

const width = dimensions.width;

const styles = StyleSheet.create({
  row: {
    paddingTop: 20,
    paddingHorizontal: 20,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: PrimaryColors.white,
  },
  onlineUsers: {
    width: width - 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 16,
    color: PrimaryColors.grey1,
  },
  btn: {
    width: 40,
    alignItems: 'center',
  },
});

UsersInfo.propTypes = propTypes;
export default UsersInfo;
