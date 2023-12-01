const addCommaPrice = (price: number) => {
   const addComma = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
   return (
      addComma
   )
}

export default addCommaPrice