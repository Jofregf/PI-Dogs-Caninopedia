import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getBreedbyTemperament } from '../../Action';



function FilterByTemperament(props) {
    const dispatch = useDispatch();
    const {setCurrentPage} = props;
    const temperaments = useSelector((state) => state.temperaments).sort(
      function (a, b) {
        if (a.name < b.name) return -1;
        else return 1;
      }
    );
    //console.log(temperaments,'temperamentos')
    
    function handleFilterByTemperament(event) {
        event.preventDefault();
        dispatch(getBreedbyTemperament(event.target.value));
        setCurrentPage(1);
    }
  return (
    <div>
        <select 
        className = 'select-container'
        defaultValue={''} 
        onChange= {(event) => handleFilterByTemperament(event)}
        >
            <option value='' disabled>Temperamentos</option>
            <option value='all'>Todos</option>
            {temperaments.map((temp) => {
            return (
              <option key={temp.id} value={temp.name}>
                {temp.name}
              </option>
            );
          })}
        </select>
    </div>
  )
}

export default FilterByTemperament