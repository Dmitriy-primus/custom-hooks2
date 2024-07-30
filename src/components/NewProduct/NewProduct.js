// import { useState } from "react";

import Section from "../UI/Section";
import ProductForm from "./ProductForm";
import useProduct from "./hooks/use-product";

const NewProduct = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { isLoading, error, sendHttpRequests: sendProduct } = useProduct();

  const menageNewProduct = (productText, productData) => {
    const generatedId = productData.name;
    const createdProduct = { id: generatedId, text: productText };
    props.onAddProduct(createdProduct);
  };

  const enterProductHandler = async (productText) => {
    sendProduct(
      {
        url: "https://react-course-http-5209d-default-rtdb.firebaseio.com/products.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: productText },
      },
      menageNewProduct.bind(null, productText)
    );
  };

  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       "https://react-course-http-5209d-default-rtdb.firebaseio.com/products.json",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({ text: productText }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Ошибка запроса.");
  //     }

  //     const data = await response.json();

  //     const generatedId = data.name;
  //     const createdProduct = { id: generatedId, text: productText };

  //     props.onAddProduct(createdProduct);
  //   } catch (e) {
  //     setError(e.message || "Что-то пошло не так...");
  //   }
  //   setIsLoading(false);
  // };

  return (
    <Section>
      <ProductForm onEnterProduct={enterProductHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewProduct;
