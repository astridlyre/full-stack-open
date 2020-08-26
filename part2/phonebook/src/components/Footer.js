import React from "react";

const Footer = ({ siteInfo }) => (
  <footer className='w-full border-l-8 border-red-700 text-gray-900'>
    <div className='pl-4'>
      <h4 className=' text-lg font-bold font-display'>{siteInfo.title}</h4>
      <h5 className=''>Created by {siteInfo.author}</h5>
      <ul className='leading-tight'>
        <li>
          <i className='mr-2 fas fa-phone text-gray-900'></i>
          <span>{siteInfo.phone}</span>
        </li>
        <li>
          <i className='mr-2 fab fa-github text-gray-900'></i>
          <span>{siteInfo.git}</span>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
