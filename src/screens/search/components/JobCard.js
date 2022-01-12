import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';

// styles
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors} from '../../../styles/colors';

// icons
import {IconBuilding} from '../../../assets/icons/main/IconBuilding';
import {IconAddress} from '../../../assets/icons/main/IconAddress';
import {IconBookmark} from '../../../assets/icons/main/IconBookmark';
import {IconChecked} from '../../../assets/icons/main/IconChecked';

// components
import RatingScale from '../../../components/RatingScale';
import GradientButton from '../../../components/buttons/GradientButton';
import SmallBadge from '../../../components/SmallBadge';
import OutlineButton from '../../../components/buttons/OutlineButton';
import ActivePoint from '../../../components/ActivePoint';
import UpdatedAt from '../../../components/UpdatedAt';

// utils
import {numberWithSpaces} from '../../../utils/common';

const dimensions = Dimensions.get('screen');

const propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  onSendApply: PropTypes.func,
};

class JobCard extends React.PureComponent {
  render() {
    const {item, onPress, onSendApply} = this.props;
    const getSalary = (salaryMin, salaryMax) => {
      if (salaryMin && salaryMax) {
        return `${numberWithSpaces(salaryMin)} - ${numberWithSpaces(
          salaryMax,
        )}`;
      } else if (salaryMin) {
        return `от ${numberWithSpaces(salaryMin)}`;
      }
      return `до ${numberWithSpaces(salaryMax)}`;
    };
    return (
      <React.Fragment>
        <Pressable style={globalStyles.card} onPress={onPress}>
          {/* Position title & company name, address, photo */}
          <View style={[styles.row, styles.mb2]}>
            <View style={styles.leftCol}>
              <View style={styles.row}>
                <Text style={styles.positionTitle}>
                  {item?.position?.title_ru}
                </Text>
                <SmallBadge
                  style={styles.smallBadge}
                  text={'TOP'}
                  color={'#9B51E0'}
                />
              </View>
              <View style={[styles.row, styles.alignCenter]}>
                <IconBuilding color={PrimaryColors.grey1} size={16} />
                <Text style={[styles.text, globalStyles.ml2]}>
                  {item.company.title}
                </Text>
              </View>
              <View style={[styles.row, styles.alignCenter]}>
                <IconAddress color={PrimaryColors.grey1} size={16} />
                <Text numberOfLines={1} style={[styles.text, globalStyles.ml2]}>
                  {item?.city?.title_ru}
                </Text>
              </View>
            </View>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{uri: item.company.photoUrl}}
              />
              {item.company.isActive && <ActivePoint style={styles.isActive} />}

              <View style={styles.iconChecked}>
                {item.company.verificationStatus === 'VERIFIED' && (
                  <IconChecked size={24} />
                )}
              </View>
            </View>
          </View>

          {/* Salary & company avgAvgScore */}
          <View
            style={[
              styles.row,
              styles.alignCenter,
              styles.justifyBetween,
              globalStyles.mb3,
            ]}>
            <Text style={styles.salary}>
              {getSalary(item.salaryMin, item.salaryMax)} ₸
            </Text>
            <RatingScale score={Math.ceil(item.company.avgAvgScore)} />
          </View>

          {/* Description */}
          <Text style={[styles.text, globalStyles.mb6]}>
            {item.description}
          </Text>

          {/* Apply job & save buttons */}
          <View style={[styles.row]}>
            <GradientButton
              onPress={() => onSendApply(item)}
              style={{width: width - 196}}
              label={'Откликнуться'}
            />
            <OutlineButton
              style={styles.outlineBtn}
              labelStyle={styles.outlineBtnLabel}
              label={'В избранные'}>
              <IconBookmark width={1.7} size={16} color={PrimaryColors.brand} />
            </OutlineButton>
          </View>
        </Pressable>

        {/* Updated at */}
        <UpdatedAt date={item.updatedAt} />
      </React.Fragment>
    );
  }
}

const width = dimensions.width;
const imageSize = 80;
const padding = 20;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  leftCol: {
    width: width - imageSize - padding * 2 - 8,
  },
  imageWrapper: {
    position: 'relative',
    marginLeft: 8,
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: imageSize,
    overflow: 'hidden',
  },
  iconChecked: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  isActive: {
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  positionTitle: {
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  salary: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    lineHeight: 24,
    color: PrimaryColors.element,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
  smallBadge: {marginLeft: 8},
  outlineBtn: {marginLeft: 8, width: 148},
  outlineBtnLabel: {marginLeft: 4},
});

JobCard.propTypes = propTypes;
export default JobCard;
