import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {IconArrowBack} from '../assets/icons/main/IconArrowBack';

export const Container = props => {
  const {children, showArrow = true} = props;
  const navigation = useNavigation();
  return (
    <View>
      <View>
        {showArrow && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(null);
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
              }}>
              <IconArrowBack color={'black'} />
              <Text style={{paddingHorizontal: 16}}>Back</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{paddingHorizontal: 16}}>{children}</View>
    </View>
  );
};
