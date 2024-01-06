import styled from 'styled-components';
import HeaderPrevPageBtn from '../../components/HeaderPrevPageBtn';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AWS from 'aws-sdk';
import { SellerEditProfileModal } from '../../components/modal/SellerEditProfileModal';
import customAxios from '../../apiFetcher/customAxios';

interface FormValue {
  imageUrl: string;
  storeName: string;
  description: string;
}

const EditSellerProfile = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValue>({
    mode: 'onSubmit',
  });

  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState('');
  const [imgURL, setImgURL] = useState(``);

  const onReset = () => {
    navigate(-1);
  };

  const limit = imgURL.indexOf('?');

  const onSubmit = async (data: FormValue) => {
    await customAxios
      .put(`/stores/${userId}`, {
        description: data.description,
        imageUrl: imgURL.slice(0, limit),
        storeName: data.storeName,
      })
      .then(response => {
        console.log(response);
        navigate(-1);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const myBucket = new AWS.S3({
    params: { Bucket: `greengangteo` },
    region: import.meta.env.VITE_AWS_DEFAULT_REGION,
  });

  useEffect(() => {
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    });
  }, []);

  const location = useLocation();
  const values = [location.state];
  console.log(values);

  const [imageSrc, setImageSrc] = useState<any>('');
  const handleFileInput = (e: any) => {
    setSelectedFile(e.target.files[0]);
    console.log('e', e);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    return new Promise<void>(resolve => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const uploadFile = (file: any) => {
    const param = {
      ACL: 'public-read',
      ContentType: `image/*`,
      Body: file,
      Bucket: `greengangteo`,
      Key: `profile/${file.name}`,
    };

    myBucket.putObject(param).send((err: any) => {
      if (err) {
        console.log(err);
      } else {
        const url = myBucket.getSignedUrl('getObject', { Key: param.Key });
        console.log(url, 'url');
        setImgURL(url);
      }
    });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
    uploadFile(selectedFile);
  };

  const [board, setBoard] = useState<FormValue[]>([]);
  console.log(board);

  const onChange = (e: any) => {
    const { value, name } = e.target; //event.target에서 name과 value만 가져오기
    setBoard({
      ...board,
      [name]: value,
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
            <Button type="button" onClick={showModal}>
              수정
            </Button>
            {modalOpen && (
              <SellerEditProfileModal setModalOpen={setModalOpen} />
            )}
          </BtnBox>
          {values.map((value: any) => (
            <>
              <Box>
                <Label htmlFor="image" className="image">
                  <Image src={imageSrc} />
                  프로필 사진
                </Label>
                <Input
                  type="file"
                  id="image"
                  {...register('imageUrl', {
                    onChange: e => {
                      handleFileInput(e);
                      // uploadFile(selectedFile);
                    },
                  })}
                ></Input>
              </Box>
              <Box>
                <Label htmlFor="storeName">상점명</Label>
                <Input
                  id="storeName"
                  defaultValue={value.storeName}
                  {...register('storeName', {
                    required: '상점명',
                    onChange: onChange,
                  })}
                ></Input>
              </Box>

              <Textarea
                rows={20}
                placeholder="상점의 소개글을 작성해주세요."
                defaultValue={value.description}
                {...register('description', {
                  required: '상점의 소개글을 작성해주세요.',
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

export default EditSellerProfile;

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
const Image = styled.img`
  width: 100%;
  z-index: 1;
  position: absolute;
`;
const Input = styled.input`
  flex: auto;
  margin: 1px 0;
  padding: 3px;
  font-size: 18px;
  border: 1px solid #aaaaaa;

  &#image {
    display: none;
  }
`;
const Label = styled.label`
  width: 100px;

  &.image {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    background-color: #ededed;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
  }
`;
const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #aaaaaa;

  &::placeholder {
    color: #b0b0b0;
  }
`;
