import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import Header from '../../components/Header';
import {IconWhatsApp} from '../../assets/icons/main/IconWhatsApp';
import {PrimaryColors} from '../../styles/colors';

const dimensions = Dimensions.get('screen');

export const SupportScreen = ({navigation}) => {
  const phone = '+7 (747) 414-47-14';
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'Контактная поддержка'}
      />
      <View style={[globalStyles.card, styles.row]}>
        <View style={styles.phone}>
          <IconWhatsApp />
          <Text style={styles.phoneNumber}>{phone}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
          <Text style={styles.btnText}>Перейти в чат</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const width = dimensions.width;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phone: {
    width: width - 140,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 100,
  },
  btnText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.brand,
  },
  phoneNumber: {
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    color: '#25D366',
  },
});
