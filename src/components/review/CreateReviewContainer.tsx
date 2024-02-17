import styled from 'styled-components';
import React, { useState } from 'react';
import { postReview } from '../../apiFetcher/postReview';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';
import { useLocation } from 'react-router-dom';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import ConfirmModal from '../modal/ConfirmModal';

export default function CreateReviewContainer() {
  const userId = useRecoilValue(userIdState);
  const location = useLocation();
  const productId = String(location.state);
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imgURL, setImgURL] = useState('');

  const s3 = new S3Client({
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
    region: import.meta.env.VITE_AWS_DEFAULT_REGION,
  });

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  async function uploadFile(file: any) {
    const param = new PutObjectCommand({
      ACL: 'public-read',
      ContentType: `image/*`,
      Body: file,
      Bucket: `greengangteo`,
      Key: `product/${file.name}`,
    });

    await s3.send(param);

    setImgURL(
      `https://s3.${
        import.meta.env.VITE_AWS_DEFAULT_REGION
      }.amazonaws.com/greengangteo/product/${file.name}`,
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;
    await postReview({
      content,
      userId,
      productId,
      imageUrl: imgURL.slice(0, imgURL.indexOf('?')),
    });

    setShowModal(true);
  };

  return (
    <Wrapper>
      <PreviewImage src={imgURL} alt="이미지 미리보기" />
      <Form onSubmit={onSubmit}>
        <TextArea
          placeholder="상품 후기를 작성해주세요."
          onChange={onContentChange}
          value={content}
          required
        />
        <FileInputWrapper>
          <Label htmlFor="image">이미지</Label>
          <Input
            type="file"
            id="image"
            onChange={e => {
              handleFileInput(e);
              uploadFile(selectedFile);
            }}
          />
        </FileInputWrapper>
        <SubmitBtn type="submit">작성 완료</SubmitBtn>
      </Form>
      {showModal && (
        <ConfirmModal
          message="상품 후기가 등록되었습니다."
          linkPath={`/products/${productId}/review`}
          onClose={() => setShowModal(false)}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const Form = styled.form`
  width: 100%;
  background-color: #ffffff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 250px;
  resize: none;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 80px;
  margin-right: 10px;
`;

const Input = styled.input`
  flex: auto;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  background-color: #16a114;
  margin-top: 20px;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 90%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 20px;
`;
