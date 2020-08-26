import React from "react";

const Header = ({ title }) => (
  <header className='w-full border-l-8 border-red-700'>
    <h2 className='ml-2 text-2xl font-bold font-display text-gray-900'>
      {title}
    </h2>
  </header>
);

export default Header;
