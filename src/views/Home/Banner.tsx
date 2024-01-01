import styled from 'styled-components';
import BannerSlick from './bannerSlick';

const BannerContainer = styled.div`
  height: 450px;
  background-color: #ededed;
`;
const Container = styled.div`
  height: 450px;
  background-color: #ededed;
  position: relative;
  overflow: hidden;
`;
const Img = styled.img`
  width: 120%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 768px) {
    width: auto;
    height: 120%;
  }
`;
const TextBox = styled.span`
  color: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 60px;
  font-family: 'Black Han Sans', sans-serif;
  white-space: nowrap;
  span {
    font-size: 50px;
    color: gold;
  }
  @media screen and (max-width: 768px) {
    font-size: 46px;
    span {
      font-size: 36px;
    }
  }
`;

const Banner = () => {
  return (
    <>
      <BannerContainer>
        <BannerSlick>
          <Container>
            <Img
              src={`https://cdn.pixabay.com/photo/2023/06/13/09/27/ai-generated-8060484_1280.jpg`}
            />
            <TextBox>
              환경 보호의 날 기념 <br /> <span>EVENT</span>
            </TextBox>
          </Container>
          <Container>나</Container>
        </BannerSlick>
      </BannerContainer>
    </>
  );
};

export default Banner;
