import styled from 'styled-components';
import HeaderPrevPageBtn from './HeaderPrevPageBtn';
import React, { useEffect, useState } from 'react';
import { postReview } from '../apiFetcher/postReview';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../store/atom/auth';
import { useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';

export default function CreateReview() {
  const userId = useRecoilValue(userIdState);
  const productId = '9';
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [myBucket, setMyBucket] = useState(Object);
  const [selectedFile, setSelectedFile] = useState('');
  const [imgURL, setImgURL] = useState('');

  useEffect(() => {
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    });
    const myBucket = new AWS.S3({
      params: { Bucket: `greengangteo` },
      region: import.meta.env.VITE_AWS_DEFAULT_REGION,
    });

    setMyBucket(myBucket);
  }, []);

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    console.log('e', e);
  };

  const uploadFile = (file: any) => {
    const param = {
      ACL: 'public-read',
      ContentType: `image/*`,
      Body: file,
      Bucket: `greengangteo`,
      Key: `product/${file.name}`,
    };

    myBucket.putObject(param).send((err: any) => {
      if (err) {
        console.log(err);
      } else {
        const url = myBucket.getSignedUrl('getObject', { Key: param.Key });
        console.log('url', url);
        setImgURL(url);
      }
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;
    await postReview({
      content,
      userId,
      productId,
      imageUrl: imgURL.slice(0, imgURL.indexOf('?')),
    });
    navigate(`/products/${productId}/review`);
  };

  return (
    <Wrapper>
      <HeaderPrevPageBtn />
      <Form onSubmit={onSubmit}>
        <TextArea
          placeholder="상품 후기를 작성해주세요."
          onChange={onContentChange}
          value={content}
          required
        />
        <Box>
          <Label htmlFor="image">이미지</Label>
          <Input
            type="file"
            id="image"
            onChange={e => {
              handleFileInput(e);
              uploadFile(selectedFile);
            }}
          ></Input>
        </Box>
        <SubmitBtn type="submit">작성 완료</SubmitBtn>
      </Form>
      <Image />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #e7e7e7;
  height: 100vh;
`;

const Form = styled.form`
  width: 100%;
  height: 280px;
  background-color: #ffffff;
  margin-top: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  &:focus {
    outline: none;
  }
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

const Label = styled.label`
  width: 120px;
`;

const Input = styled.input`
  flex: auto;
  padding: 5px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  background-color: #16a114;
  margin: 10px auto;
  cursor: pointer;
`;

const Image = styled.img``;
