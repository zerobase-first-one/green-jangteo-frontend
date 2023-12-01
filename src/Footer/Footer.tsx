import styles from "./Footer.module.css"

const Footer = () => {
   return (
      <footer className={styles.footer}>
         <ul className={styles.footerNav}>
            <li>고객센터</li>
         </ul>
      </footer>
   )
}

export default Footer