import { Link } from "react-router-dom";
import { ShoppingCart, Package, LayoutDashboard,LucideHistory, UserCog2 } from "lucide-react";

const Home = () => {
  return (
    <div>
      <div className="flex gap-12 justify-center items-center mt-[15%]">
        <div className="flex flex-col items-center">
          <Link
            to={"/dashboard"}
            className="bg-gray-500 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <LayoutDashboard className="w-10 h-10 text-white" />
          </Link>
          <span className="mt-2">Dashboard</span>
        </div>

        <div className="flex flex-col items-center">
          <Link
            to={"/sale"}
            className="bg-gray-500 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors flex justify-center items-center"
          >
            <ShoppingCart className="w-10 h-10 text-white" />
          </Link>
          <span className="mt-2">Sale</span>
        </div>

        <div className="flex flex-col items-center">
          <Link
            to={"/transactions"}
            className="bg-gray-500 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <LucideHistory className="w-10 h-10 text-white" />
          </Link>
          <span className="mt-2">Transactions</span>
        </div>

        <div className="flex flex-col items-center">
          <Link
            to={"/manage-products"}
            className="bg-gray-500 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <Package className="w-10 h-10 text-white" />
          </Link>
          <span className="mt-2">Products</span>
        </div>

        <div className="flex flex-col items-center">
          <Link
            to={"/profile"}
            className="bg-gray-500 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            <UserCog2 className="w-10 h-10 text-white" />
          </Link>
          <span className="mt-2">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
