import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');

export const CompanyReview = ({item}) => {
  const {
    avgScore,
    managementScore,
    conditionsScore,
    teamScore,
    paymentsScore,
    comment,
  } = item;
  return (
    <View style={[styles.section, styles.col]}>
      <Text style={[styles.title, styles.textBold]}>Company Review</Text>

      {/*Average score*/}
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Average score: </Text>
          {avgScore}
        </Text>
      </View>

      {/*Management*/}
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Management: </Text>
          {managementScore}
        </Text>
      </View>

      {/*Conditions*/}
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Conditions: </Text>
          {conditionsScore}
        </Text>
      </View>

      {/*Team*/}
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Team: </Text>
          {teamScore}
        </Text>
      </View>

      {/*Payments*/}
      <View style={[styles.row, styles.flexWrap]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Payments: </Text>
          {paymentsScore}
        </Text>
      </View>

      {/*Comment*/}
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
