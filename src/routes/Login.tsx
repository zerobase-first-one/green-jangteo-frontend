import styled from "styled-components";
import Header from "../components/Header";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constant/union";
import { useSetRecoilState } from "recoil";
import { tokenState, userIdState } from "../store/atom/auth";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 430px;
  height: 800px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 42px;
  margin: 54px 0px;
`;

const Form = styled.form``;

const Input = styled.input`
  width: 370px;
  height: 38px;
  margin: 10px 30px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  &.login-btn {
    margin-top: 53px;
    margin-bottom: 20px;
    background-color: #16a114;
    color: white;
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

interface LoginProps {
  emailOrUsername: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUserId = useSetRecoilState(userIdState);
  const setToken = useSetRecoilState(tokenState);

  const login = async ({ emailOrUsername, password }: LoginProps) => {
    const data = { emailOrUsername, password };
    await axios
      .post(`${BASE_URL}/users/login`, data)
      .then((response) => {
        const { token, id } = response.data;
        console.log(response);
        console.log(token);
        console.log(id);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setToken(token);
        setUserId(id);
      })
      .catch((e) => {
        console.error("Login Error:", e);
        throw e;
      });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || emailOrUsername === "" || password === "") return;
    try {
      await login({ emailOrUsername, password });
      setLoading(true);
      navigate("/");
    } catch (e) {
      setError("입력하신 정보가 일치하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "emailOrUsername") {
      setEmailOrUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // useEffect(() => {
  //   if (token !== null) {
  //     navigate("/");
  //   }
  // }, [navigate, token]);

  return (
    <Wrapper>
      <Header />
      <Title>로그인</Title>
      {error !== "" ? <Error>{error}</Error> : null}
      <Form onSubmit={onSubmit}>
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
          value={isLoading ? "로그인 중..." : "로그인하기"}
        />
        <CreateAccount>
          <Link to={"/users/signup"}>
            <div>그린장터 가입하기 &rarr;</div>
          </Link>
        </CreateAccount>
      </Form>
    </Wrapper>
  );
}
