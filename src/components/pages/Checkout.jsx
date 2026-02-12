import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FiShoppingCart } from "react-icons/fi";


const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


  const handlePlaceOrder = async(e) => {
  e.preventDefault();

  if (!shipping.name || !shipping.address || !shipping.phone) {
    Swal.fire({
      icon: "warning",
      title: "Missing Details",
      text: "Please fill all shipping fields",
      confirmButtonColor: "#f59e0b",
    });
    return;
  }


  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    Swal.fire({
      icon: "error",
      title: "Razorpay SDK Failed",
      text: "Failed to load Razorpay. Check internet connection.",
    });
    return;
  }


  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY,// 👈 Put your test key here
    amount: totalAmount * 100, // Razorpay expects amount in paise
    currency: "INR",
    name: "ShopMate",
    description: "Order Payment",
    image: "/logo.png", // optional
    handler: function (response) {
      // Payment successful

      const newOrder = {
        id: Date.now(),
        paymentId: response.razorpay_payment_id,
        userId: user.role,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          img: item.image,
        })),
        shipping,
        total: totalAmount,
        date: new Date().toISOString(),
        status: "Paid",
      };

      addOrder(newOrder);
      clearCart();

      Swal.fire({
        icon: "success",
        title: "Payment Successful 🎉",
        text: "Your order has been placed!",
        timer: 1800,
        showConfirmButton: false,
      }).then(() => {
        navigate("/my-orders");
      });
    },
    prefill: {
      name: shipping.name,
      contact: shipping.phone,
    },
    theme: {
      color: "#4f46e5",
    },
  };

 const razor = new window.Razorpay(options);
  razor.open();
};



  if (!user || cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center  dark:bg-gray-900 dark:text-white ">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-gray-500  dark:bg-gray-900 dark:text-white ">
          <FiShoppingCart size={32} />
          <span>Your cart is empty</span>
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8">Checkout</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Summary */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border p-4 rounded-lg"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md"
                />

                <div>
                  <h3 className="font-semibold text-sm sm:text-base">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {item.qty} × ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <p className="font-bold text-right text-sm sm:text-base">
                ₹{(item.price * item.qty).toLocaleString("en-IN")}
              </p>
            </div>

          ))}
        </div>

        {/* Shipping Form */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-bold">Shipping Details</h3>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              value={shipping.name}
              onChange={handleChange}
              className="w-full border p-2 rounded  dark:bg-gray-900 dark:text-white "
              required
            />
            <textarea
              name="address"
              placeholder="Address"
              value={shipping.address}
              onChange={handleChange}
              className="w-full border p-2 rounded  dark:bg-gray-900 dark:text-white "
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={shipping.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded  dark:bg-gray-900 dark:text-white "
              required
            />

            <div className="flex justify-between items-center">
              <span className="font-bold">
                Total: ₹{totalAmount.toLocaleString("en-IN")}
              </span>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded">
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
