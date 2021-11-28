import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {IconChecked} from '../../assets/icons/main/IconChecked';
import moment from 'moment';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {getEmployee, sendCompanyReview} from '../../services/EmployeesService';
import {EmployeeReview} from './EmployeeReview';
import {CompanyReview} from './CompanyReview';
import {globalStyles} from '../../styles/globalStyles';

const dimensions = Dimensions.get('screen');

export const ProfileWorkScreen = ({route, navigation}) => {
  const workId = route.params.id;

  const [item, setItem] = useState();
  const [companyReview, setCompanyReview] = useState({
    managementScore: null,
    conditionsScore: null,
    teamScore: null,
    paymentsScore: null,
    comment: null,
  });
  const [loading, setLoading] = useState(true);

  const getNumber = val => {
    return val.length > 0 ? Number(val) : null;
  };

  const getString = val => {
    return val ? val.toString() : null;
  };

  const save = async () => {
    try {
      setLoading(true);
      await sendCompanyReview(workId, companyReview);
      const res = await getEmployee();
      const work = res.data.works.filter(el => el.id === workId);
      setItem(work[0]);
      setLoading(false);
    } catch (e) {
      console.log('sendCompanyReview err: ', e);
    }
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const res = await getEmployee();
          const work = res.data.works.filter(el => el.id === workId);
          setItem(work[0]);
          setLoading(false);
        } catch (e) {
          console.log('ProfileWorkScreen err: ', e);
        }
      });
    }
    fetchData();
  }, [navigation, workId]);

  if (loading) {
    return (
      <View style={styles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={[styles.section, styles.row]}>
        <View style={styles.leftCol}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{uri: item.company.photoUrl}} />
            {item.isConfirmed && (
              <View style={styles.iconWrapper}>
                <IconChecked color={'#185AB7'} size={18} />
              </View>
            )}
          </View>
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.title}>{item.position.title}</Text>
          <Text style={styles.text}>{item.company.title}</Text>
          {item.startDate && (
            <Text>
              {moment(item.startDate).format('MMM YYYY')}{' '}
              {item.endDate
                ? `- ${moment(item.endDate).format('MMM YYYY')}`
                : ''}
            </Text>
          )}
        </View>
      </View>

      {!!item.description && (
        <View style={[styles.section, styles.row]}>
          <View style={styles.flexWrap}>
            <Text textBreakStrategy={'simple'} style={styles.text}>
              <Text style={styles.textBold}>Description: </Text>
              {item.description}
            </Text>
          </View>
        </View>
      )}

      {!item.isConfirmed && (
        <View style={[styles.section, styles.row]}>
          <View style={styles.col}>
            <PrimaryButton
              label={'Edit'}
              onPress={() =>
                navigation.navigate('EditWorkScreen', {value: item})
              }
            />
          </View>
        </View>
      )}

      {item.employeeReview && <EmployeeReview item={item.employeeReview} />}

      {item.companyReview ? (
        <CompanyReview item={item.companyReview} />
      ) : (
        <View style={[styles.section, styles.col]}>
          <Text style={[styles.title, styles.textBold]}>Company Review</Text>

          <Text style={globalStyles.label}>Management: </Text>
          <TextInput
            keyboardType={'number-pad'}
            style={[globalStyles.primaryInput]}
            onChangeText={val => {
              setCompanyReview({
                ...companyReview,
                managementScore: getNumber(val),
              });
            }}
            value={getString(companyReview.managementScore)}
          />
          <Text style={globalStyles.label}>Conditions: </Text>
          <TextInput
            keyboardType={'number-pad'}
            style={[globalStyles.primaryInput]}
            onChangeText={val => {
              setCompanyReview({
                ...companyReview,
                conditionsScore: getNumber(val),
              });
            }}
            value={getString(companyReview.conditionsScore)}
          />
          <Text style={globalStyles.label}>Team: </Text>
          <TextInput
            keyboardType={'number-pad'}
            style={[globalStyles.primaryInput]}
            onChangeText={val => {
              setCompanyReview({...companyReview, teamScore: getNumber(val)});
            }}
            value={getString(companyReview.teamScore)}
          />
          <Text style={globalStyles.label}>Payments: </Text>
          <TextInput
            keyboardType={'number-pad'}
            style={[globalStyles.primaryInput]}
            onChangeText={val => {
              setCompanyReview({
                ...companyReview,
                paymentsScore: getNumber(val),
              });
            }}
            value={getString(companyReview.paymentsScore)}
          />

          <Text style={globalStyles.label}>Comment:</Text>
          <TextInput
            multiline={true}
            style={[globalStyles.primaryInput, globalStyles.multiline]}
            onChangeText={val => {
              setCompanyReview({...companyReview, comment: val});
            }}
            value={companyReview.comment}
          />
          <View style={styles.btnSection}>
            <PrimaryButton label={'Save'} onPress={() => save()} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const imageSize = dimensions.width * 0.16;

const styles = StyleSheet.create({
  section: {
    paddingTop: 16,
    paddingHorizontal: 16,
    width: dimensions.width,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    width: '100%',
    flexDirection: 'column',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  leftCol: {
    width: imageSize + 16,
    flexDirection: 'column',
  },
  rightCol: {
    width: dimensions.width - imageSize - 50,
  },

  imageWrapper: {
    position: 'relative',
    marginRight: 16,
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: imageSize,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginBottom: 16,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    color: '#000000',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 6,
    fontSize: 16,
    color: '#000000',
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
  },
  btnSection: {
    marginBottom: 42,
  },
});
