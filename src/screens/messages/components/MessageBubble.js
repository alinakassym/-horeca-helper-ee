import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {IconMessageStatus} from '../../../assets/icons/main/IconMessageStatus';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

const dimensions = Dimensions.get('screen');

export const MessageBubble = ({item, company, prev}) => {
  const {senderType, bodyType, body, createdAt, isRead, job} = item;

  const formattedTime = val => {
    return moment(val).format('HH:MM');
  };

  const jobInviteMessage = () => {
    return (
      <>
        <View style={styles.article}>
          <Text style={styles.erText}>
            <Text style={styles.textBold}>{job.company.title}</Text> invited you
            to job:
          </Text>
        </View>
        {job.position && (
          <View style={styles.article}>
            <Text style={styles.erText}>
              <Text style={styles.textBold}>Position: </Text>
              {job.position.title}
            </Text>
          </View>
        )}
        {job.schedule && (
          <View style={styles.article}>
            <Text style={styles.erText}>
              <Text style={styles.textBold}>Schedule: </Text>
              {job.schedule.title}
            </Text>
          </View>
        )}
        {job.city && (
          <View style={styles.article}>
            <Text style={styles.erText}>
              <Text style={styles.textBold}>Location: </Text>
              {job.city.title}
            </Text>
          </View>
        )}
        <View style={styles.article}>
          <Text style={styles.erText}>{body}</Text>
        </View>
      </>
    );
  };
  const jobApplyMessage = () => {
    return (
      <>
        <View style={styles.article}>
          <Text style={styles.eeText}>
            <Text style={styles.textBold}>You</Text> applied for job:
          </Text>
        </View>
        {job.position && (
          <View style={styles.article}>
            <Text style={styles.eeText}>
              <Text style={styles.textBold}>Position: </Text>
              {job.position.title}
            </Text>
          </View>
        )}
        {job.schedule && (
          <View style={styles.article}>
            <Text style={styles.eeText}>
              <Text style={styles.textBold}>Schedule: </Text>
              {job.schedule.title}
            </Text>
          </View>
        )}
        {job.city && (
          <View style={styles.article}>
            <Text style={styles.eeText}>
              <Text style={styles.textBold}>Location: </Text>
              {job.city.title}
            </Text>
          </View>
        )}
        <View style={styles.article}>
          <Text style={styles.eeText}>{body}</Text>
        </View>
      </>
    );
  };

  return (
    <View style={styles.bubbleWrapper}>
      {senderType === 'er' ? (
        <View
          style={[
            styles.bubble,
            styles.er,
            {marginTop: prev && prev.senderType === senderType ? 8 : 16},
            {
              borderTopLeftRadius:
                prev && prev.senderType === senderType ? 5 : 20,
            },
          ]}>
          {bodyType === 'JOB_INVITE' ? (
            jobInviteMessage()
          ) : (
            <Text style={styles.erText}>{body}</Text>
          )}
          <View style={styles.rightBottom}>
            <Text style={styles.rightBottomTextER}>
              {formattedTime(createdAt)}
            </Text>
          </View>
        </View>
      ) : (
        <LinearGradient
          colors={['#38B6EC', '#31A0E8', '#2A8BE4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[
            styles.bubble,
            styles.ee,
            {marginTop: prev && prev.senderType === senderType ? 8 : 16},
            {
              borderTopRightRadius:
                prev && prev.senderType === senderType ? 5 : 20,
            },
          ]}>
          {bodyType === 'JOB_APPLY' ? (
            jobApplyMessage()
          ) : (
            <Text style={styles.eeText}>{body}</Text>
          )}

          <View style={styles.rightBottom}>
            <Text style={styles.rightBottomTextEE}>
              {formattedTime(createdAt)}
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
    alignSelf: 'flex-start',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#E2E5E8',
  },
  ee: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 20,
  },
  erText: {
    paddingRight: 44,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#151F47',
  },
  eeText: {
    paddingRight: 72,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
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
