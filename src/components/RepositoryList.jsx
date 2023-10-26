import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { Button, Menu } from 'react-native-paper';
import theme from '../theme';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  formContainer: {
    backgroundColor: theme.colors.formBackground,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background,
  },
});

const FilterHeader = ({ refetch }) => {
  const [visible, setVisible] = useState(false);
  const [buttonTitle, setButtonTitle] = useState('Latest Repositories');
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleClick = async (title, orderBy, orderDirection) => {
    setButtonTitle(title);
    closeMenu();
    await refetch({
      orderBy,
      orderDirection,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>{buttonTitle}</Button>}
      >
        <Menu.Item title="Select an item..." disabled />
        <Menu.Item
          onPress={() =>
            handleClick('Latest Repositories', 'CREATED_AT', 'DESC')
          }
          title="Latest Repositories"
        />
        <Menu.Item
          onPress={() =>
            handleClick('Highest rated repositories', 'RATING_AVERAGE', 'DESC')
          }
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => {
            handleClick('Lowest rated repositories', 'RATING_AVERAGE', 'ASC');
          }}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem key={item.id} item={item} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories, refetch } = useRepository();

  return (
    <View>
      <FilterHeader refetch={refetch} />
      <RepositoryListContainer repositories={repositories}/>
    </View>
  );
};

export default RepositoryList;
