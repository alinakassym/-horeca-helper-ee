import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

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
import {useSelector} from 'react-redux';

// services
import {postJobApply, searchJobs} from '../../services/JobsService';
import {getStats} from '../../services/UtilsService';

export const JobsScreen = ({navigation}) => {
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
    const data = {
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

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const jobsData = await searchJobs(filterState);
        const statsData = await getStats();
        setJobs(jobsData.items);
        setStats(statsData);
        setLoading(false);
      } catch (e) {
        console.log('searchJobs err:', e);
      }
    });
  }, [filterState, navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <UsersInfo
        onPress={() => setVisible(true)}
        usersNumber={stats?.numCompaniesOnline || 0}
      />
      <Header options title={'Поиск'} subtitle={'вакансий'}>
        <React.Fragment>
          <IconButton>
            <IconBookmark width={1.7} color={PrimaryColors.element} size={16} />
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
              />
            ))}
        </KeyboardAwareScrollView>
      ) : (
        <View style={globalStyles.fullScreenSection}>
          <Text style={globalStyles.text}>No matches found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
