import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import * as Linking from 'expo-linking';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
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

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem
        item={repository}
        showOpen={true}
        handleOpen={() => {
          Linking.openURL(repository.url);
        }}
      />
    </View>
  );
};

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

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryDetail = () => {
  const params = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: params.repoId,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const reviewNodes = data.repository
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <RepositoryInfo repository={data.repository} />
        )}
        // ...
      />
    </View>
  );
};

export default RepositoryDetail;
