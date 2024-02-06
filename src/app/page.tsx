const fetchProducts = async () => {
  const data = await fetch("http://localhost:3000/api/products");
  const res = await data.json();
  return res;
};
export default async function Home() {
  const products = await fetchProducts();
  console.log(products);
  return (
    <div>
      {products.products.map((item: Product) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
}
