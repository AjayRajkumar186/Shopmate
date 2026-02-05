import { useCart } from "../context/CartContext";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";


const Products = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products, deleteProduct, productDetails } = useProducts();
  const { selectedCategory, setSelectedCategory } = useOutletContext();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setSelectedCategory("All");
  }, []);

  const categoryFromUrl = searchParams.get("category") || "All";

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getProductDescription = (productId) => {
    return productDetails.find((d) => d.id === productId)?.description;
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  const handleEdit = (productId) => {
    navigate("/add-product", { state: { productId } });
  };

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };




  return (
    <div className="container  mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredProducts.map((product, id) => (
        <div
          key={id}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-2xl cursor-pointer"
        >
          <Link to={`/product/description/${product.id}`} className="block cursor-pointer">

            {/* Image with hover effect */}
            <div className="relative w-full h-60 overflow-hidden group rounded-xl shadow-lg">
              <img
                src={product.image}
                className="w-full h-60 object-contain bg-white transition-all duration-500 group-hover:scale-95"
              />
              {/* Sliding overlay from bottom */}
              <div className="absolute left-0 bottom-0 w-full dark:bg-gray-900 dark:text-white bg-gray-50 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-500 p-4 flex items-center justify-center text-center">
                <p className="text-gray-800 dark:text-white text-sm">
                  {product?.description
                    ? product.description
                    : getProductDescription(product.id)}
                </p>
              </div>


            </div>
          </Link>

          {/* Product Info */}
          <div className="p-4 ">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-indigo-600 font-bold text-lg mt-1">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            {/* Action Buttons */}
            {user?.role === "admin" && (
              <div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Admin Buttons */}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded-lg font-medium transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded-lg font-medium transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>

              </div>

            )}
          </div>

        </div>
      ))}

      {/* Scroll to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          <FiArrowUp size={22} />
        </button>
      )}
    </div>



  );
};

export default Products;
