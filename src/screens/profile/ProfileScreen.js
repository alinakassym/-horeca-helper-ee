import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  StyleSheet,
  Platform,
} from 'react-native';
import moment from 'moment';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

// icons
import {IconExpandRight} from '../../assets/icons/main/IconExpandRight';
import {IconSignOut} from '../../assets/icons/main/IconSignOut';
import {IconShare} from '../../assets/icons/main/IconShare';

// components
import {ProfileHeader} from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import LightGradientButton from '../../components/buttons/LightGradientButton';
import OutlineButton from '../../components/buttons/OutlineButton';

// store
import {AuthContext} from '../../store/context';

//services
import {getEmployee} from '../../services/EmployeesService';

import i18n from '../../assets/i18n/i18n';
import {useSelector} from 'react-redux';

export const ProfileScreen = ({navigation}) => {
  const suffix = useSelector(state => {
    const {locale} = state;
    return locale.suffix;
  });

  const {signOut} = React.useContext(AuthContext);
  const [me, setMe] = useState({
    city: null,
    description: '',
  });

  const getAge = birthDate =>
    birthDate ? moment().diff(birthDate, 'years', false) : null;

  const onShare = async () => {
    try {
      await Share.share({
        message:
          Platform.OS === 'android'
            ? 'https://play.google.com/store/apps'
            : 'https://www.appstore.com',
      });
    } catch (error) {
      console.log('onShare err: ', error.message);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getEmployee();
        setMe(res.data);
      } catch (e) {
        console.log('ProfileScreen err: ', e);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View style={styles.section}>
          <ProfileHeader
            firstName={me.firstName}
            lastName={me.lastName}
            description={me.description}
            photoUrl={me.photoUrl}
          />
        </View>

        <ProfileInfo
          avgAvgScore={me.avgAvgScore}
          contactInfo={'+7 (777) 123-45-56'}
          age={getAge(me.birthDate)}
          city={me.city?.title_ru}
          email={me.email}
        />

        <View style={styles.section}>
          <LightGradientButton
            onPress={() => {
              navigation.navigate('ProfileEdit', {
                value: me,
              });
            }}
            label={'Редактировать профиль'}
          />
        </View>

        <View style={styles.list}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyCV', {value: me})}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>Мои резюме</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MyExperience', {value: me.works})
            }
            style={[styles.listItem]}>
            <Text style={styles.listItemTitle}>Мой опыт работы</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Support')}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>Контактная поддержка</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FAQ')}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>Вопросы и ответы</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.listItem}>
            <Text style={styles.listItemTitle}>{i18n.t('Settings')}</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            globalStyles.alignCenter,
            globalStyles.mt6,
            globalStyles.mb4,
          ]}>
          <OutlineButton
            onPress={() => onShare()}
            style={styles.shareButton}
            label={'Поделиться приложением'}>
            <IconShare
              style={globalStyles.mr3}
              color={PrimaryColors.brand}
              size={16}
            />
          </OutlineButton>
        </View>

        <View style={[styles.list, globalStyles.mb3]}>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
            style={styles.listItem}>
            <View style={styles.row}>
              <IconSignOut color={StatusesColors.red} />
              <Text
                style={[
                  styles.listItemTitle,
                  globalStyles.ml3,
                  {color: StatusesColors.red},
                ]}>
                Выйти
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const padding = 20;

const styles = StyleSheet.create({
  section: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    marginTop: 8,
    paddingLeft: padding,
    backgroundColor: PrimaryColors.white,
  },
  listItem: {
    paddingRight: padding,
    paddingVertical: padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  listItemDivider: {
    borderBottomWidth: 0.7,
    borderBottomColor: PrimaryColors.grey3,
  },
  shareButton: {
    paddingVertical: 12,
    minWidth: '60%',
    backgroundColor: PrimaryColors.white,
  },
});
