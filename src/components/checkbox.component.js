import React, { useState } from 'react';

const Checkbox = ({ categories, handleFilters }) => {

  const [ checked, setChecked ] = useState([]);

  const handleToggle = category => _ => {
    const currentCategoryId = checked.indexOf(category);
    const newCheckedCategoryIds = [ ...checked ];

    // if currently checked is not already in checked state, push
    // else pop
    if(currentCategoryId === -1) {
      newCheckedCategoryIds.push(category);
    } else {
      newCheckedCategoryIds.splice(currentCategoryId, 1);
    }

    // console.log(newCheckedCategoryIds); 
    setChecked(newCheckedCategoryIds);
    handleFilters(newCheckedCategoryIds);
  };

  return (
    categories.map((category, i) => (
        <li key={ i } className="list-unstyled">
          <input 
            type="checkbox" 
            className="form-check-input" 
            onChange={ handleToggle(category._id) } 
            value={ checked.indexOf(category._id === -1) } />
          <label className="form-check-label">{ category.name }</label>
        </li>
      )
    )
  );
}

export default Checkbox;