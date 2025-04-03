import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userData = useSelector((store) => store.user.user);
  const userName = userData ? userData.name : '';
  return <AppHeaderUI userName={userName} />;
};
