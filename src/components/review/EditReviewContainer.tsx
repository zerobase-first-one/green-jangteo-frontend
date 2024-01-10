import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../store/atom/auth';
import { useLocation, useParams } from 'react-router-dom';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import ConfirmModal from '../modal/ConfirmModal';
import customAxios from '../../apiFetcher/customAxios';

export default function EditReviewContainer() {
  const { reviewId } = useParams();
  const userId = useRecoilValue(userIdState);
  const location = useLocation();
  const value = location.state;
  const [editedContent, setEditedContent] = useState(value.content);
  const [imgURL, setImgURL] = useState<string | null>(value.imageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const s3 = new S3Client({
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    },
    region: import.meta.env.VITE_AWS_DEFAULT_REGION,
  });

  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.currentTarget.value);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    const param = new PutObjectCommand({
      ACL: 'public-read',
      ContentType: `image/*`,
      Body: selectedFile,
      Bucket: `greengangteo`,
      Key: `product/${selectedFile.name}`,
    });

    try {
      // await myBucket.upload(param).promise();
      await s3.send(param);
      // const url = `https://greengangteo.s3.amazonaws.com/${param.Key}`;
      const url = `https://greengangteo.s3.amazonaws.com/product/${selectedFile.name}`;
      setImgURL(url);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    uploadFile();

    const data = { content: editedContent, imageUrl: imgURL, reviewId };
    await customAxios.put(`/reviews/${reviewId}`, data);
    setShowModal(true);
  };

  return (
    <Wrapper>
      {imgURL && <PreviewImage src={imgURL} alt="이미지 미리보기" />}
      <Form onSubmit={onSubmit}>
        <TextArea
          placeholder="상품 후기를 작성해주세요."
          onChange={onContentChange}
          value={editedContent}
          required
        />
        <FileInputWrapper>
          <Label htmlFor="image">이미지</Label>
          <Input
            type="file"
            id="image"
            onChange={e => {
              handleFileInput(e);
              uploadFile();
            }}
          />
        </FileInputWrapper>
        <SubmitBtn type="submit">작성 완료</SubmitBtn>
      </Form>
      {showModal && (
        <ConfirmModal
          message="상품후기 수정이 완료되었습니다."
          linkPath={`/users/${userId}`}
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
