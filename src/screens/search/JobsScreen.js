import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';
import {typography} from '../../styles/typography';

// icons
import {IconBookmark} from '../../assets/icons/main/IconBookmark';
import {IconOptions} from '../../assets/icons/main/IconOptions';

// components
import Header from '../../components/Header';
import JobCard from './components/JobCard';
import UsersInfo from './components/UsersInfo';
import IconButton from '../../components/buttons/IconButton';
import BottomModalComponent from '../../components/BottomModal';
import StatCard from './components/StatCard';
import {BottomModal} from './components/BottomModal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// store
import {useDispatch, useSelector} from 'react-redux';

// services
import {
  postJobApply,
  postJobStar,
  searchJobs,
} from '../../services/JobsService';
import {getStats} from '../../services/UtilsService';
import * as ResumesService from '../../services/ResumesService';

import {setFilter} from '../../store/slices/jobs';

export const JobsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const filterState = useSelector(state => {
    const {jobs} = state;
    return jobs.filter;
  });
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleApply, setVisibleApply] = useState(false);
  const [stats, setStats] = useState();
  const [applyMessage, setApplyMessage] = useState();
  const [loading, setLoading] = useState(true);

  const sendApply = async () => {
    // TODO: unhardcode & let user select via UI
    const myResumesData = await ResumesService.getMy();

    const data = {
      resumeId: myResumesData[0]?.id,
      body: applyMessage,
    };

    console.log({
      id: jobId,
      data: data,
    });

    await postJobApply(jobId, data);
    setApplyMessage('');
    setVisibleApply(false);
  };

  const isValid = () => {
    return applyMessage && applyMessage.length > 0;
  };

  const setJobStar = async item => {
    await postJobStar(item.id, {isStarred: !item.isStarred});
    const jobsData = await searchJobs(filterState);
    setJobs(jobsData.items);
  };

  const getStarredJobs = async () => {
    await dispatch(
      setFilter({
        ...filterState,
        isStarred: filterState.isStarred ? null : true,
      }),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await searchJobs(filterState);
        const statsData = await getStats();
        setJobs(jobsData.items);
        setStats(statsData);
        setLoading(false);
      } catch (e) {
        console.log('searchJobs err:', e);
      }
    };
    fetchData().then();
  }, [filterState]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <UsersInfo
        onPress={() => setVisible(true)}
        usersNumber={stats?.numCompaniesOnline || 0}
      />
      <Header options title={'Поиск'} subtitle={'вакансий'}>
        <React.Fragment>
          <IconButton onPress={() => getStarredJobs()}>
            <IconBookmark
              fillColor={
                filterState.isStarred
                  ? PrimaryColors.element
                  : PrimaryColors.white
              }
              width={1.7}
              color={PrimaryColors.element}
              size={16}
            />
          </IconButton>
          <IconButton
            onPress={() => {
              navigation.navigate('JobsFilter');
            }}>
            <IconOptions color={PrimaryColors.element} size={16} />
          </IconButton>
        </React.Fragment>
      </Header>
      <BottomModalComponent
        onCancel={() => setVisible(false)}
        visible={visible}
        title={'Полезная информация'}>
        <StatCard numUsers={stats?.numCompanies} numJobs={stats?.numJobs} />
      </BottomModalComponent>

      <BottomModal
        visible={visibleApply}
        onClose={() => setVisibleApply(false)}
        text={applyMessage}
        onSend={() => sendApply()}
        isValid={isValid()}
        onChangeText={val => setApplyMessage(val)}
      />
      {loading ? (
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : jobs.length > 0 ? (
        <KeyboardAwareScrollView enableResetScrollToCoords={false}>
          {jobs &&
            jobs.map((item, index) => (
              <JobCard
                onSendApply={val => {
                  setJobId(val.id);
                  setVisibleApply(true);
                }}
                onPress={() => {
                  navigation.navigate('Job', {job: item});
                }}
                key={index}
                item={item}
                onSelect={() => {
                  setJobStar(item).then();
                }}
              />
            ))}
        </KeyboardAwareScrollView>
      ) : (
        <View style={globalStyles.fullScreenSection}>
          <Text style={typography.text}>Нет подходящих вакансий</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
