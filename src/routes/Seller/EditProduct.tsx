import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import customAxios from '../../apiFetcher/customAxios';
import { categoryList } from '../../Product/categoryList';
import axios from 'axios';

interface FormValue {
  categoryId: number;
  description: string;
  inventory: number;
  price: number;
  productId: string;
  productName: string;
  // images: [
  //   {
  //     url: string;
  //     position: 0;
  //   },
  // ];
}

const EditProduct = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const { productId } = useParams();
  const navigate = useNavigate();
  const onReset = () => {
    navigate(-1);
  };
  // const [selectedFile, setSelectedFile] = useState('');
  // const [imgURL, setImgURL] = useState(``);

  const location = useLocation();
  const value = [location.state];

  const onSubmit = async (data: FormValue) => {
    await axios
      .all([
        customAxios.put(`/products/${productId}`, {
          categoryId: data.categoryId,
          description: data.description,
          images: [
            // {
            //   url: imgURL.slice(0, limit),
            //   position: 0,
            // },
          ],
          inventory: data.inventory,
          price: data.price,
          productId: productId,
          productName: data.productName,
        }),
        customAxios.post(`/productDocuments`),
      ])
      .then(response => {
        console.log(response);
        navigate(-1);
      })
      .catch(error => {
        console.log(error.response);
        console.log(data);
      });
  };

  const [board, setBoard] = useState<FormValue[]>([]);
  console.log(board);

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setBoard({
      ...board,
      [name]: value,
    });
  };

  const [selectCategory, setselectCategory] = useState();
  const handleSelectInput = (e: any) => {
    setselectCategory(e.target.value);
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
            <Button type="submit">수정완료</Button>
          </BtnBox>
          {value.map((val: any) => (
            <>
              {/* <Box>
                <Label htmlFor="image">이미지</Label>
                <Input
                  type="file"
                  id="image"
                  {...register('productImage', {
                    // onChange: e => {
                    // handleFileInput(e);
                    // uploadFile(selectedFile);
                    // },
                  })}
                ></Input>
              </Box> */}
              <Box>
                <Label htmlFor="firstCategories">분류1</Label>
                <Select
                  id="firstCategories"
                  onChange={e => {
                    handleSelectInput(e);
                  }}
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
                <Label htmlFor="SecondCategories">분류2</Label>
                <Select
                  id="SecondCategories"
                  {...register('categoryId', {
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
                          value={secondCategory.id}
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
                  defaultValue={val.productName}
                  {...register('productName', {
                    required: '상품명을 입력해주세요',
                    onChange: onChange,
                  })}
                ></Input>
              </Box>
              <Box>
                <Label htmlFor="price">가격</Label>
                <Input
                  type="number"
                  id="price"
                  defaultValue={val.price}
                  {...register('price', {
                    required: '가격을 입력해주세요',
                    onChange: onChange,
                  })}
                ></Input>
              </Box>
              <Box>
                <Label htmlFor="inventory">수량</Label>
                <Input
                  type="number"
                  id="produectQuantity"
                  defaultValue={val.count}
                  {...register('inventory', {
                    required: '재고 수량을 입력해주세요',
                    onChange: onChange,
                  })}
                ></Input>
              </Box>
              <Textarea
                rows={20}
                placeholder="제품의 설명을 입력해주세요"
                defaultValue={val.description}
                {...register('description', {
                  required: '제품의 설명을 입력해주세요',
                  onChange: onChange,
                })}
              ></Textarea>
            </>
          ))}
        </UploadForm>
      </Wrapper>
    </>
  );
};
export default EditProduct;

const Wrapper = styled.div`
  padding: 20px;
`;
const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
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
  padding: 7px 15px;
  background-color: #e9e9e9;
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
  height: 2rem;
  flex: auto;
  padding: 5px;
  border: 1px solid #aaaaaa;
  font-size: 18px;
`;
const Label = styled.label`
  width: 100px;
`;
const Select = styled.select`
  flex: auto;
  padding: 5px;
  fon-tsize: 16px;
  border: 1px solid #aaaaaa;
`;
const Option = styled.option`
  text-align: center;
  font-size: 16px;
`;
const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #aaaaaa;
  &::placeholder {
    color: #b0b0b0;
  }
`;
