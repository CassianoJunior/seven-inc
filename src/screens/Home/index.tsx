import { useNavigation } from '@react-navigation/native';
import { Plus, Search } from 'lucide-react-native';
import { useCallback } from 'react';
import { Alert, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { DefaultScreen } from '../../components/DefaultScreen';
import { EmployeeCard } from '../../components/EmployeeCard';
import { useEmployeeContext } from '../../contexts/EmployeeContext';
import theme from '../../theme';
import { AddEmployee, Input, List, SearchBar, TextButton } from './styles';

const Home = () => {
  const navigation = useNavigation();

  const { employees, deleteEmployee } = useEmployeeContext();

  const handleAddEmployee = useCallback(() => {
    navigation.navigate('register');
  }, [navigation]);

  const handleDelete = (id: string) => {
    deleteEmployee(id);
    showMessage({
      message: 'Funcionário excluído com sucesso!',
      type: 'success',
      floating: true,
      titleStyle: {
        alignContent: 'center',
      },
    });
  };

  return (
    <DefaultScreen>
      <SearchBar>
        <Search color={theme.colors.gray[500]} strokeWidth={1.3} />
        <Input placeholder="Buscar pelo nome, email..." />
      </SearchBar>
      <AddEmployee onPress={handleAddEmployee}>
        <Plus color={theme.colors.gray[100]} strokeWidth={1.5} />
        <TextButton>Adicionar funcionário</TextButton>
      </AddEmployee>
      <ScrollView>
        <List>
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              name={employee.name}
              email={employee.email}
              profilePicture={employee.profilePicture}
              onPress={() =>
                navigation.navigate('details', { id: employee.id })
              }
              onLongPress={() =>
                Alert.alert('Atenção', 'Deseja excluir?', [
                  {
                    text: 'Não',
                    style: 'cancel',
                  },
                  {
                    text: 'Sim',
                    style: 'destructive',
                    onPress: () => handleDelete(employee.id),
                  },
                ])
              }
            />
          ))}
        </List>
      </ScrollView>
    </DefaultScreen>
  );
};

export { Home };
