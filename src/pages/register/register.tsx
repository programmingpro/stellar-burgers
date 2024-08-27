import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { getError, signUp } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getError);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data: TRegisterData = {
      name: userName,
      password: password,
      email: email
    };
    dispatch(signUp(data));
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
