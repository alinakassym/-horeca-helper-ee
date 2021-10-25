import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

export const JobCard = ({item, onPress}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.positionTitle}>{item.company.title}</Text>
      {item.salaryMin && item.salaryMax && (
        <Text>
          {item.salaryMin} - {item.salaryMax} $
        </Text>
      )}
      {item.city && <Text>{item.city.title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 4,
  },
  positionTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
});
