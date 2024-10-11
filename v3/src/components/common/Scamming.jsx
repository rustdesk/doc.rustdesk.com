import React, { useState, useEffect } from 'react';

const ScammingBanner = () => {
  const [isHide, setHide] = useState(true);

  useEffect(() => {
    const hideScammer = localStorage.getItem('hide-scammer');
    if (hideScammer !== 'Y') {
      setHide(false);
    }
  }, []);

  const handleClose = () => {
    setHide(true);
    localStorage.setItem('hide-scammer', 'Y');
  };

  if (isHide === true) {
    return null;
  }

  return (
    <div className="top-0 w-full bg-gradient-to-r from-[#E014B0] to-[#802FF3] text-white p-2 flex justify-between items-center z-50">
      <span className="flex-1 text-center font-bold">
        WARNING: YOU MAY BE BEING SCAMMED! <br />
        If you are on the phone with someone you DON'T know AND TRUST who has asked you to install RustDesk,
        <br />
        do not install and hang up immediately. <br />
        They are likely a scammer trying to steal your money or other private information.
      </span>
      <button className="bg-none border-none text-lg cursor-pointer mr-4" onClick={handleClose}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="currentColor"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScammingBanner;
