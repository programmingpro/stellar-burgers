import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getError, signIn } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const localEmail = localStorage.getItem('email') ?? '';
  const error = useSelector(getError);
  const [email, setEmail] = useState(localEmail);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    dispatch(
      signIn({
        email: email,
        password: password
      })
    );
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
