import React, {useState} from 'react';
import Header from '../../components/Header';
import {SafeAreaView, Text, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import PlainButton from '../../components/buttons/PlainButton';
import {IconAdd} from '../../assets/icons/main/IconAdd';
import {WorkCard} from '../../components/works/WorkCard';

export const MyExperienceScreen = ({route, navigation}) => {
  const [works, setWorks] = useState(route.params.value);
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header navigation={navigation} title={'Мой опыт работы'} goBack />

      {/*Works*/}
      <Text>Past Experience</Text>

      {/*Works*/}
      <View>
        <View>
          <PlainButton
            onPress={() => {
              navigation.navigate('AddWorkScreen');
            }}
            label={'Add work experience'}>
            <View>
              <IconAdd color={'#185AB7'} size={24} width={2} />
            </View>
          </PlainButton>
        </View>
        <View>
          {works.map((item, index) => (
            <View key={index}>
              <View />
              <WorkCard
                item={item}
                onPress={() => {
                  navigation.navigate('ProfileWorkScreen', {id: item.id});
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
