import { createContext, useContext, useEffect, useState } from "react";
import initialProducts from "../../data/products.json";
import initialProductDetails from "../../data/productDetails.json";
import Swal from "sweetalert2";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  /* 🟢 PRODUCTS */
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  /* 🟢 PRODUCT DETAILS */
  const [productDetails, setProductDetails] = useState(() => {
    const saved = localStorage.getItem("productDetails");
    return saved ? JSON.parse(saved) : initialProductDetails;
  });

  /* 🔁 Persist */
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("productDetails", JSON.stringify(productDetails));
  }, [productDetails]);

  /* ➕ ADD PRODUCT */
  const addProduct = (product, details) => {
    if (!product?.id) return;

    setProducts((prev) => [...prev, product]);
    setProductDetails((prev) => [...prev, details]);
  };

  /* ✏️ UPDATE PRODUCT */
  const updateProduct = (product, details) => {
    if (!product?.id) return;

    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? product : p))
    );

    setProductDetails((prev) => {
      const exists = prev.some((d) => d.id === details.id);

      return exists
        ? prev.map((d) => (d.id === details.id ? details : d))
        : [...prev, details];
    });
  };

  /* ❌ DELETE PRODUCT */
  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setProductDetails((prev) => prev.filter((d) => d.id !== id));
      }
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        productDetails,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
