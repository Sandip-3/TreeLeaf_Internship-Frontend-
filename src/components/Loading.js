import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center gap-4">
        <AiOutlineLoading3Quarters className="animate-spin" size={40} />
        <h1 className="mt-4 text-3xl text-center">Loading</h1>
      </div>
    </div>
  );
};

export default Loading;
