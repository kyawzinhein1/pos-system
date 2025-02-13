import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BackBtn = () => {
  return (
    <Link
      to={"/"}
      className="flex items-center gap-2 bg-red-400 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-600 transition-colors w-max"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-md font-semibold">Back</span>
    </Link>
  );
};

export default BackBtn;
