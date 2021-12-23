import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

// styles
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';

// icons
import {IconBuilding} from '../../../assets/icons/main/IconBuilding';
import {IconCalendar} from '../../../assets/icons/main/IconCalendar';
import {IconTime} from '../../../assets/icons/main/IconTime';

// components
import LightGradientButton from '../../../components/buttons/LightGradientButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const dimensions = Dimensions.get('screen');

const propTypes = {
  item: PropTypes.object,
  edit: PropTypes.func,
  rate: PropTypes.func,
};

class ProfileWorkCard extends React.PureComponent {
  render() {
    const {item, edit, rate} = this.props;

    moment.locale('ru');
    const formattedDate = date => {
      const fd = moment(date).format('MMMM YYYY');
      return fd.slice(0, 1).toUpperCase() + fd.substr(1, fd.length - 1);
    };

    return (
      <View style={globalStyles.card}>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Text style={styles.positionTitle}>{item.position.title_ru}</Text>
            {item?.company && (
              <View style={[styles.row, styles.marginBottom]}>
                <IconBuilding
                  width={2.5}
                  size={16}
                  color={PrimaryColors.grey1}
                />
                <Text style={styles.title}>{item?.company?.title}</Text>
              </View>
            )}
            {item?.startDate && (
              <View style={[styles.row, styles.marginBottom]}>
                <IconCalendar
                  width={1.5}
                  size={16}
                  color={PrimaryColors.grey1}
                />
                <Text style={styles.title}>
                  {formattedDate(item?.startDate)}
                  {' - '}
                  {formattedDate(item?.endDate)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.imageWrapper}>
            {item?.company?.photoUrl && (
              <Image
                style={styles.image}
                source={{uri: item.company.photoUrl}}
              />
            )}
          </View>
        </View>
        {!!item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
        {!item.isConfirmed ? (
          <View style={[styles.row, styles.marginTop]}>
            <IconTime color={StatusesColors.orange} size={16} />
            <Text style={styles.statusText}>
              Ожидайте подтверждение заведения
            </Text>
          </View>
        ) : !item.companyReview ? (
          <View style={[styles.row, styles.marginTop]}>
            <View style={styles.leftCol2}>
              <LightGradientButton onPress={edit} label={'Редактировать'} />
            </View>
            <View style={styles.rightCol}>
              <PrimaryButton
                onPress={rate}
                label={'Оценить'}
                color={StatusesColors.orangeOpacity}
                labelColor={StatusesColors.orange}
              />
            </View>
          </View>
        ) : (
          <View style={styles.marginTop}>
            <LightGradientButton onPress={edit} label={'Редактировать'} />
          </View>
        )}
      </View>
    );
  }
}

const width = dimensions.width;
const imageSize = 80;

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  row: {
    width: width - 40,
    flexDirection: 'row',
  },
  marginTop: {
    marginTop: 24,
  },
  marginBottom: {
    marginBottom: 8,
  },
  leftCol: {
    width: width - imageSize - 48,
  },
  leftCol2: {
    width: width - width * 0.33 - 48,
  },
  rightCol: {
    marginLeft: 8,
    width: width * 0.33,
  },
  imageWrapper: {
    marginLeft: 8,
    height: imageSize,
    width: imageSize,
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    backgroundColor: PrimaryColors.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  positionTitle: {
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  title: {
    marginLeft: 6,
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 16,
    color: PrimaryColors.grey1,
  },
  description: {
    marginTop: 16,
    width: width - 40,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  statusText: {
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: StatusesColors.orange,
  },
});

ProfileWorkCard.propTypes = propTypes;
export default ProfileWorkCard;
