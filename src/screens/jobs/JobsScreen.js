import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {searchJobs} from '../../services/JobsService';
import {JobCard} from '../../components/jobs/JobCard';
import {IconFilter} from '../../assets/icons/main/IconFilter';
import {useSelector} from 'react-redux';

export const JobsScreen = ({navigation}) => {
  const filterState = useSelector(state => state.jobs.filter);
  const isFilterApplied = useSelector(state => state.jobs.isFilterApplied);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortBy = {
    updatedAt: 'date',
    relevance: 'relevance',
    salaryMin: 'min salary',
    salaryMax: 'max salary',
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        searchJobs(filterState)
          .then(result => {
            setJobs(result.data.items);
            setLoading(false);
          })
          .catch(e => {
            console.log('searchJobs err:', e);
          });
      });
    }
    fetchData();
  }, [filterState, navigation]);

  if (loading) {
    return (
      <View style={styles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Astana</Text>
        <Text style={styles.title}>123</Text>
      </View>
      <View style={globalStyles.topBar}>
        <TouchableOpacity
          style={globalStyles.filterBtn}
          onPress={() => {
            navigation.navigate('JobsFilterScreen');
          }}>
          <IconFilter color={'#185AB7'} size={32} width={1.5} />
          {isFilterApplied && <View style={globalStyles.filterApplied} />}
          <Text style={globalStyles.filterBtnRightText}>Filters</Text>
        </TouchableOpacity>

        <View style={globalStyles.filterBtn}>
          <Text style={globalStyles.filterBtnLeftText}>
            Ordered by {sortBy[filterState.sortBy]}
          </Text>
        </View>
      </View>

      {jobs.length > 0 ? (
        <ScrollView>
          <View style={styles.section}>
            {jobs &&
              jobs.map((item, index) => (
                <JobCard
                  onPress={() => {
                    navigation.navigate('JobScreen', {jobId: item.id});
                  }}
                  key={index}
                  item={item}
                />
              ))}
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>No matches found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSection: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#000000',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  section: {
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  btn: {
    marginBottom: 16,
  },
});
