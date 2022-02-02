import React, {useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

//styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

//icons
import {IconAdd} from '../../assets/icons/main/IconAdd';

// components
import Header from '../../components/Header';
import CVCard from './components/CVCard';
import BottomModal from '../../components/BottomModal';
import ModalButton from '../../components/buttons/ModalButton';
import PlainButton from '../../components/buttons/PlainButton';

// store
import {setFilter, setFilterApplied} from '../../store/slices/jobs';
import {useDispatch} from 'react-redux';

// locale
import i18n from '../../assets/i18n/i18n';

export const MyCVScreen = ({route, navigation}) => {
  const [me] = useState(route.params && route.params.me);
  const [myResumes] = useState(route.params.myResumes);
  const [visible, setVisible] = useState(false);
  const [selectedResume, setSelectedResume] = useState();
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
        <ModalButton
          onPress={() => {
            setVisible(false);
            navigation.navigate('ChoosePosition', {me, resume: selectedResume});
          }}
          divide
          label={i18n.t('Edit')}
        />
        <ModalButton label={i18n.t('Remove')} labelColor={StatusesColors.red} />
      </BottomModal>
      <ScrollView>
        {myResumes.map((resume, index) => (
          <CVCard
            key={index}
            position={resume.position?.title_ru}
            salary={resume.salary}
            updatedAt={resume.updatedAt}
            onPress={() => {
              setSelectedResume(resume);
              setVisible(true);
            }}
            findRelevant={() =>
              apply().then(() => {
                // TODO: navigating twice?
                navigation.navigate('Jobs');
              })
            }
          />
        ))}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddWork');
          }}
          style={[globalStyles.section, globalStyles.mt3, globalStyles.mb3]}>
          <PlainButton
            onPress={() => {
              navigation.navigate('ChoosePosition', {me});
            }}
            btnStyle={{...globalStyles.mt3, ...globalStyles.mb3}}
            labelStyle={globalStyles.ml3}
            label={i18n.t('Add CV')}>
            <IconAdd
              style={globalStyles.mr3}
              color={PrimaryColors.brand}
              size={16}
              width={2}
            />
          </PlainButton>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
