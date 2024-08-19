import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getError, signIn } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);

  const [email, setEmail] = useState(() => localStorage.getItem('email') ?? '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.setItem('email', email);
  }, [email]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
