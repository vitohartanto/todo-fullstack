import React from 'react';
import BackgroundImage from '../images/bg-mobile-dark.jpg';
import Sun from '../images/icon-sun.svg';

const TopComponent = () => {
  return (
    <div>
      <img
        src={BackgroundImage}
        alt="Background Mobile"
        className="w-full absolute inset-0 z-[-1]"
      />
      <div className="flex py-8 px-6 justify-between">
        <h1 className="text-white tracking-widest text-xl font-semibold">
          T O D O
        </h1>
        <img src={Sun} alt="Sun Icon" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default TopComponent;
