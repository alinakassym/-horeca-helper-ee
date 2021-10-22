import React, {useState} from 'react';
import {Text, View, TextInput, ScrollView, Image, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {updateEmployee} from '../../services/EmployeesService';

export const ProfileEditScreen = ({route, navigation}) => {
  console.log('ProfileEdit Screen params', route.params)

  const [employee, setEmployee] = useState(route.params.value);

  const save = async () => {
    const hhToken = await AsyncStorage.getItem('hhToken');
    updateEmployee(employee, hhToken)
      .then(() => {
        navigation.navigate("Profile", {
          value: employee,
        });
      })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profilePhoto}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: employee.photo}} />
        </View>
      </View>

      <Text style={globalStyles.label}>Name</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setEmployee({...employee, title: val})}}
        value={employee.title}/>

      <Text style={globalStyles.label}>Address</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setEmployee({...employee, address: val})}}
        value={employee.address}/>

      <Text style={globalStyles.label}>Phone</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setEmployee({...employee, phone: val})}}
        value={employee.phone}/>

      <Text style={globalStyles.label}>E-mail</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setEmployee({...employee, email: val})}}
        value={employee.email}/>


      <PrimaryButton label={'Save'} onPress={() => save()}/>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  profilePhoto: {
    marginBottom: 24,
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
});

