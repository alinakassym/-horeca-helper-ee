import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';

//styles
import {globalStyles} from '../../styles/globalStyles';
import {StatusesColors} from '../../styles/colors';

// components
import Header from '../../components/Header';
import CVCard from './components/CVCard';
import BottomModal from '../../components/BottomModal';
import ModalButton from '../../components/buttons/ModalButton';

// store
import {setFilter, setFilterApplied} from '../../store/slices/jobs';
import {useDispatch} from 'react-redux';

export const MyCVScreen = ({route, navigation}) => {
  const [me] = useState(route.params.value);
  const [visible, setVisible] = useState(false);
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
      <Header onClose={() => navigation.goBack()} title={'Мои резюме'} goBack />
      <BottomModal visible={visible} onCancel={() => setVisible(false)}>
        <ModalButton divide label={'Продвигать'} />
        <ModalButton divide label={'Деактивировать'} />
        <ModalButton divide label={'Редактировать'} />
        <ModalButton label={'Удалить'} labelColor={StatusesColors.red} />
      </BottomModal>
      <CVCard
        position={me.position?.title_ru}
        salary={me.salary}
        updatedAt={me.updatedAt}
        onPress={() => {
          setVisible(true);
        }}
        findRelevant={() =>
          apply().then(() => {
            navigation.navigate('Jobs');
          })
        }
      />
    </SafeAreaView>
  );
};
