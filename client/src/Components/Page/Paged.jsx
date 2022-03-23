import React from 'react';
import './paged.css'

function Paged({breedsLength, breedsPerPage, Page}) {
    
    const pageNumber = [];

    for (let i = 0; i < Math.ceil(breedsLength/breedsPerPage); i++) {
        pageNumber.push(i + 1);
    }
  return (
    <nav className='nav-button'>
    
        <ul className='list-button'>
            {pageNumber && pageNumber.map (num => (
                <div className='btn-paged' key={num}>
                    <button className='btn-page' onClick={() => Page(num)}>
                        {num}
                    </button>
                </div>
            ))}
        </ul>
       
    </nav>
  )
}

export default Paged