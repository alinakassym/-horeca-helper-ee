import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import {postJobApply} from '../../services/JobsService';
import {BottomModal} from './components/BottomModal';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {getChatsLookup} from '../../services/ChatService';
import Header from '../../components/Header';
import {globalStyles} from '../../styles/globalStyles';
import CompanyCard from './components/CompanyCard';
import CompanyInfo from './components/CompanyInfo';
import {PrimaryColors} from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import {IconMessages} from '../../assets/icons/tabs/IconMessages';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import * as ResumesService from '../../services/ResumesService';

const dimensions = Dimensions.get('screen');

export const JobScreen = ({route, navigation}) => {
  const jobParams = route.params ? route.params.job : null;

  const [chatId, setChatId] = useState(null);
  const [job] = React.useState(jobParams);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [applyMessage, setApplyMessage] = useState();

  const sendApply = async () => {
    // TODO: unhardcode & let user select via UI
    const myResumesData = await ResumesService.getMy();

    const id = job.id;
    const data = {
      resumeId: myResumesData[0]?.id,
      body: applyMessage,
    };

    console.log({
      id: id,
      data: data,
    });

    await postJobApply(id, data);
    setVisible(false);

    const chatLookup = await getChatsLookup(job?.company?.id);
    setChatId(chatLookup);
  };

  const isValid = () => {
    return applyMessage && applyMessage.length > 0;
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const companyId = job?.company?.id;
          const chatLookup = await getChatsLookup(companyId);
          setChatId(chatLookup);
          setLoading(false);
        } catch (e) {
          console.log('fetch err: ', e);
        }
      });
    }
    fetchData();
  }, [job, navigation]);

  if (loading) {
    return (
      <View style={globalStyles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'Подробная информация'}
      />
      <CompanyCard
        photoUrl={job?.company?.photoUrl}
        title={job?.company?.title}
      />
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <CompanyInfo
          avgAvgScore={job?.company?.avgAvgScore}
          position={job?.position?.title_ru}
          location={job.company.address}
          salaryMin={job.salaryMin}
          salaryMax={job.salaryMax}
        />
        <View style={globalStyles.card}>
          <Text style={styles.title}>Требования</Text>
          <Text style={styles.text}>{job.description}</Text>
        </View>
      </KeyboardAwareScrollView>

      <BottomModal
        visible={visible}
        onClose={() => setVisible(false)}
        text={applyMessage}
        onSend={() => sendApply()}
        isValid={isValid()}
        onChangeText={val => setApplyMessage(val)}
      />

      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.2)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 1)',
        ]}
        style={styles.btnSection}>
        {chatId ? (
          <View style={styles.row}>
            <View style={styles.leftCol}>
              <GradientButton
                onPress={() => setVisible(true)}
                label={'Откликнуться'}
              />
            </View>
            <View style={styles.rightCol}>
              <PrimaryButton
                label={'Чат'}
                color={PrimaryColors.element}
                onPress={() =>
                  navigation.navigate('MessagesChatScreen', {
                    chatId: chatId,
                    company: job.company,
                  })
                }>
                <IconMessages size={12.67} color={PrimaryColors.white} />
              </PrimaryButton>
            </View>
          </View>
        ) : (
          <GradientButton
            onPress={() => setVisible(true)}
            label={'Откликнуться'}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const width = dimensions.width;

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  row: {
    flexDirection: 'row',
  },
  leftCol: {
    width: width - 190,
  },
  rightCol: {
    marginLeft: 8,
    width: 142,
  },
  btnSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 3,
  },
});

export default JobScreen;
