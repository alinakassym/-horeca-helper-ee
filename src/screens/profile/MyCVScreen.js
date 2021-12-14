import React, {useState} from 'react';
import Header from '../../components/Header';
import {SafeAreaView, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {IconSearch} from '../../assets/icons/main/IconSearch';
import PlainButton from '../../components/buttons/PlainButton';
import {setFilter, setFilterApplied} from '../../store/slices/jobs';
import {useDispatch} from 'react-redux';

export const MyCVScreen = ({route, navigation}) => {
  const [me, setMe] = useState(route.params.value);
  const dispatch = useDispatch();

  const apply = async () => {
    await dispatch(
      setFilter({
        positionId: me.positionId,
        position: me.position,
        companyCategoryId: null,
        cityId: me.cityId,
        city: me.city,
        ageMin: me.ageMin,
        ageMax: me.ageMax,
        genderId: me.genderId,
        gender: me.gender,
        experienceMin: me.experienceMin,
        experienceMax: me.experienceMax,
        scheduleId: me.scheduleId,
        salaryMin: me.salary,
        salaryMax: me.salary,
        sortBy: 'relevance',
        orderBy: {
          title: 'Relevance',
          key: 'relevance',
        },
        sortOrder: 'DESC',
        pageSize: 20,
        pageNum: 1,
      }),
    );
    await dispatch(setFilterApplied(true));
    navigation.navigate('Jobs');
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header navigation={navigation} title={'Мои резюме'} goBack />
      <View>
        <View>
          <IconSearch color={'#185AB7'} size={24} width={2} />
        </View>
        <PlainButton
          label={'Find relevant jobs'}
          onPress={() =>
            apply().then(() => {
              navigation.navigate('Jobs');
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};
