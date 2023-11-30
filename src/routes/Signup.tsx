import { useForm } from "react-hook-form";
import styled from "styled-components";
import Header from "../components/Header";
import axios from "axios";

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 370px;
  height: 38px;
  margin: 10px 30px;
  border-radius: 6px;
  border: none;
  background-color: #d9d9d9;
  &.signin-btn {
    margin-top: 53px;
    background-color: #16a114;
    color: white;
    height: 48px;
    font-size: 16px;
    cursor: pointer;
  }
`;

const Error = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: tomato;
`;

interface IForm {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  userAddress: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = async (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      return setError(
        "passwordConfirm",
        { message: "비밀번호가 일치하지 않습니다" },
        { shouldFocus: true }
      );
    }

    try {
      const response = await axios.post(
        `https://221a0901-f1cb-4b6b-9d22-44830818381a.mock.pstmn.io/users/signup`,
        {
          username: data.username,
          password: data.password,
          email: data.email,
          userAddress: data.userAddress,
        }
      );
      console.log("회원가입 성공", response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <Header />
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("username", { required: "아이디를 입력해주세요" })}
          placeholder="아이디"
        />
        <Error>{errors?.username?.message}</Error>
        <Input
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 입력해주세요",
            },
          })}
          placeholder="비밀번호"
        />
        <Error>{errors?.password?.message}</Error>
        <Input
          {...register("passwordConfirm", {
            required: "비밀번호를 다시 한번 입력해주세요",
            minLength: {
              value: 8,
              message: "비밀번호를 8자 이상 입력해주세요",
            },
          })}
          placeholder="비밀번호 확인"
        />
        <Error>{errors?.passwordConfirm?.message}</Error>
        <Input
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "@naver.com 이메일을 사용해주세요",
            },
          })}
          placeholder="이메일@naver.com"
        />
        <Error>{errors?.email?.message}</Error>
        <Input
          {...register("userAddress", { required: "주소를 입력해주세요" })}
          placeholder="주소"
        />
        <Error>{errors?.userAddress?.message}</Error>
        <Input className="signin-btn" type="submit" value="회원가입하기" />
      </Form>
    </Wrapper>
  );
}
