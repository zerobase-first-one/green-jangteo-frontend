import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import customAxios from '../apiFetcher/customAxios';
import HeaderPrevPageBtn from '../components/HeaderPrevPageBtn';
import { categoryList } from './categoryList';

interface formValue {
  categoryId: number;
  firstCategory: string;
  secondCategory: string;
}

const UpdateCategory = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<formValue>({
    mode: 'onSubmit',
  });

  const navigate = useNavigate();
  const onReset = () => {
    navigate(-1);
  };
  // console.log(myBucket);
  const onSubmit = async (data: formValue) => {
    await customAxios
      .put(`/category`, {
        categoryId: data.categoryId,
        firstCategory: data.firstCategory,
        secondCategory: data.secondCategory,
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
        console.log(data);
      });
  };

  useEffect(() => {
    customAxios
      .get(`/categories`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  });

  const [selectCategory, setselectCategory] = useState();
  const handleSelectInput = (e: any) => {
    setselectCategory(e.target.value);
  };

  // const [modalOpen, setModalOpen] = useState(false);

  // const showModal = () => {
  //   setModalOpen(true);
  //   uploadFile(selectedFile);
  // };

  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <UploadForm onSubmit={handleSubmit(onSubmit)}>
          <BtnBox>
            <Button type="reset" onClick={onReset}>
              취소
            </Button>
            <Button type="submit">
              {/* <Button type="button" onClick={showModal}> */}
              등록
            </Button>
            {/* {modalOpen && <UploadPageModal setModalOpen={setModalOpen} />} */}
          </BtnBox>
          <Box>
            <Label htmlFor="firstCategories">분류1 카테고리</Label>
            <Select
              id="firstCategories"
              {...register('firstCategory', {
                required: '카테고리를 지정해주세요',
                onChange: e => {
                  handleSelectInput(e);
                },
              })}
            >
              <Option value="카테고리">카테고리</Option>
              {categoryList.map(category => (
                <Option
                  value={category.firstCategoryName}
                  key={category.firstCategoryName}
                >
                  {category.firstCategoryName}
                </Option>
              ))}
            </Select>
          </Box>
          <Box className="category">
            <Label htmlFor="SecondCategories">분류2 카테고리</Label>
            <Select
              id="SecondCategories"
              {...register('secondCategory', {
                required: '카테고리를 지정해주세요',
              })}
            >
              <Option value="카테고리" disabled>
                카테고리
              </Option>
              {categoryList.map(
                category =>
                  selectCategory == category.firstCategoryName &&
                  category.secondCategories.map(secondCategory => (
                    <Option
                      value={secondCategory.name}
                      key={secondCategory.name}
                    >
                      {secondCategory.name}
                    </Option>
                  )),
              )}
            </Select>
          </Box>
          <Box>
            <Label htmlFor="productName">상품명</Label>
            <Input
              type="text"
              id="productName"
              {...register('categoryId', {
                required: '카테고리 id',
              })}
            ></Input>
          </Box>
        </UploadForm>
      </Wrapper>
    </>
  );
};
export default UpdateCategory;

const Wrapper = styled.div`
  padding: 20px;
  position: relative;
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
  width: 120px;
`;
const Select = styled.select`
  // margin: 20px 0;
  flex: auto;
  padding: 5px;
  font-size: 16px;
`;
const Option = styled.option`
  text-align: center;
  font-size: 16px;
`;
