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
  const {id, company, lastMessage} = item;

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
        <View style={styles.textRow}>
          {lastMessage.senderType === 'ee' && (
            <IconMessageStatus
              color={lastMessage.isRead ? '#2A8BE4' : '#8391A1'}
              size={20}
            />
          )}
          <Text style={styles.text} numberOfLines={1}>
            {lastMessage.body}
          </Text>
        </View>
        <View style={styles.divider} />
      </View>
    </Pressable>
  );
};

const imageSize =
  dimensions.width * 0.15 > 70
    ? 70
    : dimensions.width * 0.15 < 50
    ? 50
    : dimensions.width * 0.15;
const leftColWidth = imageSize + 16;
const rightColWidth = dimensions.width - leftColWidth;

const styles = StyleSheet.create({
  card: {
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCol: {
    paddingHorizontal: 16,
    width: leftColWidth,
  },
  rightCol: {
    paddingTop: 14,
    paddingHorizontal: 16,
    width: rightColWidth,
  },
  imageWrapper: {
    height: imageSize,
    width: imageSize,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: imageSize,
    backgroundColor: '#767676',
  },
  titleRow: {
    marginTop: 4,
    marginBottom: 8,
    width: rightColWidth - 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  title: {
    width: rightColWidth - 110,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#151F47',
  },
  date: {
    color: '#8391A1',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    marginLeft: 4,
    width: rightColWidth - 60,
    fontSize: 16,
    lineHeight: 20,
    color: '#8391A1',
  },
  divider: {
    marginTop: 14,
    height: 1,
    width: rightColWidth - 32,
    borderBottomWidth: 1,
    borderColor: '#E2E5E8',
  },
});
