import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Switch,
  ActivityIndicator,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {AuthContext} from '../../store/context';
import {IconAdd} from '../../assets/icons/main/IconAdd';
import {IconComment} from '../../assets/icons/main/IconComment';
import {IconAddress} from '../../assets/icons/main/IconAddress';
import {IconMail} from '../../assets/icons/main/IconMail';
import {IconPencil} from '../../assets/icons/main/IconPencil';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  getEmployee,
  updateEmployeePhoto,
} from '../../services/EmployeesService';
import PlainButton from '../../components/buttons/PlainButton';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {WorkCard} from '../../components/works/WorkCard';
import {setFilter, setFilterApplied} from '../../store/slices/jobs';
import {useDispatch} from 'react-redux';
import {IconSearch} from '../../assets/icons/main/IconSearch';

import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  const [hhToken, setToken] = useState('');
  const [me, setMe] = useState({
    positionId: null,
    position: null,
    companyCategoryId: null,
    cityId: null,
    city: null,
    ageMin: null,
    ageMax: null,
    genderId: null,
    gender: null,
    experienceMin: null,
    experienceMax: null,
    scheduleId: null,
    salaryMin: null,
    salaryMax: null,
    sortBy: 'relevance',
    sortOrder: 'DESC',
    pageSize: 20,
    pageNum: 1,
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

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

  const logOut = () => {
    console.log('AuthContext', AuthContext);
    try {
      GoogleSignin.signOut().then(() => {});
      signOut();
    } catch (error) {
      console.error(error);
    }
  };

  // Notification
  const [isNotification, setIsNotification] = useState(false);
  const toggleNotification = () =>
    setIsNotification(previousNotificationState => !previousNotificationState);

  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };

  const openCamera = () => {
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
        updateEmployeePhoto(response.assets[0], hhToken).then(r => {
          setMe(r.data);
        });
      }
    });
  };

  const openGallery = () => {
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
        updateEmployeePhoto(response.assets[0], hhToken).then(r => {
          setMe(r.data);
        });
      }
    });
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        const token = await AsyncStorage.getItem('hhToken');
        setToken(token);
        getEmployee(token)
          .then(res => {
            // console.log('ProfileScreen employee/me:', res.data);
            setMe(res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error('ProfileScreen error');
            console.log(err);
          });
      });
    }
    fetchData();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
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
      <View style={styles.profilePhoto}>
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: me.photoUrl}} />
        </TouchableOpacity>
      </View>

      {/*About*/}
      <Text style={styles.label}>About</Text>
      <View style={styles.block}>
        <View style={[styles.row, styles.spaceBetween, styles.paddingBottom0]}>
          <Text style={styles.text}>
            {me.firstName || 'Is not entered'} {me.lastName || ''}
            {me.birthDate && <Text>, {getAge(me.birthDate)} y.o.</Text>}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileEditScreen', {
                value: me,
              });
            }}>
            <IconPencil color={'#767676'} size={24} width={1.5} />
          </TouchableOpacity>
        </View>

        {(me.position || me.gender || me.schedule) && (
          <View style={[styles.row, styles.paddingTop0, styles.paddingBottom0]}>
            {me.position && <Text>{me.position.title}</Text>}
            {me.position && me.schedule && <Text>, </Text>}
            {me.schedule && <Text>{me.schedule.title}</Text>}
            {me.schedule && me.gender && <Text>, </Text>}
            {me.gender && <Text>{me.gender.title}</Text>}
          </View>
        )}

        {me.salary && (
          <View style={styles.row}>
            <Text style={styles.text}>{me.salary.toString()} KZT</Text>
          </View>
        )}

        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <IconAddress color={'#767676'} size={24} width={1.5} />
          </View>
          {me.city ? (
            <Text style={styles.text}>{me.city.title}</Text>
          ) : (
            <Text>Is not entered</Text>
          )}
        </View>

        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <IconMail color={'#767676'} size={24} width={1.5} />
          </View>
          <Text style={styles.text}>{me.email}</Text>
        </View>

        <View style={[styles.row, styles.descriptionSection]}>
          <View style={styles.iconWrapper}>
            <IconComment color={'#767676'} size={24} width={1.5} />
          </View>
          <View style={styles.description}>
            <Text style={styles.text}>{me.description || 'About me ...'}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <IconSearch color={'#185AB7'} size={24} width={2} />
          </View>
          <PlainButton
            label={'Find relevant jobs'}
            onPress={() =>
              apply().then(() => {
                navigation.navigate('Jobs');
              })
            }
          />
        </View>
      </View>

      {/*Works*/}
      <Text style={styles.label}>Past Experience</Text>

      {/*Works*/}
      <View style={styles.block}>
        <View style={[styles.row, styles.spaceBetween]}>
          <PlainButton
            onPress={() => {
              navigation.navigate('AddWorkScreen');
            }}
            label={'Add work experience'}>
            <View style={styles.btnIcon}>
              <IconAdd color={'#185AB7'} size={24} width={2} />
            </View>
          </PlainButton>
        </View>
        <View style={styles.column}>
          {me.works.map((item, index) => (
            <View key={index}>
              <View style={styles.divider} />
              <WorkCard
                item={item}
                onPress={() => {
                  navigation.navigate('EditWorkScreen', {value: item});
                }}
              />
            </View>
          ))}
        </View>
      </View>

      {/*Settings*/}
      <Text style={styles.label}>Settings</Text>

      {/*Notification*/}
      <View style={styles.block}>
        <View style={[styles.row, styles.spaceBetween]}>
          <Text style={styles.text}>Push notifications</Text>
          <View>
            <Switch
              trackColor={{false: '#AAAAAA', true: '#4136F1'}}
              thumbColor={isNotification ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotification}
              value={isNotification}
            />
          </View>
        </View>
      </View>

      {/*Support*/}
      <Text style={styles.label}>Support</Text>

      {/*Contact*/}
      <View style={styles.block}>
        <View style={[styles.row, styles.spaceBetween]}>
          <Text style={styles.text}>Contact support</Text>
        </View>
      </View>

      {/*FAQ*/}
      <View style={styles.block}>
        <View style={[styles.row, styles.spaceBetween]}>
          <Text style={styles.text}>FAQ</Text>
        </View>
      </View>

      {/*Sign Out*/}
      <Text style={styles.label}>Sign Out</Text>
      <View style={styles.block}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              logOut();
            }}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fullScreenSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: 16,
    color: '#767676',
    fontSize: 14,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    height: 30,
    width: 30,
  },
  iconWrapperStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#F1C40F',
    overflow: 'hidden',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 24,
    color: '#000000',
  },
  block: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
  },
  row: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  paddingBottom0: {
    paddingBottom: 0,
  },
  paddingTop0: {
    paddingTop: 0,
  },
  profilePhoto: {
    paddingTop: 16,
    alignItems: 'center',
  },
  imageWrapper: {
    height: 128,
    width: 128,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: '#cccccc',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  btnIcon: {
    paddingRight: 8,
  },
  divider: {
    height: 1,
    width: '100%',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
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
    backgroundColor: '#FFFFFF',
  },
  item: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionSection: {
    alignItems: 'flex-start',
  },
  description: {
    width: '90%',
  },
});
