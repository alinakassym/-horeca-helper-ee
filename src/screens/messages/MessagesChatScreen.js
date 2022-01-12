import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// components
import Header from '../../components/Header';
import SendButton from '../../components/buttons/SendButton';
import ActivePoint from '../../components/ActivePoint';
import {MessageBubble} from './components/MessageBubble';
import lodash from 'lodash';
import moment from 'moment';

// services
import {getCompanyStatus} from '../../services/CompaniesService';
import {getChatById, postMessage} from '../../services/ChatService';

const dimensions = Dimensions.get('screen');

export const MessagesChatScreen = ({route, navigation}) => {
  const scrollViewRef = useRef();
  const [company, setCompany] = useState({
    photoUrl: null,
    title: '',
  });
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [viewHeight, setHeight] = useState(0);

  const [message, setMessage] = useState(null);

  let fetchData: function;
  fetchData = async () => {
    const res = await getChatById(route.params?.chatId);
    const orderedList = lodash.orderBy(res, 'createdAt');
    const groups = lodash.groupBy(orderedList, el => formatDate(el.createdAt));
    const groupNameList = Object.keys(groups);
    return Promise.all([groupNameList, groups]);
  };

  const send = async () => {
    try {
      if (message && message.length > 0) {
        await postMessage(route.params?.chatId, {
          body: message,
        });
        const [groupNameList, groups] = await fetchData();
        setGroupNames(groupNameList);
        setMessages(groups);

        setMessage(null);
      }
    } catch (e) {
      console.error('postMessage err: ', e);
    }
  };

  const getViewDimensions = layout => {
    const {height} = layout;
    setHeight(dimensions.height - height - 100);
  };

  const formatDate = date => {
    return moment(date).calendar(null, {
      lastWeek: 'DD.MM.YYYY',
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      sameElse: 'DD.MM.YYYY',
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refresh = useCallback(async () => {
    setTimeout(refresh, 60000);
    const statusData = await getCompanyStatus(route.params?.company?.id);
    setStatus(statusData?.isActive);
  });

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const [groupNameList, groups] = await fetchData();
        setGroupNames(groupNameList);
        setMessages(groups);

        setCompany(route.params?.company);
        setStatus(route.params?.company.isActive);
        setLoading(false);

        setTimeout(refresh, 60000);
      } catch (e) {
        console.error('MessagesChatScreen err: ', e);
      }
    });
  }, [fetchData, navigation, refresh, route]);

  const Group = ({item}) => {
    return (
      <>
        <View style={styles.date}>
          <Text style={styles.dateText}>{item}</Text>
        </View>
        {messages[item].map((messageItem, index) => (
          <MessageBubble
            key={index}
            item={messageItem}
            company={company}
            prev={index !== 0 ? messages[item][index - 1] : null}
          />
        ))}
      </>
    );
  };

  if (loading) {
    return (
      <View style={globalStyles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header goBack onClose={() => navigation.goBack()}>
        <>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: company.photoUrl}} />
            {status && <ActivePoint style={styles.isActive} />}
          </View>
          <View>
            <Text style={styles.userName} numberOfLines={1}>
              {company.title}
            </Text>
          </View>
        </>
      </Header>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current.scrollToEnd({animated: true});
        }}>
        <View style={{height: viewHeight}} />
        <View
          onLayout={event => {
            getViewDimensions(event.nativeEvent.layout);
          }}
          style={styles.scrollViewInnerBlock}>
          {groupNames.map((groupNameItem, index) => (
            <Group item={groupNameItem} key={index} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.inputSection}>
        <TextInput
          value={message}
          onChangeText={val => setMessage(val)}
          onFocus={() => scrollViewRef.current.scrollToEnd({animated: true})}
          style={styles.input}
        />
        <SendButton onPress={() => send()} />
      </View>
    </SafeAreaView>
  );
};

const imageSize = 44;
const headerSectionPadding = 20;
const leftColWidth = 40 + 16;
const rightColWidth =
  dimensions.width - leftColWidth - headerSectionPadding * 2;

const styles = StyleSheet.create({
  inputSection: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PrimaryColors.white,
  },
  input: {
    marginRight: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
    width: dimensions.width - 100,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: PrimaryColors.grey1,
    color: PrimaryColors.element,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  scrollViewInnerBlock: {
    paddingBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
    marginLeft: 16,
    marginRight: 12,
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: imageSize,
  },
  isActive: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  userName: {
    width: rightColWidth - imageSize - 16,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dateText: {
    marginTop: 16,
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    borderRadius: 40,
    backgroundColor: PrimaryColors.grey1,
    color: PrimaryColors.white,
  },
});
