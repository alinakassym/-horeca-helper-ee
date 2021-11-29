import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');

export const EmployeeReview = ({item}) => {
  const {
    avgScore,
    disciplineScore,
    communicationsScore,
    professionalismScore,
    neatnessScore,
    teamScore,
    comment,
  } = item;
  return (
    <View style={[styles.section, styles.col]}>
      <Text style={[styles.title, styles.textBold]}>Rating</Text>
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Average score: </Text>
          {avgScore}
        </Text>
      </View>
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Discipline: </Text>
          {disciplineScore}
        </Text>
      </View>
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Communications: </Text>
          {communicationsScore}
        </Text>
      </View>
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Professionalism: </Text>
          {professionalismScore}
        </Text>
      </View>
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Neatness: </Text>
          {neatnessScore}
        </Text>
      </View>
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Team: </Text>
          {teamScore}
        </Text>
      </View>
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Comment: </Text>
          {comment}
        </Text>
      </View>
    </View>
  );
};

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
  title: {
    fontFamily: 'Roboto-Medium',
    marginBottom: 4,
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
});
