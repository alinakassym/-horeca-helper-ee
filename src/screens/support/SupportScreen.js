import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Dimensions,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconWhatsApp} from '../../assets/icons/main/IconWhatsApp';

// components
import Header from '../../components/Header';

// services
import {getConfigs} from '../../services/UtilsService';

const dimensions = Dimensions.get('screen');

export const SupportScreen = ({navigation}) => {
  const [config, setConfig] = useState();

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const configData = await getConfigs('support');
        setConfig(configData);
      } catch (e) {
        console.log('SupportScreen err: ', e);
      }
    });
  }, [navigation]);
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
          <Text style={styles.phoneNumber}>{config?.value}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (config.value) {
              Linking.openURL(
                `https://wa.me/${config.value.substr(1, config.value.length)}`,
              ).then(() => {});
            }
          }}
          activeOpacity={0.7}
          style={styles.btn}>
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
    width: width - 160,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    width: 120,
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
