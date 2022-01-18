import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// components
import Header from '../../components/Header';
import RatingScale from './components/RatingScale';
import MultilineInput from '../../components/MultilineInput';
import DisabledButton from '../../components/buttons/DisabledButton';
import GradientButton from '../../components/buttons/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import lodash from 'lodash';

// services
import {sendCompanyReview} from '../../services/EmployeesService';

export const CompanyReviewScreen = ({route, navigation}) => {
  const workId = route.params.id;
  console.log({workId});

  const [isFocused, setIsFocused] = useState(false);
  const [valid, setValid] = useState(false);
  const [comment, setComment] = useState('');
  const [review, setReview] = useState({
    managementScore: null,
    conditionsScore: null,
    teamScore: null,
    paymentsScore: null,
  });

  const sendReview = async () => {
    const data = {...review, comment: comment};
    await sendCompanyReview(workId, data);
    navigation.navigate('MyExperience');
  };

  useEffect(() => {
    setValid(lodash.every(Object.values(review), val => val && val > 0));
  }, [review]);

  return (
    <SafeAreaView
      style={[globalStyles.container, styles.companyReviewContainer]}>
      <Header
        modal
        onClose={() => navigation.goBack()}
        title={'Оценка заведения'}
      />
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <RatingScale
          title={'Добропорядочность руководства'}
          score={review.conditionsScore}
          onPress={val =>
            setReview({
              ...review,
              conditionsScore: val,
            })
          }
        />
        <RatingScale
          title={'Условия труда'}
          score={review.managementScore}
          onPress={val =>
            setReview({
              ...review,
              managementScore: val,
            })
          }
        />
        <RatingScale
          title={'Атмосфера в команде'}
          score={review.teamScore}
          onPress={val =>
            setReview({
              ...review,
              teamScore: val,
            })
          }
        />
        <RatingScale
          title={'Своевременная оплата'}
          score={review.paymentsScore}
          onPress={val =>
            setReview({
              ...review,
              paymentsScore: val,
            })
          }
        />

        <MultilineInput
          style={globalStyles.section}
          label={'Комментарий'}
          value={comment}
          onChangeText={val => setComment(val)}
          marginBottom={isFocused ? 0 : 88}
          onInputFocus={val => {
            setIsFocused(val);
          }}
        />
      </KeyboardAwareScrollView>
      {!isFocused && !valid && (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.btnSection}>
          <DisabledButton label={'Поставить оценку'} />
        </LinearGradient>
      )}
      {!isFocused && valid && (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.btnSection}>
          <GradientButton
            onPress={() => sendReview()}
            label={'Поставить оценку'}
          />
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  companyReviewContainer: {
    position: 'relative',
    backgroundColor: PrimaryColors.white,
    zIndex: 1,
  },
  btnSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 88,
    zIndex: 3,
  },
});
