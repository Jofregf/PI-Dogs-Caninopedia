import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {orderByWeight} from '../../Action/index'

function OrderByWeight() {
    const dispatch = useDispatch();
    const [,setOrderWeight] = useState('');
    const [,setCurrentPage] = useState(1)

    function handleOrderWeight (event) {
        dispatch(orderByWeight(event.target.value))
        setCurrentPage(1);
        setOrderWeight('Order' + event.target.value)
    }
  return (
    <div>
          <select 
          className = 'select-container'
          defaultValue={''} 
          onChange={(event) => handleOrderWeight(event)}
          >
            <option value='' disabled>Pesos</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
    </div>
  )
}

export default OrderByWeight