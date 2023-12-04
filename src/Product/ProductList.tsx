import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImLeaf } from "react-icons/im";
import Slick from "./slick";
import ProductListItem from "./ProductListItem";



const Wrapper = styled.div`
   padding: 0 20px;
`;
const Title = styled.h2`
   font-size: 24px;
   font-weight: bold;
   margin: 50px 0 20px;
`;


const ProductList = () => {


   const [products, setProducts] = useState([
   //    {
   //       productId: 0,
   //       productName: "",
   //       price: 0,
   //       categories: {
   //           firstCategory: "",
   //           secondCategory: ""
   //       },
   //       createdAt: 0,
   //       modifiedAt: 0,
   //       membership: boolean
   //   },
   ])


   useEffect(() => {
      // axios.get("https://d53733be-f889-423d-81e7-e8f003a8ebae.mock.pstmn.io/products")
      axios.get("http://localhost:3000/products")
         .then(response => {
            setProducts(response.data)
         })
         .catch(err => console.log(err.message));
      
   }, []);


   return (
      <Wrapper>
         <Title>멤버십 제품<ImLeaf  style={{
                  marginLeft: "5px",
                  transform: "translateY(2px)",
                  color: "var(--maincolor)",
               }}/></Title>
            <Slick>
               {products.map((item: any) => (
                  item.membership == true && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`100%`}/>
               ))}
            </Slick>
         <Title>음식</Title>
            <Slick>
               {products.map((item: any) => (
                  item.categories.firstCategory == `음식` && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`100%`}/>
               ))}
            </Slick>
         <Title>의류</Title>
            <Slick>
               {products.map((item: any) => (
                  item.categories.firstCategory == `의류` && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`100%`}/>
               ))}
            </Slick>
         <Title>하의</Title>
            <Slick>
               {products.map((item: any) => (
                  item.categories.secondCategory == `하의` && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`100%`}/>
               ))}
            </Slick>
      </Wrapper>
   )
}

export default ProductList