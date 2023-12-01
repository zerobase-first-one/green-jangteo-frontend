import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./CategoryPage.module.css"
import { Link, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProductListItem from "../../Product/ProductListItem";


const CategoryPage = () => {
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

   const {firstCategory} = useParams();
   const {secondCategory} = useParams();
   
   return (
      <div className={styles.container}>
         <div className={styles.categoryNameBox}>
            <h2 className={styles.firstCategory}><Link to={`/${firstCategory}`}>{firstCategory}</Link></h2>
            {secondCategory !== undefined && <h3 className={styles.secondCategory}><IoIosArrowForward className={styles.arrow} />{secondCategory}</h3>}
         </div>
         {products.map((item: any) => (
            secondCategory !== undefined 
            ? secondCategory == item.categories.secondCategory && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`50%`}/> 
            : firstCategory == item.categories.firstCategory && <ProductListItem imgURL={item.imgURL} title={item.productName} price={item.price} key={item.productId} membership={item.membership} width={`50%`}/>
         ))}
      </div>

   )
}

export default CategoryPage