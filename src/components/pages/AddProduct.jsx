import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import categories from "../../data/categories.json";
import Swal from "sweetalert2";
import CustomSelect from "./CustomSelect";

/* 🔹 Dynamic specs */
const categorySpecs = {
  Smartphones: ["display", "processor", "ram", "storage", "battery", "camera", "connectivity"],
  Laptops: ["display", "processor", "ram", "storage", "graphics", "battery", "connectivity"],
  Headphones: ["type", "impedance", "frequencyResponse", "battery", "connectivity"],
  SmartWatches: ["display", "battery", "sensors", "waterResistance", "connectivity"],
  Cameras: ["video", "photo", "battery", "stabilization"],
  Footwear: ["material", "sizes", "color", "weight"],
  Clothing: ["material", "sizes", "color", "style"],
  Televisions: ["screenSize", "resolution", "displayType", "smartTV", "connectivity"],
  WashingMachines: ["capacity", "type", "spinSpeed", "features"],
  AirConditioners: ["coolingCapacity", "energyRating", "type", "features"],
  Refrigerators: ["capacity", "type", "features", "energyRating"],
};

const emptyForm = {
  id: null,
  name: "",
  category: "",
  price: "",
  stock: "",
  image: "",
  description: "",
  rating: "",
  reviews: "",
  specs: {},
};

const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { products, productDetails, addProduct, updateProduct } = useProducts();

  const editingProductId = location.state?.productId ?? null;

  const editingProduct = products.find(
    (p) => String(p.id) === String(editingProductId)
  );

  const editingProductDetails = productDetails.find(
    (p) => String(p.id) === String(editingProductId)
  );

  const [form, setForm] = useState(emptyForm);
  const prevCategoryRef = useRef(null);

  /* 🔹 PREFILL (edit mode) */
  useEffect(() => {
    if (!editingProduct) {
      setForm(emptyForm);
      return;
    }

    setForm({
      ...emptyForm,
      ...editingProduct,
      ...editingProductDetails,
      specs: editingProductDetails?.specs || {},
    });

    prevCategoryRef.current = editingProduct.category;
  }, [editingProduct, editingProductDetails]);

  /* 🔄 RESET SPECS ONLY WHEN USER CHANGES CATEGORY */
  useEffect(() => {
    if (!form.category) return;

    // Skip initial load
    if (prevCategoryRef.current === null) {
      prevCategoryRef.current = form.category;
      return;
    }

    if (prevCategoryRef.current !== form.category) {
      setForm((prev) => ({ ...prev, specs: {} }));
    }

    prevCategoryRef.current = form.category;
  }, [form.category]);

  /* 🔹 INPUT HANDLER */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.length) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      specs: { ...prev.specs, [key]: value },
    }));
  };

  /* ✅ SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.stock) {
      Swal.fire("Missing Fields", "Please fill all required fields", "warning");
      return;
    }

    const id = editingProduct ? editingProduct.id : Date.now();

    const productData = {
      id,
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      image: form.image,
    };

    const productDetailsData = {
      id,
      description: form.description,
      rating: Number(form.rating || 0),
      reviews: Number(form.reviews || 0),
      specs: form.specs,
    };

    editingProduct
      ? updateProduct(productData, productDetailsData)
      : addProduct(productData, productDetailsData);

    Swal.fire({
      icon: "success",
      title: editingProduct ? "Product Updated" : "Product Added",
      timer: 1200,
      showConfirmButton: false,
    }).then(() => navigate("/product"));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
  >
    {/* Header */}
    <div className="bg-indigo-600 px-8 py-6">
      <h2 className="text-2xl font-bold text-white">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>
      <p className="text-indigo-100 dark:text-indigo-200 text-sm mt-1">
        Fill product details carefully
      </p>
    </div>

    {/* Body */}
    <div className="p-8 space-y-8">

      {/* 🔹 Basic Info */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full rounded-xl px-4 py-3 border
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-white
              border-gray-300 dark:border-gray-600
              placeholder-gray-400 dark:placeholder-gray-300
              focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />

          <CustomSelect
            categories={categories}
            value={form.category}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 🔹 Pricing */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Pricing & Stock
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {["price", "stock", "rating", "reviews"].map((field) => (
            <input
              key={field}
              type="number"
              step={field === "rating" ? "0.1" : undefined}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full rounded-xl px-4 py-3 border
                bg-white dark:bg-gray-700
                text-gray-900 dark:text-white
                border-gray-300 dark:border-gray-600
                placeholder-gray-400 dark:placeholder-gray-300
                focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          ))}
        </div>
      </div>

      {/* 🔹 Specs */}
      {categorySpecs[form.category] && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorySpecs[form.category].map((spec) => (
              <input
                key={spec}
                value={form.specs[spec] || ""}
                placeholder={spec.replace(/([A-Z])/g, " $1")}
                onChange={(e) =>
                  handleSpecChange(spec, e.target.value)
                }
                className="w-full rounded-xl px-4 py-3 border
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-white
                  border-gray-300 dark:border-gray-600
                  placeholder-gray-400 dark:placeholder-gray-300
                  focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            ))}
          </div>
        </div>
      )}

      {/* 🔹 Image Upload */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Product Image
        </h3>

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="block w-full text-sm text-gray-700 dark:text-gray-200"
        />

        {form.image && (
          <div className="mt-4 flex justify-center">
            <img
              src={form.image}
              alt="Preview"
              className="h-48 object-contain rounded-xl border
                bg-white dark:bg-gray-800
                border-gray-300 dark:border-gray-600
                p-3"
            />
          </div>
        )}
      </div>

      {/* 🔹 Description */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Description
        </h3>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product description..."
          rows="4"
          className="w-full rounded-xl px-4 py-3 border
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-white
            border-gray-300 dark:border-gray-600
            placeholder-gray-400 dark:placeholder-gray-300
            focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {/* 🔹 Submit */}
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700
          dark:bg-indigo-500 dark:hover:bg-indigo-600
          text-white py-4 rounded-2xl font-semibold text-lg transition"
      >
        {editingProduct ? "Update Product" : "Save Product"}
      </button>
    </div>
  </form>
</div>

  );

};

export default AddProduct;
