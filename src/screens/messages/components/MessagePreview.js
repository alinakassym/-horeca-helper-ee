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

const dimensions = Dimensions.get('screen');

export const MessagePreview = ({item, navigation}) => {
  const {id, company, lastMessage, numUnread} = item;

  const formatDate = date => {
    return moment(date).calendar(null, {
      lastWeek: 'DD/MM/YYYY',
      lastDay: '[Вчера]',
      sameDay: 'HH:MM',
      sameElse: 'DD/MM/YYYY',
    });
  };

  const UnreadMessagesCount = () => {
    return <Text style={styles.unreadMessagesCount}>{numUnread}</Text>;
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate('MessagesChatScreen', {
          chatId: id,
          company: company,
        })
      }>
      <View style={styles.leftCol}>
        <View style={styles.imageWrapper}>
          <Image style={styles.img} source={{uri: company.photoUrl}} />
        </View>
      </View>
      <View style={styles.rightCol}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {company.title}
          </Text>
          <Text style={styles.date}>{formatDate(lastMessage.createdAt)}</Text>
        </View>
        <View style={[styles.row, styles.spaceBetween]}>
          {lastMessage.senderType === 'ee' ? (
            <View style={styles.row}>
              <IconMessageStatus
                color={lastMessage.isRead ? '#2A8BE4' : '#8391A1'}
                size={20}
              />
              <Text style={styles.text} numberOfLines={1}>
                {lastMessage.body}
              </Text>
            </View>
          ) : (
            <Text style={styles.text} numberOfLines={1}>
              {lastMessage.body}
            </Text>
          )}
          {numUnread > 0 && <UnreadMessagesCount />}
        </View>
        <View style={styles.divider} />
      </View>
    </Pressable>
  );
};

const imageSize =
  dimensions.width * 0.15 > 60
    ? 60
    : dimensions.width * 0.15 < 52
    ? 52
    : dimensions.width * 0.15;

const pa = 20;
const leftColWidth = imageSize + pa;
const rightColWidth = dimensions.width - leftColWidth;

const styles = StyleSheet.create({
  card: {
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCol: {
    paddingHorizontal: pa,
    width: leftColWidth,
  },
  rightCol: {
    paddingTop: 14,
    paddingHorizontal: pa,
    width: rightColWidth,
  },
  imageWrapper: {
    marginTop: 4,
    height: imageSize,
    width: imageSize,
    borderWidth: 0.7,
    borderRadius: imageSize,
    borderColor: '#E2E5E8',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
    backgroundColor: '#E2E5E8',
  },
  titleRow: {
    marginTop: 4,
    marginBottom: 8,
    width: rightColWidth - pa * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  title: {
    width: rightColWidth - 126,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#151F47',
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#8391A1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 4,
    width: rightColWidth - 90,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#8391A1',
  },
  divider: {
    marginTop: 14,
    height: 1,
    width: rightColWidth - pa * 2,
    borderBottomWidth: 1,
    borderColor: '#E2E5E8',
  },
  unreadMessagesCount: {
    paddingHorizontal: 4,
    minWidth: 18,
    minHeight: 18,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: '#2A8BE4',
    color: '#FFFFFF',
  },
});
