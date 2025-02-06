import { X } from "lucide-react";

const Message = ({ message, closeMsg }) => {
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg flex flex-col">
        <h1 className="text-xl font-semibold mb-4 text-center">{message}</h1>
        <button
          className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-md flex justify-center"
          onClick={closeMsg}
        >
          <X /> Close Message
        </button>
      </div>
    </section>
  );
};

export default Message;
