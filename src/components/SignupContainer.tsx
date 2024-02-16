import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { postUserSignup } from '../apiFetcher/user/postUserSignup';
import React, { useState } from 'react';
import { AxiosError } from 'axios';
import ConfirmModal from './modal/ConfirmModal';

export interface AddressDto {
  city: string;
  detailedAddress: string;
  street: string;
  zipcode: string;
}

export interface SignupProps {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  phone: string;
  addressDto: AddressDto;
  storeName?: string;
  roles: string[];
}

export default function SignupContainer() {
  const [selectedRole, setSelectedRole] = React.useState<string>('ROLE_BUYER');
  const [showModal, setShowModal] = useState(false);
  const [err, setErr] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupProps>({
    defaultValues: {
      email: '@abc.com',
    },
  });

  const onValid = async (data: SignupProps) => {
    if (data.password !== data.passwordConfirm) {
      return setError(
        'passwordConfirm',
        { message: '비밀번호가 일치하지 않습니다' },
        { shouldFocus: true },
      );
    }

    try {
      const userData: SignupProps = {
        username: data.username,
        fullName: data.fullName,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        email: data.email,
        phone: data.phone,
        addressDto: {
          city: data.addressDto.city,
          detailedAddress: data.addressDto.detailedAddress,
          street: data.addressDto.street,
          zipcode: data.addressDto.zipcode,
        },
        storeName: data.storeName,
        roles: [selectedRole],
      };

      await postUserSignup(userData);

      setShowModal(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErr(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
        <Tabs>
          <label>
            <input
              type="radio"
              {...register('roles', { required: '가입유형을 선택해주세요' })}
              value="ROLE_BUYER"
              name="roles"
              checked={selectedRole === 'ROLE_BUYER'}
              onChange={() => setSelectedRole('ROLE_BUYER')}
            />
            구매자
          </label>
          <label>
            <input
              type="radio"
              {...register('roles', { required: '가입유형을 선택해주세요' })}
              value="ROLE_SELLER"
              name="roles"
              checked={selectedRole === 'ROLE_SELLER'}
              onChange={() => setSelectedRole('ROLE_SELLER')}
            />
            판매자
          </label>
        </Tabs>
        <Input
          {...register('fullName', { required: '성명을 입력해주세요' })}
          placeholder="성명"
        />
        <Error>{errors?.fullName?.message}</Error>
        <Input
          {...register('username', { required: '아이디를 입력해주세요' })}
          placeholder="아이디"
        />
        <Error>{errors?.username?.message}</Error>
        <Input
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            minLength: {
              value: 8,
              message: '비밀번호를 8자 이상 입력해주세요',
            },
          })}
          type="password"
          placeholder="비밀번호"
        />
        <Error>{errors?.password?.message}</Error>
        <Input
          {...register('passwordConfirm', {
            required: '비밀번호를 다시 한번 입력해주세요',
            minLength: {
              value: 8,
              message: '비밀번호를 8자 이상 입력해주세요',
            },
          })}
          type="password"
          placeholder="비밀번호 확인"
        />
        <Error>{errors?.passwordConfirm?.message}</Error>
        <Input
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@abc.com$/,
              message: '@abc.com 이메일을 사용해주세요',
            },
          })}
          placeholder="이메일@abc.com"
        />
        <Error>{errors?.email?.message}</Error>
        <Input
          {...register('phone', { required: '전화번호를 입력해주세요' })}
          placeholder="전화번호"
        />
        <Error>{errors?.phone?.message}</Error>
        <Input
          {...register('addressDto.city', { required: '도시를 입력해주세요' })}
          placeholder="도시"
        />
        <Error>{errors?.addressDto?.city?.message}</Error>
        <Input
          {...register('addressDto.detailedAddress', {
            required: '상세주소를 입력해주세요',
          })}
          placeholder="상세주소"
        />
        <Error>{errors?.addressDto?.detailedAddress?.message}</Error>
        <Input
          {...register('addressDto.street', {
            required: '도로명을 입력해주세요',
          })}
          placeholder="도로명"
        />
        <Error>{errors?.addressDto?.street?.message}</Error>
        <Input
          {...register('addressDto.zipcode', {
            required: '우편번호를 입력해주세요',
          })}
          placeholder="우편번호"
        />
        <Error>{errors?.addressDto?.zipcode?.message}</Error>
        <Input
          {...register('storeName', { required: false })}
          placeholder="상점명 (판매자로 가입할 경우 필수 입력)"
        />
        <Error>{errors?.storeName?.message}</Error>
        {err !== '' ? <Error>{err}</Error> : null}
        <Input className="signup-btn" type="submit" value="회원가입하기" />
      </Form>
      {showModal && (
        <ConfirmModal
          message="회원가입이 완료되었습니다."
          linkPath="/users/login"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
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
  &.signup-btn {
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
