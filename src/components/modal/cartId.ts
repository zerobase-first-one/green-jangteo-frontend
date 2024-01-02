export function CartId(id: any) {
  console.log(id);
  localStorage.setItem('cartId', JSON.stringify(id));
  return id;
}
