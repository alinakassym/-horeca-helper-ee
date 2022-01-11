import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';

// components
import Header from '../../components/Header';
import ExpansionPanel from '../../components/ExpansionPanel';

// services
import {getFAQs} from '../../services/UtilsService';

export const FAQScreen = ({navigation}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const result = await getFAQs();
        setItems(result);
      } catch (e) {
        console.log('FAQScreen err: ', e);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'Вопросы и ответы'}
        style={globalStyles.mb3}
      />
      <ScrollView>
        <ExpansionPanel
          items={items}
          itemTitle={'question_ru'}
          itemValue={'answer_ru'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
