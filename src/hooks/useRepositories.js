import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderDirection: orderDirection,
      orderBy: orderBy,
      searchKeyword: searchKeyword,
    },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return {};
  }

  return { repositories: data.repositories, loading, refetch };
};

export default useRepositories;
