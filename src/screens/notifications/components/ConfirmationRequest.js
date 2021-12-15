import React from 'react';
import {Dimensions, View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors} from '../../../styles/colors';

const dimensions = Dimensions.get('screen');

const propTypes = {
  item: PropTypes.object,
};

class ConfirmationRequest extends React.PureComponent {
  render() {
    const {item} = this.props;
    const {work} = item;

    return (
      <View style={globalStyles.card}>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <View style={styles.imageWrapper}>
              <Image style={styles.img} source={{uri: work.company.photoUrl}} />
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.userName}>{work.company.title}</Text>
            <Text style={styles.text}>
              Подтвердил запрос о вашей работе в заведении
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const imageSize =
  dimensions.width * 0.15 > 60
    ? 60
    : dimensions.width * 0.15 < 52
    ? 52
    : dimensions.width * 0.15;

const pa = 20;
const leftColWidth = imageSize + 12;
const rightColWidth = dimensions.width - leftColWidth - pa * 2;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
  },
  imageWrapper: {
    height: imageSize,
    width: imageSize,
    borderWidth: 0.7,
    borderRadius: imageSize,
    borderColor: PrimaryColors.grey3,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  userName: {
    marginBottom: 6,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.grey1,
  },
  markedText: {
    lineHeight: 20,
    color: PrimaryColors.element,
  },
});

ConfirmationRequest.propTypes = propTypes;
export default ConfirmationRequest;
