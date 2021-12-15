import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import PlainButton from '../../components/buttons/PlainButton';
import {IconAdd} from '../../assets/icons/main/IconAdd';
import {PrimaryColors} from '../../styles/colors';
import ProfileWorkCard from './components/ProfileWorkCard';
import {getEmployee} from '../../services/EmployeesService';

export const MyExperienceScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const res = await getEmployee();
          setWorks(res.data.works);
          setLoading(false);
        } catch (e) {
          console.log('MyExperienceScreen err: ', e);
        }
      });
    }
    fetchData();
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header navigation={navigation} title={'Мой опыт работы'} goBack />
      {loading ? (
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={styles.section}>
            {works.map((item, index) => (
              <View key={index}>
                <View />
                <ProfileWorkCard
                  item={item}
                  edit={() => {
                    navigation.navigate('EditWorkScreen', {value: item});
                  }}
                  rate={() => {
                    navigation.navigate('CompanyReview', {id: item.id});
                  }}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddWorkScreen');
            }}
            style={[styles.section, styles.padding]}>
            <PlainButton
              onPress={() => {
                navigation.navigate('AddWorkScreen');
              }}
              label={'Добавить опыт работы'}>
              <View style={styles.icon}>
                <IconAdd color={PrimaryColors.brand} size={16} width={2} />
              </View>
            </PlainButton>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    backgroundColor: PrimaryColors.white,
  },
  padding: {
    padding: 18,
  },
  icon: {
    marginRight: 8,
  },
});
