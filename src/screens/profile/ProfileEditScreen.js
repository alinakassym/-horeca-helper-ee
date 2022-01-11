import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {globalStyles} from '../../styles/globalStyles';

import {
  getCities,
  getGenders,
  getPositions,
  getSchedules,
} from '../../services/DictionariesService';
import {
  updateEmployee,
  updateEmployeePhoto,
} from '../../services/EmployeesService';
import Header from '../../components/Header';
import {PrimaryColors} from '../../styles/colors';
import ProfilePhoto from './components/ProfilePhoto';
import ProfilePhotoPlaceholder from './components/ProfilePhotoPlaceholder';
import ModalButton from '../../components/buttons/ModalButton';
import {StatusesColors} from '../../styles/colors';
import BottomModal from '../../components/BottomModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Input from '../../components/Input';
import {DateSelect} from '../../components/selects/DateSelect';
import Autocomplete from '../../components/selects/Autocomplete';
import {IconLocation} from '../../assets/icons/main/IconLocation';
import MultilineInput from '../../components/MultilineInput';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';

export const ProfileEditScreen = ({route, navigation}) => {
  const [me, setMe] = useState(route.params.value);
  const [cities, setCities] = useState([]);
  const [positions, setPositions] = useState([]);
  const [genders, setGenders] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [isValidFirstName, setIsValidFirstName] = useState(false);

  const [loading, setLoading] = useState(true);

  function firstNameChanged(val) {
    setIsValidFirstName(val && val.length >= 2);
    setMe({...me, firstName: val});
  }

  const save = async () => {
    if (isValidFirstName) {
      const data = {
        firstName: me.firstName,
        lastName: me.lastName,
        email: me.email,
        photoUrl: me.photoUrl,
        googleId: me.googleId,
        positionId: me.position ? me.position.id : null,
        description: me.position ? me.description : '',
        cityId: me.city ? me.city.id : null,
        birthDate: me.birthDate,
        genderId: me.gender ? me.gender.id : null,
        experience: me.experience,
        scheduleId: me.schedule ? me.schedule.id : null,
        salary: me.salary,
      };
      try {
        await updateEmployee(data);
        navigation.navigate('Profile');
      } catch (e) {
        console.log('updateEmployee err: ', e);
      }
    } else {
      Alert.alert('Warning', 'Username must be at least 2 characters');
    }
  };

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
        updateEmployeePhoto(response.assets[0])
          .then(result => {
            setMe(result.data);
          })
          .catch(err => {
            console.log('updateEmployeePhoto err: ', err);
          });
      }
    });
  };

  const getData = async () => {
    return Promise.all([
      getCities(),
      getPositions(),
      getGenders(),
      getSchedules(),
    ]);
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const [citiesData, positionsData, gendersData, schedulesData] =
          await getData();
        setCities(citiesData);
        setPositions(positionsData);
        setGenders(gendersData);
        setSchedules(schedulesData);
        setLoading(false);
      } catch (e) {
        console.log('getData err:', e);
      }
      setIsValidFirstName(me.firstName && me.firstName.length >= 2);
    });
  }, [me, navigation]);

  if (loading) {
    return (
      <View style={styles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'Профильные данные'}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        enableResetScrollToCoords={false}>
        {me?.photoUrl ? (
          <ProfilePhoto onPress={() => setOpen(true)} photoUrl={me.photoUrl} />
        ) : (
          <ProfilePhotoPlaceholder editable onPress={() => setOpen(true)} />
        )}

        {/*Имя*/}
        <Input
          label={'Имя'}
          onChangeText={val => {
            setMe({...me, firstName: val});
          }}
          onClear={() => setMe({...me, firstName: null})}
          value={me.firstName}
          onFocus={val => setIsFocused(val)}
          onBlur={val => setIsFocused(val)}
        />

        {/*Фамилия*/}
        <Input
          label={'Фамилия'}
          onChangeText={val => {
            setMe({...me, lastName: val});
          }}
          onClear={() => setMe({...me, lastName: null})}
          value={me.lastName}
          onFocus={val => setIsFocused(val)}
          onBlur={val => setIsFocused(val)}
        />

        {/*Дата рождения*/}
        <DateSelect
          label={'Дата рождения'}
          value={me}
          valueKey={'birthDate'}
          clearable
        />

        {/*Город*/}
        <Autocomplete
          label={'Город'}
          value={me.city}
          items={cities}
          itemKey={'title_ru'}
          onSelect={val => setMe({...me, city: val})}
          onClear={val => setMe({...me, city: null})}
          validIcon={<IconLocation size={16} color={PrimaryColors.brand} />}
        />

        {/*Эл. почта*/}
        <Input
          keyboardType={'email-address'}
          label={'Эл. почта'}
          onChangeText={val => {
            setMe({...me, email: val});
          }}
          onClear={() => setMe({...me, email: null})}
          value={me.email}
          onFocus={val => setIsFocused(val)}
          onBlur={val => setIsFocused(val)}
        />

        {/*Описание*/}
        <MultilineInput
          label={'Обо мне'}
          value={me.description}
          onChangeText={val => {
            setMe({...me, description: val});
          }}
          marginBottom={70}
          onInputFocus={val => {
            setIsFocused(val);
          }}
        />
      </KeyboardAwareScrollView>
      {!isFocused && (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.btn}>
          <GradientButton label={'Save'} onPress={() => save()} />
        </LinearGradient>
      )}
      <BottomModal visible={open} onCancel={() => setOpen(false)}>
        <ModalButton
          divide
          label={'Открыть галерею'}
          onPress={() => {
            openGallery().then(() => {});
            setOpen(false);
          }}
        />
        <ModalButton
          divide
          label={'Сделать снимок'}
          onPress={() => {
            openCamera().then(() => {});
            setOpen(false);
          }}
        />
        <ModalButton
          label={'Удалить фото'}
          labelColor={StatusesColors.red}
          onPress={() => {
            setOpen(false);
          }}
        />
      </BottomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: PrimaryColors.white,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
});
