import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  tabStyle: {
    color: 'white',
    marginRight: 10,
  },
});

const AppBar = () => {
  const data = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken('auth:accessToken');
    client.resetStore();
  };

  if (data.loading) {
    return;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text fontWeight="bold" fontSize="heading" style={styles.tabStyle}>
            Repositories
          </Text>
        </Link>
        <Link to="/review">
          <Text fontWeight="bold" fontSize="heading" style={styles.tabStyle}>
            Create a review
          </Text>
        </Link>
        {data.data.me !== null ? (
          <SignOutButton signOut={signOut} />
        ) : (
          <Link to="/signin">
            <Text fontWeight="bold" fontSize="heading" style={styles.tabStyle}>
              Sign in
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export const SignOutButton = ({ signOut }) => {
  return (
    <Pressable onPress={signOut}>
      <Text fontWeight="bold" fontSize="heading" style={styles.tabStyle}>
        Sign Out
      </Text>
    </Pressable>
  );
};

export default AppBar;
