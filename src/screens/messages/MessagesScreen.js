import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {MessagePreview} from './components/MessagePreview';
import {getChats} from '../../services/ChatService';

const items = [
  {
    id: 1,
    company: {
      photoUrl:
        'https://media.istockphoto.com/vectors/local-craft-food-design-template-local-food-poster-for-restaurant-vector-id1208194075?k=20&m=1208194075&s=612x612&w=0&h=t6rNlUlPopg8YENqjkyU6fJVyXPf2dpp6fhDWMEOoVU=',
      title: 'The Local craft food',
    },
    createdAt: '2021-11-29T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: 'Today',
  },
  {
    id: 2,
    company: {
      photoUrl:
        'https://cdn.dribbble.com/users/6268398/screenshots/14607836/restaurant-logo-5.png',
      title: 'Cafe Elite',
    },
    createdAt: '2021-11-28T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: 'Yesterday',
  },
  {
    id: 2,
    company: {
      photoUrl:
        'https://i.pinimg.com/originals/27/87/58/278758c917eb70d151d8c4dcb4807c8a.png',
      title: 'Christopher Coffee House Cafe',
    },
    createdAt: '2020-11-27T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: '28.11.2021',
  },
];

const photos = {
  1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Motel-6-logo.svg/1200px-Motel-6-logo.svg.png',
  2: 'data:image/jpeg;base64,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45iMC4w+KVmQe625A8VP3l8tx9JfZzY7BU6yGnVUMvgenmDuD5iUVKLcscHaXs+pppbQlH4dRXj7rp3YYHG06yZ6Thl8R08iNwfIzpvKPjOU69B+1wVVv7pNm9L+6w8jaMPzjWons8XRN/EDK3+E6H1BAkVtGHKorc9V6k3smPOg8XLR+heLxITCc1YSp/ahD4OCv1On1kpRxdN/cdG9GB/KXxnGWjM06c4O0k0b7xeYmitjaSe/Upr6sB+cldEbHREgsZzZhKf9pnPggLfXb6yDr834iuezwlE38SMzDzsO6vxvKZbRTjle74LM0U9krTzw2XF5L3LfxDH0qCZ6rhR57nyA3J9JSsdxjEcQc4fDKVp/eJ0uPF26DyGp89p0YHlCrWftcZUYn8IN29C2yjyX6S34PCJSQU6ahFHQfmfE+crtVq6+GPuyxSo7PnHxy4/2r7/I4OAcAp4VLL3nPvORqfIDovlJeYmZpjFRVo6GSc5Tk5Sd2xEROkRERAEREAREQBERAEREAREQBERAEREAxNdegjrldVYeDAEfIzbEAgcVyhhH1yFD+4xH0Nx9JF1eQKR92s49VU/laXKJTLZ6UtYo0Q2uvHSb76lI/wDT/wD+x/w//KbqPIFIe9VqH0Cj87y4xI/paP8AqTe37Q/7vl9iCwnKGETXsy5/fYn6aD6SZo0VQZUVVHgAAPkJsiXRhGGUVYzzqTnnNt9RERJEBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA/9k=',
  3: 'https://ratetea.com/images/brand/the-tea-spot.jpg',
};

export const MessagesScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getChats();
        setChats(
          res.map((item, i) => {
            return {
              ...item,
              text: items[0].text,
              company: {...item.company, photoUrl: photos[item.company.id]},
            };
          }),
        );
      } catch (e) {
        console.error('MessagesScreen err: ', e);
      }
    });
  }, [navigation]);
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        {chats.map((item, index) => (
          <MessagePreview
            key={index}
            item={item}
            divider={index < chats.length - 1}
            navigation={navigation}
          />
        ))}

        {items.map((item, index) => (
          <MessagePreview
            key={index}
            item={item}
            divider={index < items.length - 1}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};
