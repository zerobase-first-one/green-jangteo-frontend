import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { postUserSignup } from "../apiFetcher/user/postUserSignup";

interface IForm {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  phone: string;
  addressDto: {
    city: string;
    street: string;
    zipcode: string;
    detailedAddress: string;
  };
  storeName?: string;
  roles: string[];
}

export default function SignupContainer() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@abc.com",
    },
  });

  const onValid = async (data: IForm) => {
    if (data.password !== data.passwordConfirm) {
      return setError(
        "passwordConfirm",
        { message: "비밀번호가 일치하지 않습니다" },
        { shouldFocus: true },
      );
    }

    try {
      const userData = {
        username: data.username,
        fullName: data.fullName,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        email: data.email,
        phone: data.phone,
        addressDto: {
          city: data.city,
          detailedAddress: data.detailedAddress,
          street: data.street,
          zipcode: data.zipcode,
        },
        storeName: data.storeName,
        roles: [data.roles],
      };

      await postUserSignup(userData);
      alert("회원가입이 완료되었습니다.");
      navigate("/users/login");
    } catch (error) {
      console.error("에러가 발생했습니다:", error);

      if (error.response) {
        console.error("서버 응답 데이터:", error.response.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Tabs>
        <label>
          <input
            type="radio"
            {...register("roles", { required: "가입유형을 선택해주세요" })}
            value="ROLE_BUYER"
            name="roles"
          />
          구매자
        </label>
        <label>
          <input
            type="radio"
            {...register("roles", { required: "가입유형을 선택해주세요" })}
            value="ROLE_SELLER"
            name="roles"
          />
          판매자
        </label>
      </Tabs>
      <Error>{errors?.roles?.message}</Error>
      <Input
        {...register("fullName", { required: "성명을 입력해주세요" })}
        placeholder="성명"
      />
      <Error>{errors?.fullName?.message}</Error>
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
            value: /^[A-Za-z0-9._%+-]+@abc.com$/,
            message: "@abc.com 이메일을 사용해주세요",
          },
        })}
        placeholder="이메일@abc.com"
      />
      <Error>{errors?.email?.message}</Error>
      <Input
        {...register("phone", { required: "전화번호를 입력해주세요" })}
        placeholder="전화번호"
      />
      <Error>{errors?.phone?.message}</Error>
      <Input
        {...register("city", { required: "도시를 입력해주세요" })}
        placeholder="도시"
      />
      <Error>{errors?.city?.message}</Error>
      <Input
        {...register("detailedAddress", {
          required: "상세주소를 입력해주세요",
        })}
        placeholder="상세주소"
      />
      <Error>{errors?.detailedAddress?.message}</Error>
      <Input
        {...register("street", { required: "도로명을 입력해주세요" })}
        placeholder="도로명"
      />
      <Error>{errors?.street?.message}</Error>
      <Input
        {...register("zipcode", { required: "우편번호를 입력해주세요" })}
        placeholder="우편번호"
      />
      <Error>{errors?.zipcode?.message}</Error>
      <Input
        {...register("storeName", { required: false })}
        placeholder="상점명 (판매자로 가입할 경우 필수 입력)"
      />
      <Error>{errors?.storeName?.message}</Error>
      <Input className="signin-btn" type="submit" value="회원가입하기" />
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tabs = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;

  label {
    margin-right: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    input {
      margin-right: 8px;
    }
  }
`;

const Input = styled.input`
  width: 50%;
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
