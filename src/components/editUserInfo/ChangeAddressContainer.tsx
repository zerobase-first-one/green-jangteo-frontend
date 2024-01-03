import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { changeAddress } from '../../apiFetcher/patchUserAddress';

export default function ChangeAddressContainer() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');

  const addressDto = {
    city,
    detailedAddress,
    street,
    zipcode,
  };

  const onChangeBtnClick = () => {
    if (!userId) return;
    changeAddress({
      userId,
      city,
      detailedAddress,
      street,
      zipcode,
      navigate,
    });
  };

  return (
    <ContentWrapper>
      <InputLabel>도시</InputLabel>
      <InputField
        type="text"
        placeholder="도시를 입력하세요"
        value={addressDto.city}
        onChange={e => setCity(e.currentTarget.value)}
      />
      <InputLabel>상세주소</InputLabel>
      <InputField
        type="text"
        placeholder="상세주소를 입력하세요"
        value={addressDto.detailedAddress}
        onChange={e => setDetailedAddress(e.currentTarget.value)}
      />
      <InputLabel>도로명</InputLabel>
      <InputField
        type="text"
        placeholder="도로명을 입력하세요"
        value={addressDto.street}
        onChange={e => setStreet(e.currentTarget.value)}
      />
      <InputLabel>우편번호</InputLabel>
      <InputField
        type="text"
        placeholder="우편번호를 입력하세요"
        value={addressDto.zipcode}
        onChange={e => setZipcode(e.currentTarget.value)}
      />
      <ChangeButton onClick={onChangeBtnClick}>주소 변경하기</ChangeButton>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const ChangeButton = styled.button`
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  padding: 12px;
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
`;
