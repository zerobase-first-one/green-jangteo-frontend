import styled from "styled-components";
import { Link } from "react-router-dom";
import { ImLeaf } from "react-icons/im";
import addCommaPrice from "../../public/module/addComma";



const Wrapper = styled.div`
   float: left;
   display: flex;
   flex-direction: column;
   padding: 0 5px;
   margin-bottom: 20px;
`;
const ImgContainer = styled.div`
   width: 100%;
   height: 160px;
   background-color: #dedede;
   border-radius: 5px;
   overflow: hidden;
   position: relative;
`;
const Image = styled.img`
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   height: 100%;
`;
const ProductName = styled.strong`
   padding: 10px 0;
   line-height: 20px;
`;
const ProductPrice = styled.span`
   padding-bottom: 10px;
   
   &.price {
      font-size: 20px;
      font-weight: bold;
   }
`;




interface Info {
   title: string
   price: number
   membership: boolean
   imgURL: string
   width: string
}

const ProductListItem = (props:Info) => {

   return (
      <Link to={"/"}>
         <Wrapper style={{width: props.width}}>
            <ImgContainer>
               <Image src={props.imgURL} alt="" />
            </ImgContainer>
            <ProductName>{props.title}
               {props.membership == true && <ImLeaf style={{
                  marginLeft: "5px",
                  transform: "translateY(2px)",
                  color: "var(--maincolor)",
               }}/>}
            </ProductName>
            <ProductPrice><strong className="price">{addCommaPrice(props.price)}</strong>원</ProductPrice>
         </Wrapper>
      </Link>
   )
}

export default ProductListItem