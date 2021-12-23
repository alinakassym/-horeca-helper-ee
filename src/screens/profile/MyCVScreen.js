import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

//styles
import {globalStyles} from '../../styles/globalStyles';

// components
import Header from '../../components/Header';
import CVCard from './components/CVCard';

// store
import {setFilter, setFilterApplied} from '../../store/slices/jobs';
import {useDispatch} from 'react-redux';

export const MyCVScreen = ({route, navigation}) => {
  const [me] = useState(route.params.value);
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
      <CVCard
        position={me.position.title_ru}
        salary={me.salary}
        updatedAt={me.updatedAt}
        onPress={() =>
          apply().then(() => {
            navigation.navigate('Jobs');
          })
        }
      />
    </SafeAreaView>
  );
};
