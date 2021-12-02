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
  const {senderType, body, createdAt, isRead} = item;
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

  const formatedTime = val => {
    return moment(val).format('HH:MM');
  };

  return (
    <View style={styles.bubbleWrapper}>
      {senderType === 'er' ? (
        <View style={[styles.bubble, styles.er]}>
          <Text style={styles.erText}>{body}</Text>
          <View style={styles.rightBottom}>
            <Text style={styles.rightBottomTextER}>
              {formatedTime(createdAt)}
            </Text>
          </View>
        </View>
      ) : (
        <LinearGradient
          colors={['#38B6EC', '#31A0E8', '#2A8BE4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.bubble, styles.ee]}>
          <Text style={styles.eeText}>{body}</Text>
          <View style={styles.rightBottom}>
            <Text style={styles.rightBottomTextEE}>
              {formatedTime(createdAt)}
            </Text>
            <IconMessageStatus color={isRead ? '#FFFFFF' : '#6CB5ED'} />
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const width = dimensions.width;
const bubbleWidth = dimensions.width * 0.8;

const styles = StyleSheet.create({
  bubbleWrapper: {
    flex: 1,
    width: width - 40,
    alignItems: 'flex-end',
  },
  bubble: {
    position: 'relative',
    padding: 16,
    maxWidth: bubbleWidth,
  },
  er: {
    marginBottom: 6,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#E2E5E8',
  },
  ee: {
    marginBottom: 6,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 20,
  },
  erText: {
    paddingRight: 44,
    fontSize: 16,
    color: '#151F47',
  },
  eeText: {
    paddingRight: 72,
    fontSize: 16,
    color: '#FFFFFF',
  },
  rightBottom: {
    position: 'absolute',
    right: 8,
    bottom: 12,
    flexDirection: 'row',
    fontSize: 15,
  },
  rightBottomTextER: {
    marginRight: 4,
    fontSize: 16,
    lineHeight: 26,
    color: '#8391A1',
  },
  rightBottomTextEE: {
    marginRight: 4,
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
});
