import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, SafeAreaView} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {MessagePreview} from './components/MessagePreview';
import {getChats, getChatsSearch} from '../../services/ChatService';
import {MessageSearch} from './components/MessageSearch';

export const MessagesScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);
  const [searchText, setSearchText] = useState('');

  const searchMessage = async () => {
    try {
      if (searchText.length > 0) {
        const res = await getChatsSearch(searchText);
        setChats(res);
      } else {
        const res = await getChats();
        setChats(res);
      }
    } catch (e) {
      console.log('searchMessage err: ', e);
    }
  };

  const getAllChats = async () => {
    try {
      const res = await getChats();
      setChats(res);
      setSearchText('');
    } catch (e) {
      console.error('getAllChats err: ', e);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      await getAllChats();
    });
  }, [navigation]);
  return (
    <SafeAreaView style={globalStyles.container}>
      <MessageSearch
        text={searchText}
        onChangeText={val => setSearchText(val)}
        onEndEditing={() => searchMessage()}
        onClear={() => getAllChats()}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.chats}>
          {chats.map((item, index) => (
            <MessagePreview key={index} item={item} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5F8FE',
  },
  chats: {
    backgroundColor: '#FFFFFF',
  },
});
