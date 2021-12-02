import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {MessagePreview} from './components/MessagePreview';
import {getChats} from '../../services/ChatService';

export const MessagesScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getChats();
        setChats(res);
      } catch (e) {
        console.error('MessagesScreen err: ', e);
      }
    });
  }, [navigation]);
  return (
    <View style={globalStyles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.chats}>
          {chats.map((item, index) => (
            <MessagePreview key={index} item={item} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </View>
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
