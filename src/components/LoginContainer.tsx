import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { roleState, tokenState, userIdState } from '../store/atom/auth';
import { postUserLogin } from '../apiFetcher/user/postUserLogin';
import { userDataState } from '../store/atom/userDataState';
import { AxiosError } from 'axios';

export default function LoginContainer() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setUserId = useSetRecoilState(userIdState);
  const setToken = useSetRecoilState(tokenState);
  const setRoles = useSetRecoilState(roleState);
  const [userInfo, setUserInfo] = useRecoilState(userDataState);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || emailOrUsername === '' || password === '') return;
    try {
      const { token, userId, roleDescriptions } = await postUserLogin({
        emailOrUsername,
        password,
      });
      setUserId(userId);
      setToken(token);
      setRoles(roleDescriptions);
      setUserInfo(userInfo);
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'emailOrUsername') {
      setEmailOrUsername(value);
      setError('');
    } else if (name === 'password') {
      setPassword(value);
      setError('');
    }
  };

  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [navigate, token]);

  return (
    <Form onSubmit={onSubmit}>
      {error !== '' ? <Error>{error}</Error> : null}
      <Input
        onChange={onChange}
        value={emailOrUsername}
        name="emailOrUsername"
        placeholder="이메일 또는 아이디"
        type="text"
        required
      />
      <Input
        onChange={onChange}
        value={password}
        name="password"
        placeholder="비밀번호"
        type="password"
        minLength={8}
        required
      />
      <Input
        className="login-btn"
        type="submit"
        value={isLoading ? '로그인 중...' : '로그인하기'}
      />
      <CreateAccount>
        <Link to={'/users/signup'}>
          <div>그린장터 가입하기 &rarr;</div>
        </Link>
      </CreateAccount>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 50%;
  height: 38px;
  margin: 10px 30px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  &.login-btn {
    margin-top: 53px;
    margin-bottom: 20px;
    background-color: #16a114;
    color: #ffffff;
    height: 48px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const CreateAccount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  font-size: 14px;
  div {
    margin: 5px;
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;
