import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  ActivityIndicator,
  Modal,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {AuthContext} from '../../store/context';
import {
  getEmployee,
  updateEmployeePhoto,
} from '../../services/EmployeesService';
import {IconExpandRight} from '../../assets/icons/main/IconExpandRight';
import {IconSignOut} from '../../assets/icons/main/IconSignOut';

import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProfileHeader} from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import LightGradientButton from '../../components/buttons/LightGradientButton';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

export const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  const [me, setMe] = useState({
    city: null,
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Notification
  const [isNotification, setIsNotification] = useState(false);
  const toggleNotification = () =>
    setIsNotification(previousNotificationState => !previousNotificationState);

  const getAge = birthDate =>
    birthDate ? moment().diff(birthDate, 'years', false) : false;

  const openCamera = async () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        try {
          const r = updateEmployeePhoto(response.assets[0]);
          setMe(r.data);
        } catch (e) {
          console.log('updateEmployeePhoto err: ', e);
        }
      }
    });
  };

  const openGallery = async () => {
    let options = {
      storageOption: {
        path: 'images',
        skipBackup: true,
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        try {
          const r = updateEmployeePhoto(response.assets[0]);
          setMe(r.data);
        } catch (e) {
          console.log('updateEmployeePhoto err: ', e);
        }
      }
    });
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const res = await getEmployee();
          setMe(res.data);
          setLoading(false);
        } catch (e) {
          console.log('ProfileScreen err: ', e);
        }
      });
    }
    fetchData();
  }, [navigation]);

  if (loading) {
    return (
      <View style={globalStyles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Modal visible={open} animationType="slide" transparent={true}>
          <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
            <View style={styles.wrap}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  openGallery();
                  setOpen(false);
                }}>
                <Text style={globalStyles.text}>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  openCamera();
                  setOpen(false);
                }}>
                <Text style={globalStyles.text}>Open Camera</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

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
              navigation.navigate('ProfileEditScreen', {
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
          <TouchableOpacity style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>Контактная поддержка</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.listItem]}>
            <Text style={styles.listItemTitle}>Вопросы и ответы</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemTitle}>Уведомления</Text>
            <Switch
              trackColor={{
                false: PrimaryColors.grey3,
                true: '#5CC689',
              }}
              thumbColor={PrimaryColors.white}
              ios_backgroundColor={PrimaryColors.grey3}
              onValueChange={toggleNotification}
              value={isNotification}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.list, styles.marginBottom]}>
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
                  styles.marginLeft,
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
  marginLeft: {
    marginLeft: 8,
  },
  marginBottom: {
    marginBottom: padding,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrap: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: PrimaryColors.white,
  },
  item: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
