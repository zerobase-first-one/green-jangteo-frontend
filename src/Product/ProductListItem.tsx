import { Link } from "react-router-dom";
import styles from "./productListItem.module.css"
import { ImLeaf } from "react-icons/im";
import addCommaPrice from "../../public/module/addComma";

interface Info {
   title: string
   price: number
   membership: boolean
   imgURL: string
   width: string
}

const ProductListItem = (props:Info) => {
   // function addComma(price: any): import("react").ReactNode {
   //    throw new Error("Function not implemented.");
   // }

   // const addCommaPrice = props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

   return (
      <Link to={"/"}>
         <div className={styles.listItem} style={{width: props.width}}>
            <div className={styles.imgContainer}>
               <img src={props.imgURL} alt="" className={styles.img}/>
            </div>
            <strong className={styles.productName}>{props.title}
               {props.membership == true && <ImLeaf className={styles.membershipIcon} />}
            </strong>
            <span className={styles.productPrice}><strong>{addCommaPrice(props.price)}</strong>원</span>
         </div>
      </Link>
   )
}

export default ProductListItem