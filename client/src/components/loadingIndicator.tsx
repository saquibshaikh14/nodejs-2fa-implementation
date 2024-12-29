
const LoadingIndicator = () => {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-white">
          </div>
        </div>
      </div>
    );
  };
  
  export default LoadingIndicator;