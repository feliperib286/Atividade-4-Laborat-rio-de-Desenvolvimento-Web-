import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { addUser, removeUser } from './userSlice';

export const useUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  return {
    users,
    getUsers: () => users,
    addNewUser: (name: string) => dispatch(addUser(name)),
    deleteUser: (name: string) => dispatch(removeUser(name)),
  };
};