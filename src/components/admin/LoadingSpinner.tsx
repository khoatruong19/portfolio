import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => {
  return (
    <div className="bg-grayColor w-screen h-screen flex items-center justify-center">
      <ClipLoader color="#F7AB0A" loading={true} size={150} />
    </div>
  );
};

export default LoadingSpinner;
