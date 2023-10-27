import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import theme from '../theme';
import ReviewItem from './ReviewItem';

export const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: theme.colors.mainBackground,
  },
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
  separator: {
    height: 10,
  },
});

const data = {
  me: {
    reviews: {
      edges: [
        {
          node: {
            id: 'bbe42984-051b-4a01-b45d-b8d29c32200c.async-library.react-async',
            user: { username: 'krishna' },
            rating: 85,
            text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
            createdAt: '2023-10-25T11:39:33.970Z',
          },
        },
        {
          node: {
            id: 'bbe42984-051b-4a01-b45d-b8d29c32200c.django.django',
            user: { username: 'krishna' },
            rating: 78,
            text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
            createdAt: '2023-10-25T11:39:33.970Z',
          },
        },
        {
          node: {
            id: 'bbe42984-051b-4a01-b45d-b8d29c32200c.jaredpalmer.formik',
            user: { username: 'krishna' },
            rating: 95,
            text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
            createdAt: '2023-10-25T11:39:33.970Z',
          },
        },
        {
          node: {
            id: 'bbe42984-051b-4a01-b45d-b8d29c32200c.rails.rails',
            user: { username: 'krishna' },
            rating: 99,
            text: 'Lorem ipsum dolor sit amet, per brute apeirian ei. Malis facilisis vel ex, ex vivendo signiferumque nam, nam ad natum electram constituto. Causae latine at sea, ex nec ullum ceteros, est ut dicant splendide. Omnis electram ullamcorper est ut.',
            createdAt: '2023-10-25T11:39:33.970Z',
          },
        },
      ],
    },
  },
};

const ItemSeparator = () => <View style={styles.separator} />;
const UserReviews = () => {
  const reviewNodes = data.me
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default UserReviews;
