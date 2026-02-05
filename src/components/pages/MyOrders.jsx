import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiPhone, FiMapPin, FiInbox } from "react-icons/fi";


const MyOrders = () => {
  const navigate = useNavigate();
  const { orders } = useOrder();
  const { user } = useAuth();

  if (!user) {
    navigate("/login");
    return null;
  }

  const filteredOrders =
    user.role === "admin"
      ? orders
      : orders.filter(order => String(order.userId) === String(user.role))
        .map(order => ({ ...order, shipping: order.shipping || { name: "N/A", address: "", phone: "" } }));


  if (filteredOrders.length === 0) {
    return (
      <div className="min-h-screen  dark:bg-gray-900 dark:text-white   flex flex-col justify-center items-center gap-4 bg-gray-50">
        <p className="text-2xl font-semibold text-gray-700 dark:text-white flex items-center justify-center gap-2">
          <FiInbox size={26} />
          <span>No orders yet</span>
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10  dark:bg-gray-900 dark:text-white ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold dark:text-white">My Orders</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-3.5 py-2  rounded-lg hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </button>
      </div>


      {filteredOrders.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 sm:p-6 mb-6 shadow-sm hover:shadow-md transition"
        >
          {/* Top: Images + Order Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            {/* Images */}

            <div className="flex gap-3 justify-between flex-wrap">
              {order.items.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/description/${item.id}`}
                  className="block"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-18 h-18 sm:w-24 sm:h-24 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
                  />
                </Link>
              ))}

              <p className="text-green-600 font-medium sm:hidden">
                {order.status}
              </p>
            </div>


            {/* Order Meta */}
            <div className="text-sm ">
              <p className="hidden sm:block text-green-600 font-medium">
                {order.status}
              </p>
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-gray-500 text-xs">
                {new Date(order.date).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

            </div>
          </div>

          {/* User Info Pills */}
          <div className="flex flex-wrap gap-2 mb-4 text-xs font-medium">

            {user?.role === "admin" && (
              <span
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full
      ${String(order.userId) === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"}`}
              >
                <FiUser />
                {String(order.userId) === "admin" ? "Admin" : "User"}
              </span>
            )}


            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">
              <FiUser />
              {order.shipping?.name || "N/A"}
            </span>

            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700">
              <FiPhone />
              {order.shipping?.phone || "N/A"}
            </span>

            <span className="flex items-center gap-1 px-1 py-0.5 rounded-full bg-red-100 text-red-700">
              <FiMapPin />
              {order.shipping?.address || "N/A"}
            </span>
          </div>

          {/* Items List */}
          <div className="space-y-2 text-sm">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">

                <span className="text-gray-700">
                  {item.name} × {item.qty} :
                </span>
                <span className="font-medium">
                  ₹{((item.price || 0) * (item.qty || 0)).toLocaleString("en-IN")}
                </span>

              </div>

            ))}
            <div className="flex justify-between">
              <span>GST Tax :</span>
              <span>00.000</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge :</span>
              <span ><span className="mr-2"> <strike>200 </strike></span> free delivery</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end mt-4 pt-3 border-t font-bold">
            Total: ₹{(order.total || 0).toLocaleString("en-IN")}
          </div>
        </div>
      ))}

    </div>
  );
};

export default MyOrders;
