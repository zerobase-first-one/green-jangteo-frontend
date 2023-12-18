import axios from "axios";
import HeaderPrevPageBtn from "../../components/HeaderPrevPageBtn";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../constant/union";
import AWS from "aws-sdk";
import { useEffect, useState } from "react";

interface formValue {
  userId: number;
  productName: string;
  price: number;
  categories: {
    category1: string;
    category2: string;
  };
  imageStoragePath: "C:/greenjangteo/product";
  images: [
    {
      url: string;
      position: 0;
    },
  ];
  productImage: "";
  description: string;
  inventory: number;
}

const UploadProduct = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<formValue>({
    mode: "onSubmit",
  });

  const { userId } = useParams();
  const navigate = useNavigate();
  const onReset = () => {
    navigate(-1);
  };

  const onSubmit = (data: formValue) => {
    axios.post(`http://localhost:3000/post`, {
      // axios.post(`${BASE_URL}/products`, {
      userId: userId,
      productName: data.productName,
      price: data.price,
      categories: {
        category1: data.categories.category1,
        category2: data.categories.category2,
      },
      productImage: data.productImage,
      description: data.description,
      inventory: data.inventory,
    });
    navigate(-1);
  };

  // const [myBucket, setMyBucket] = useState(null);
  // // const [selectedFile, setSelectedFile] = useState(null);

  // useEffect(() => {
  //   const myBucket = new AWS.S3({
  //     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  //     region: process.env.REACT_APP_AWS_DEFAULT_REGION,
  //   });

  //   setMyBucket(myBucket);
  // }, []);

  // const handleFileInput = (e: any) => {
  //   setSelectedFile;
  //   e.target.files[0];
  //   console.log("e", e);
  // };
  // const uploadFile = (file) => {
  //   const param = {
  //     ACL: "public-read",
  //     ContentType: `image/*`,
  //     Body: file,
  //     Bucket: `greengangteo`,
  //     Key: `product/ + file.name`,
  //   };

  //   myBucket.putObject(param).send((err, data) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       const url = myBucket.getSignedUrl("getObject", { Key: param.Key });
  //       console.log(url, "url");
  //     }
  //   });
  // };

  const firstCategory = ["음식", "의류", "생필품"];
  // const secondCategory = ["음식", "의류", "생필품"];
  return (
    <>
      <HeaderPrevPageBtn />
      <Wrapper>
        <UploadForm onSubmit={handleSubmit(onSubmit)}>
          <BtnBox>
            <Button type="reset" onClick={onReset}>
              취소
            </Button>
            {/* <Button type="submit" onClick={uploadFile(selectedFile)}> */}
            <Button type="submit">작성완료</Button>
          </BtnBox>
          <Box>
            <Label htmlFor="image">이미지</Label>
            <Input
              type="file"
              id="image"
              {...register("productImage", {
                // onChange: (e) => {
                // handleFileInput(e);
                // },
              })}
            ></Input>
          </Box>
          <Box>
            <Label htmlFor="firstCategories">분류1</Label>
            <Select
              id="firstCategories"
              {...register("categories.category1", {
                required: "카테고리를 지정해주세요",
              })}
            >
              <Option value="카테고리" disabled>
                카테고리
              </Option>
              {firstCategory.map((category) => (
                <Option value={category} key={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Box>
          <Box className="category">
            <Label htmlFor="SecondCategories">분류2</Label>
            <Select
              id="SecondCategories"
              {...register("categories.category2", {
                required: "카테고리를 지정해주세요",
              })}
            >
              <Option value="카테고리" disabled>
                카테고리
              </Option>
              {firstCategory.map((category) => (
                <Option value={category} key={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Box>
          <Box>
            <Label htmlFor="productName">상품명</Label>
            <Input
              type="text"
              id="productName"
              {...register("productName", {
                required: "상품명을 입력해주세요",
              })}
            ></Input>
          </Box>
          <Box>
            <Label htmlFor="price">가격</Label>
            <Input
              type="number"
              id="price"
              {...register("price", { required: "가격을 입력해주세요" })}
            ></Input>
          </Box>
          <Box>
            <Label htmlFor="inventory">수량</Label>
            <Input
              type="number"
              id="produectQuantity"
              {...register("inventory", {
                required: "재고 수량을 입력해주세요",
              })}
            ></Input>
          </Box>
          <Textarea
            rows={20}
            placeholder="제품의 설명을 입력해주세요"
            {...register("description", {
              required: "제품의 설명을 입력해주세요",
            })}
          ></Textarea>
        </UploadForm>
      </Wrapper>
    </>
  );
};
export default UploadProduct;

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
  width: 120px;
`;
const Select = styled.select`
  // margin: 20px 0;
  flex: auto;
  padding: 5px;
  fon-tsize: 16px;
`;
const Option = styled.option`
  text-align: center;
  font-size: 16px;
`;
const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;

  &::placeholder {
    color: #b0b0b0;
  }
`;
