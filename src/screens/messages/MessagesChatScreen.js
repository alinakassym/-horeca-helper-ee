import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {getChatById, postMessage} from '../../services/ChatService';
import BackButton from '../../components/buttons/BackButton';
import {MessageBubble} from './components/MessageBubble';
import SendButton from '../../components/buttons/SendButton';
import lodash from 'lodash';

const dimensions = Dimensions.get('screen');

export const MessagesChatScreen = ({route, navigation}) => {
  const scrollViewRef = useRef();
  const [company, setCompany] = useState({
    photoUrl: null,
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [viewHeight, setHeight] = useState(0);

  const [message, setMessage] = useState(null);

  const send = async () => {
    try {
      await postMessage(route.params?.chatId, {
        body: message,
      });
      const res = await getChatById(route.params?.chatId);
      setMessages(lodash.orderBy(res, 'createdAt'));
      setMessage(null);
    } catch (e) {
      console.error('postMessage err: ', e);
    }
  };

  const getViewDimensions = layout => {
    const {height} = layout;
    setHeight(dimensions.height - height - 230);
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getChatById(route.params?.chatId);
        setMessages(lodash.orderBy(res, 'createdAt'));
        setCompany(route.params?.company);
        setLoading(false);
      } catch (e) {
        console.error('MessagesChatScreen err: ', e);
      }
    });
  }, [navigation, route]);

  if (loading) {
    return (
      <View style={globalStyles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.headerSection}>
        <View style={styles.leftCol}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.rightCol}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: company.photoUrl}} />
          </View>
          <View>
            <Text style={styles.userName} numberOfLines={1}>
              {company.title}
            </Text>
          </View>
        </View>
      </View>
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
          {messages.map((messageItem, index) => (
            <MessageBubble key={index} item={messageItem} />
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
    </View>
  );
};

const imageSize = 58;
const headerSectionPadding = 20;
const leftColWidth = 52 + 20;
const rightColWidth =
  dimensions.width - leftColWidth - headerSectionPadding * 2;

const styles = StyleSheet.create({
  inputSection: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginRight: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
    width: dimensions.width - 100,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#8391A1',
  },
  scrollView: {
    padding: 20,
    backgroundColor: '#F5F8FE',
  },
  scrollViewInnerBlock: {
    paddingBottom: 20,
  },
  headerSection: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    marginRight: 16,
    height: imageSize,
    width: imageSize,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: imageSize,
    backgroundColor: '#767676',
  },
  userName: {
    width: rightColWidth - imageSize - 16,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#151F47',
  },
});
