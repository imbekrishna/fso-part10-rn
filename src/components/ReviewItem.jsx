import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import theme from '../theme';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    columnGap: 15,
    backgroundColor: 'white',
  },
  reviewBadge: {
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.primary,
    borderRadius: 100,
    borderWidth: 2,
    marginRight: 10,
  },
  contentContainer: {
    display: 'flex',
    rowGap: 8,
    flex: 1,
  },
  ratingStyle: {
    color: theme.colors.primary,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewBadge}>
        <Text style={styles.ratingStyle} fontSize="heading" fontWeight="bold">
          {review.rating}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text fontSize="heading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text color="textSecondary" fontSize="subheading">
          {format(Date.parse(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text fontSize="body">{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
