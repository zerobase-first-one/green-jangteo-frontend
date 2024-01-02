import customAxios from '../../apiFetcher/customAxios';
import { useForm } from 'react-hook-form';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';

interface FormValue {
  amount: number;
  couponName: string;
  description: string;
  expirationPeriod: number;
  issueQuantity: number;
  scheduledIssueDate: string;
}

const CreateCoupon = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const navigate = useNavigate();
  const onReset = () => {
    navigate(-1);
  };

  const userId = useRecoilValue(userIdState);
  useEffect(() => {
    customAxios
      .get(`/coupons`, { params: { userId: userId } })
      .then(response => console.log(response))
      .catch(err => console.log(err.message));
  });

  const onSubmit = (data: FormValue) => {
    customAxios
      .post(`/coupons`, {
        amount: data.amount,
        couponName: data.couponName,
        description: data.description,
        expirationPeriod: data.expirationPeriod,
        issueQuantity: data.issueQuantity,
        scheduledIssueDate: data.scheduledIssueDate,
      })
      .then(response => {
        console.log(response);
        navigate(-1);
      })
      .catch(error => {
        console.log(error.response);
        console.log(data);
      });
  };

  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <UploadForm onSubmit={handleSubmit(onSubmit)}>
          <BtnBox>
            <Button type="reset" onClick={onReset}>
              취소
            </Button>
            <Button type="submit">쿠폰 등록</Button>
          </BtnBox>
          <>
            <Box>
              <Label htmlFor="amount">amount</Label>
              <Input
                type="text"
                id="number"
                {...register('amount', {
                  required: '상품명을 입력해주세요',
                })}
              ></Input>
            </Box>
            <Box>
              <Label htmlFor="couponName">couponName</Label>
              <Input
                type="text"
                id="couponName"
                {...register('couponName', {
                  required: '상품명을 입력해주세요',
                })}
              ></Input>
            </Box>
            <Box>
              <Label htmlFor="description">description</Label>
              <Input
                type="text"
                id="description"
                {...register('description', {
                  required: '상품명을 입력해주세요',
                })}
              ></Input>
            </Box>
            <Box>
              <Label htmlFor="expirationPeriod">expirationPeriod</Label>
              <Input
                type="number"
                id="expirationPeriod"
                {...register('expirationPeriod', {
                  required: '상품명을 입력해주세요',
                })}
              ></Input>
            </Box>
            <Box>
              <Label htmlFor="issueQuantity">issueQuantity</Label>
              <Input
                type="number"
                id="issueQuantity"
                {...register('issueQuantity', {
                  required: '상품명을 입력해주세요',
                })}
              ></Input>
            </Box>
            <Box>
              <Label htmlFor="scheduledIssueDate">scheduledIssueDate</Label>
              <Input
                type="date"
                id="scheduledIssueDate"
                {...register('scheduledIssueDate', {
                  required: '상품명을 입력해주세요',
                })}
              ></Input>
            </Box>
          </>
        </UploadForm>
      </Wrapper>
    </>
  );
};

export default CreateCoupon;

const Wrapper = styled.div`
  padding: 20px;
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0;

  &.category {
    margin-bottom: 20px;
  }
`;
const Button = styled.button`
  display: block;
  margin-left: auto;
  padding: 10px 20px;
  background-color: #dedede;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
`;
const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: auto;
  padding: 5px;
`;
const Label = styled.label`
  width: 160px;
`;
