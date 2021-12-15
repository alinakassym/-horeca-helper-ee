import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {IconStar} from '../../../assets/icons/main/IconStar';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  score: PropTypes.number,
  onPress: PropTypes.func,
};

class RatingScale extends React.PureComponent {
  render() {
    const {title, score, onPress} = this.props;
    const scale = [1, 2, 3, 4, 5];
    return (
      <View style={styles.section}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          {scale.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => onPress(item)}
              style={styles.icon}>
              <IconStar
                width={1.5}
                size={32}
                fillColor={
                  Number(item) <= Number(score)
                    ? StatusesColors.orange
                    : PrimaryColors.white
                }
                color={StatusesColors.orange}
              />
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    marginBottom: 12,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  icon: {
    marginRight: 8,
  },
});

RatingScale.propTypes = propTypes;
export default RatingScale;
