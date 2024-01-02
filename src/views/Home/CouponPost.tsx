// import customAxios from '../../apiFetcher/customAxios';
// import { useForm } from 'react-hook-form';

// interface FormValue {
//   amount: number;
//   couponName: string;
//   description: string;
//   expirationPeriod: number;
//   issueQuantity: number;
//   scheduledIssueDate: string;
// }

// const CouponPost = () => {
//   const {
//     register,
//     handleSubmit,
//     // formState: { errors },
//   } = useForm<FormValue>({
//     mode: 'onSubmit',
//   });
//   const onSubmit = (data: FormValue) => {
//     customAxios.post(`/coupons`),{
//       amount: number;
//   couponName: string;
//   description: string;
//   expirationPeriod: number;
//   issueQuantity: number;
//   scheduledIssueDate: string;
//     };

//   }

//   return (
//     <>
//       <HeaderPrevPageBtn />
//       <Wrapper>
//         <UploadForm onSubmit={handleSubmit(onSubmit)}>
//           <BtnBox>
//             <Button type="reset" onClick={onReset}>
//               취소
//             </Button>
//             <Button type="submit">수정완료</Button>
//             {/* <Button type="submit">작성완료</Button> */}
//           </BtnBox>
//           {value.map((val: any) => (
//             <>
//               <Box>
//                 <Label htmlFor="productName">상품명</Label>
//                 <Input
//                   type="text"
//                   id="productName"
//                   defaultValue={val.productName}
//                   {...register('productName', {
//                     required: '상품명을 입력해주세요',

//                   })}
//                 ></Input>
//               </Box>
//               <Box>
//                 <Label htmlFor="price">가격</Label>
//                 <Input
//                   type="number"
//                   id="price"
//                   defaultValue={val.price}
//                   {...register('price', {
//                     required: '가격을 입력해주세요',

//                   })}
//                 ></Input>
//               </Box>
//               <Box>
//                 <Label htmlFor="inventory">수량</Label>
//                 <Input
//                   type="number"
//                   id="produectQuantity"
//                   defaultValue={val.count}
//                   {...register('inventory', {
//                     required: '재고 수량을 입력해주세요',

//                   })}
//                 ></Input>
//               </Box>
//               <Textarea
//                 rows={20}
//                 placeholder="제품의 설명을 입력해주세요"
//                 defaultValue={val.description}
//                 {...register('description', {
//                   required: '제품의 설명을 입력해주세요',

//                 })}
//               ></Textarea>
//             </>
//           ))}
//         </UploadForm>
//       </Wrapper>
//     </>
//   );
// };

// export default CouponPost;

// import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// // import { BASE_URL } from "../../constant/union";
// // import { useEffect, useState } from 'react';
// import { useState } from 'react';
// // import AWS from 'aws-sdk';
// import { categoryList } from '../../Product/categoryList';

//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const onReset = () => {
//     navigate(-1);
//   };
//   // const [myBucket, setMyBucket] = useState(Object);
//   // const [selectedFile, setSelectedFile] = useState('');
//   // const [imgURL, setImgURL] = useState(``);
//   // console.log(myBucket);

// const Wrapper = styled.div`
//   padding: 20px;
// `;
// const BtnBox = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// `;
// const Box = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   margin: 10px 0;

//   &.category {
//     margin-bottom: 20px;
//   }
// `;
// const Button = styled.button`
//   display: block;
//   margin-left: auto;
//   padding: 10px 20px;
//   background-color: #dedede;
//   border: none;
//   border-radius: 5px;
//   font-size: 16px;
//   cursor: pointer;
//   margin-left: 10px;
// `;
// const UploadForm = styled.form`
//   display: flex;
//   flex-direction: column;
// `;
// const Input = styled.input`
//   flex: auto;
//   padding: 5px;
// `;
// const Label = styled.label`
//   width: 120px;
// `;
// const Select = styled.select`
//   // margin: 20px 0;
//   flex: auto;
//   padding: 5px;
//   fon-tsize: 16px;
// `;
// const Option = styled.option`
//   text-align: center;
//   font-size: 16px;
// `;
// const Textarea = styled.textarea`
//   margin: 10px 0;
//   padding: 10px;
//   font-size: 16px;

//   &::placeholder {
//     color: #b0b0b0;
//   }
// `;
