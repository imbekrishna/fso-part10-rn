import { useQuery } from '@apollo/client';
import React from 'react';
import { Text, View } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

import * as Linking from 'expo-linking';

const RepositoryDetail = () => {
  const params = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: params.repoId,
    },
  });

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <RepositoryItem
        item={data.repository}
        showOpen={true}
        handleOpen={() => {
          Linking.openURL(data.repository.url);
        }}
      />
    </View>
  );
};

export default RepositoryDetail;
