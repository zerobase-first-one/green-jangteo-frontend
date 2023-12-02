// import { useState } from "react";
import axios from "axios";
import styles from "./productList.module.css"
import { useEffect, useState } from "react";
import { ImLeaf } from "react-icons/im";
import Slick from "./slick";
import ProductListItem from "./ProductListItem";

// const itemList = [
//    {title: "의자", categori: "furniture", price: "10,000", id: 1},
//    {title: "컴퓨터", categori: "furniture", price: "10,000", id: 2},
//    {title: "귤", categori: "food", price: "10,000", id: 3},
//    {title: "수박", categori: "food", price: "10,000", id: 4},
//    {title: "컴퓨터", categori: "furniture", price: "10,000", id: 5},
//    {title: "귤", categori: "food", price: "10,000", id: 6},
//    {title: "수박", categori: "food", price: "10,000", id: 7},
//    {title: "컴퓨터", categori: "furniture", price: "10,000", id: 8},
// ]




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
      axios.get("https://d53733be-f889-423d-81e7-e8f003a8ebae.mock.pstmn.io/products")
         .then(response => {
            setProducts(response.data)
         })
         .catch(err => console.log(err.message));
      
   }, []);


   return (
      <div className={styles.container}>
         <h2 className={styles.title}>멤버십 제품<ImLeaf className={styles.membershipIcon} /></h2>
            <Slick>
               {products.map((item: any) => (
                  item.membership == true && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`100%`}/>
               ))}
            </Slick>
         <h2 className={styles.title}>음식</h2>
            <Slick>
               {products.map((item: any) => (
                  item.categories.firstCategory == `음식` && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`100%`}/>
               ))}
            </Slick>
         <h2 className={styles.title}>의류</h2>
            <Slick>
               {products.map((item: any) => (
                  item.categories.firstCategory == `의류` && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`100%`}/>
               ))}
            </Slick>
         <h2 className={styles.title}>하의</h2>
            <Slick>
               {products.map((item: any) => (
                  item.categories.secondCategory == `하의` && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`100%`}/>
               ))}
            </Slick>
      </div>
   )
}

export default ProductList