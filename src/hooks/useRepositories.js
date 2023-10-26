import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy = 'CREATED_AT', orderDirection = 'ASC') => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderDirection: orderDirection,
      orderBy: orderBy,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return {};
  }

  return { repositories: data.repositories, loading, refetch };
};

export default useRepositories;
