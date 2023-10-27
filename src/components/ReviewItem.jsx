import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import theme from '../theme';
import { Button } from 'react-native-paper';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 15,
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

  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    columnGap: 10
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
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
      <View style={styles.actionContainer}>
        <Button
          buttonColor={theme.colors.primary}
          style={{ borderRadius: 5, paddingVertical: 5, flex: 1 }}
        >
          <Text color="textWhite" fontWeight="bold">
            View Repository
          </Text>
        </Button>
        <Button
          buttonColor={theme.colors.error}
          style={{ borderRadius: 5, paddingVertical: 5, flex: 1 }}
        >
          <Text color="textWhite" fontWeight="bold">
            Delete Review
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default ReviewItem;
