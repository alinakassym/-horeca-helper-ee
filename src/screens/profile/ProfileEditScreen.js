import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

// icons
import {IconLocation} from '../../assets/icons/main/IconLocation';

// components
import Header from '../../components/Header';
import ProfilePhoto from './components/ProfilePhoto';
import ProfilePhotoPlaceholder from './components/ProfilePhotoPlaceholder';
import ModalButton from '../../components/buttons/ModalButton';
import BottomModal from '../../components/BottomModal';
import Input from '../../components/inputs/Input';
import {DateSelect} from '../../components/selects/DateSelect';
import Autocomplete from '../../components/selects/Autocomplete';
import MultilineInput from '../../components/inputs/MultilineInput';
import GradientButton from '../../components/buttons/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// services
import {
  updateEmployee,
  updateEmployeePhoto,
} from '../../services/EmployeesService';
import {getCities, getGenders} from '../../services/DictionariesService';
import ModalSelect from '../../components/selects/ModalSelect';

import i18n from '../../assets/i18n/i18n';
import {useSelector} from 'react-redux';

export const ProfileEditScreen = ({route, navigation}) => {
  const {locale} = useSelector(state => state);
  const suffix = locale.suffix;
  const titleKey = `title${suffix}`;

  const [me, setMe] = useState(route.params.value);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [isValidFirstName, setIsValidFirstName] = useState(false);

  const [loading, setLoading] = useState(true);

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
      Alert.alert(
        i18n.t('Warning'),
        i18n.t('Username must be at least 2 characters'),
      );
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
      const {error, didCancel} = response;

      if (didCancel) {
        console.log('User cancelled image picker');
      } else if (error) {
        console.log('ImagePicker Error: ', error);
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
      const {error, didCancel} = response;

      if (didCancel) {
        console.log('User cancelled image picker');
      } else if (error) {
        console.log('ImagePicker Error: ', error);
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
    return Promise.all([getCities(), getGenders()]);
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const [citiesData, gendersData] = await getData();
        setCities(citiesData);
        setGenders(gendersData);
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
        title={i18n.t('Profile information')}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        enableResetScrollToCoords={false}>
        {me?.photoUrl ? (
          <ProfilePhoto
            label={i18n.t('Change photo')}
            onPress={() => setOpen(true)}
            photoUrl={me.photoUrl}
          />
        ) : (
          <ProfilePhotoPlaceholder
            label={i18n.t('Add photo')}
            editable
            onPress={() => setOpen(true)}
          />
        )}

        {/*Имя*/}
        <Input
          label={i18n.t('First name')}
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
          label={i18n.t('Last name')}
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
          label={i18n.t('Birth date')}
          value={me}
          valueKey={'birthDate'}
          clearable
        />

        <ModalSelect
          label={i18n.t('Gender')}
          value={me.gender}
          items={genders}
          itemText={titleKey}
          onSaveSelection={val => {
            setMe({...me, gender: val});
          }}
          onClear={() => {
            setMe({...me, gender: null});
          }}
        />

        {/*Город*/}
        <Autocomplete
          label={i18n.t('City')}
          value={me.city}
          items={cities}
          itemKey={titleKey}
          onSelect={val => setMe({...me, city: val})}
          onClear={() => setMe({...me, city: null})}
          validIcon={<IconLocation size={16} color={PrimaryColors.brand} />}
        />

        {/*Эл. почта*/}
        <Input
          keyboardType={'email-address'}
          label={i18n.t('Email')}
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
          label={i18n.t('About me')}
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
          <GradientButton label={i18n.t('Save')} onPress={() => save()} />
        </LinearGradient>
      )}
      <BottomModal visible={open} onCancel={() => setOpen(false)}>
        <ModalButton
          divide
          label={i18n.t('Open gallery')}
          onPress={() => {
            openGallery().then(() => {});
            setOpen(false);
          }}
        />
        <ModalButton
          divide
          label={i18n.t('Take a photo')}
          onPress={() => {
            openCamera().then(() => {});
            setOpen(false);
          }}
        />
        <ModalButton
          label={i18n.t('Remove photo')}
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
