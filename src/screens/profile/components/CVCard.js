import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

// styles
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors} from '../../../styles/colors';

// icons
import {IconSearch} from '../../../assets/icons/tabs/IconSearch';
import {IconDots} from '../../../assets/icons/main/IconDots';

// components
import ActivePoint from '../../../components/ActivePoint';
import PlainButton from '../../../components/buttons/PlainButton';
import IconButton from '../../../components/buttons/IconButton';

// utils
import {numberWithSpaces} from '../../../utils/common';
import UpdatedAt from '../../../components/UpdatedAt';

const dimensions = Dimensions.get('screen');

const propTypes = {
  position: PropTypes.string,
  salary: PropTypes.number,
  updatedAt: PropTypes.string,
  onPress: PropTypes.func,
  findRelevant: PropTypes.func,
};

class CVCard extends React.PureComponent {
  render() {
    const {position, salary, updatedAt, onPress, findRelevant} = this.props;

    return (
      <React.Fragment>
        <View style={globalStyles.card}>
          <View
            style={[
              globalStyles.row,
              globalStyles.mb6,
              globalStyles.justifySpaceBetween,
            ]}>
            <View style={styles.leftCol}>
              <View
                style={[
                  globalStyles.row,
                  globalStyles.alignCenter,
                  globalStyles.mb1,
                ]}>
                <Text style={styles.positionTitle}>
                  {position || 'Позиция не указана'}
                </Text>

                <ActivePoint style={globalStyles.ml2} />
              </View>
              <Text style={styles.salary}>
                {salary ? `${numberWithSpaces(salary)} ₸` : ''}
              </Text>
            </View>
            <IconButton onPress={onPress}>
              <IconDots />
            </IconButton>
          </View>
          <PlainButton
            onPress={findRelevant}
            label={'Найти подходящие вакансии'}
            btnStyle={styles.findBtn}>
            <IconSearch
              size={16}
              width={3}
              style={globalStyles.mr3}
              color={PrimaryColors.brand}
            />
          </PlainButton>
        </View>
        <UpdatedAt date={updatedAt} />
      </React.Fragment>
    );
  }
}

const width = dimensions.width;
const padding = 20;

const styles = StyleSheet.create({
  leftCol: {
    width: width - 48 - padding * 2,
  },
  positionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  salary: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  findBtn: {
    alignSelf: 'flex-start',
  },
});

CVCard.propTypes = propTypes;
export default CVCard;
