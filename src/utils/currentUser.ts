import { useAppSelector } from '../app/hooks';

export const findCurretUser = (username: string) => {
  const { currentUser } = useAppSelector(state => state.comments);

  if (currentUser === username) {
    return currentUser;
  }
};
