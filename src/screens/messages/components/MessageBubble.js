import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {IconMessageStatus} from '../../../assets/icons/main/IconMessageStatus';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const dimensions = Dimensions.get('screen');

export const MessageBubble = ({item}) => {
  const {senderType, body} = item;
  const formatDate = date => {
    let fromNow = moment(date).fromNow();
    return moment(date).calendar(null, {
      lastWeek: 'DD MMM',
      lastDay: '[Yesterday]',
      sameDay: 'HH:MM',
      sameElse: function () {
        return `[${fromNow}]`;
      },
    });
  };

  return (
    <View style={styles.bubbleWrapper}>
      {senderType === 'ee' ? (
        <View style={[styles.bubble, styles.ee]}>
          <Text style={styles.eeText}>{body}</Text>
        </View>
      ) : (
        <LinearGradient
          colors={['#38B6EC', '#31A0E8', '#2A8BE4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.bubble, styles.er]}>
          <Text style={styles.erText}>{body}</Text>
        </LinearGradient>
      )}
    </View>
  );
};

const width = dimensions.width;

const styles = StyleSheet.create({
  bubbleWrapper: {
    flex: 1,
    width: width - 40,
    justifyContent: 'flex-end',
  },
  bubble: {
    padding: 16,
    maxWidth: width * 0.8,
  },
  ee: {
    marginBottom: 6,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#E2E5E8',
  },
  er: {
    marginBottom: 6,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 20,
  },
  eeText: {
    fontSize: 16,
    color: '#151F47',
  },
  erText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
