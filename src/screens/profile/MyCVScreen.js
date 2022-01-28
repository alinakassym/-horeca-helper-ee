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
import {useDispatch, useSelector} from 'react-redux';

// locale
import i18n from '../../assets/i18n/i18n';

export const MyCVScreen = ({route, navigation}) => {
  const {locale} = useSelector(state => state);
  const suffix = locale.suffix;
  const titleKey = `title${suffix}`;

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
      <Header
        onClose={() => navigation.goBack()}
        title={i18n.t('MyCV')}
        goBack
      />
      <BottomModal
        cancelBtnLabel={i18n.t('Cancel')}
        visible={visible}
        onCancel={() => setVisible(false)}>
        <ModalButton divide label={i18n.t('Promote')} />
        <ModalButton divide label={i18n.t('Deactivate')} />
        <ModalButton divide label={i18n.t('Edit')} />
        <ModalButton label={i18n.t('Remove')} labelColor={StatusesColors.red} />
      </BottomModal>
      <CVCard
        position={me.position[titleKey]}
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
