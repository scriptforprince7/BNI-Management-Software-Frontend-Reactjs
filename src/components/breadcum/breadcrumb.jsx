import React from 'react';
import './breadcrumb.css';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ link }) => {
    const linkTitle = link.replace(/-/g, ' ').toUpperCase();

  return (
    <div className='breadcrumb-container'>
      {/* Home Link */}
      <Link to="/">
        <p>
          <i className="fa-solid fa-house-chimney" style={{ color: "#cf202f" }}></i>
        </p>
      </Link>

      {/* Separator */}
      <p>
        <i className="fa-regular fa-greater-than"></i>
      </p>

      {/* Dynamic Link */}
      <Link to={`/${link}`}>
        <p>{linkTitle}</p>
      </Link>
    </div>
  );
};

export default Breadcrumb;
