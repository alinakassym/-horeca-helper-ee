import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import ModalHeader from '../../components/ModalHeader';

export const CompanyReviewScreen = ({navigation}) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ModalHeader navigation={navigation} title={'Оценка заведения'} />
      <Text>Company Review</Text>
    </SafeAreaView>
  );
};
