import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconBookmark} from '../../assets/icons/main/IconBookmark';
import {IconOptions} from '../../assets/icons/main/IconOptions';

// components
import Header from '../../components/Header';
import {JobCard} from './components/JobCard';
import UsersInfo from './components/UsersInfo';
import IconButton from '../../components/buttons/IconButton';
import BottomModal from '../../components/BottomModal';
import StatCard from './components/StatCard';

// store
import {useSelector} from 'react-redux';

// services
import {searchJobs} from '../../services/JobsService';
import {getStats} from '../../services/UtilsService';

export const JobsScreen = ({navigation}) => {
  const filterState = useSelector(state => {
    const {jobs} = state;
    return jobs.filter;
  });
  const [jobs, setJobs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);

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
      <BottomModal
        onCancel={() => setVisible(false)}
        visible={visible}
        title={'Полезная информация'}>
        <StatCard numUsers={stats?.numCompanies} numJobs={stats?.numJobs} />
      </BottomModal>
      {loading ? (
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : jobs.length > 0 ? (
        <ScrollView>
          {jobs &&
            jobs.map((item, index) => (
              <JobCard
                onPress={() => {
                  navigation.navigate('Job', {job: item});
                }}
                key={index}
                item={item}
              />
            ))}
        </ScrollView>
      ) : (
        <View style={globalStyles.fullScreenSection}>
          <Text style={globalStyles.text}>No matches found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
