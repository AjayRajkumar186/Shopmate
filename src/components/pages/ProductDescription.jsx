import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import productsJson from "../../data/products";
import productDetails from "../../data/productDetails.json";
import { useCart } from "../context/CartContext";

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  /* 🔹 Get products from localStorage */
  const localProducts = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("products")) || [];
    } catch {
      return [];
    }
  }, []);

  const localProductDetails = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("productDetails")) || [];
    } catch {
      return [];
    }
  }, []);

  /* 🔹 Merge JSON + local products */
  const allProducts = useMemo(() => {
    const ids = new Set();
    return [...productsJson, ...localProducts, ...localProductDetails].filter((p) => {
      if (ids.has(p.id)) return false;
      ids.add(p.id);
      return true;
    });
  }, [localProducts,localProductDetails]);

  /* 🔹 Find basic product */
  const basicProduct = allProducts.find(
    (item) => String(item.id) === String(id)
  );

  /* 🔹 Find full details (only JSON has extra details) */
  const fullDetails = localProductDetails.find(
    (item) => String(item.id) === String(id)
  );

  /* 🔹 Merge basic + details (local product may not have fullDetails) */
  const product = basicProduct
    ? { ...basicProduct, ...(fullDetails || {}) }
    : null;

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Product not found
        </h2>
        <button
          onClick={() => navigate("/product")}
          className="mt-4 text-indigo-600 underline"
        >
          Back to products
        </button>
      </div>
    );
  }

  /* 🔹 Similar products (same category) */
  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="container mx-auto px-6 py-10 space-y-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-indigo-600 hover:underline"
      >
        ← Back
      </button>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-6">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm object-contain rounded-2xl"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-2">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <p className="text-indigo-600 text-2xl font-bold mt-4">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p
            className={`mt-2 font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
          >
            {product.stock > 0
              ? `In stock (${product.stock})`
              : "Out of stock"}
          </p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Specifications</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key}>
                    <span className="capitalize font-medium">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </span>{" "}
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-4 text-sm text-gray-500">
            ⭐ {product.rating || 0} / 5 • {product.reviews || 0} reviews
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product);
                navigate("/cart");
              }}
              className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-3 rounded-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>

          <div className="flex gap-6 overflow-x-auto py-2 scrollbar-hide">
            {similarProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/description/${item.id}`}
                className="flex-none w-52 bg-white rounded-2xl shadow-md hover:shadow-xl p-4"
              >
                <div className="h-40 flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full object-contain rounded-xl"
                  />
                </div>

                <h3 className="mt-3 font-semibold text-sm truncate">
                  {item.name}
                </h3>

                <p className="mt-1 text-indigo-600 font-bold text-lg">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
