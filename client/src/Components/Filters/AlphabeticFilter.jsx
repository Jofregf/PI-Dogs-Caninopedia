import React from 'react';
import {useDispatch} from 'react-redux';
import { filterAlphabetic } from '../../Action/index';
import './filter.css'

function AlphabeticFilter() {

    const dispatch = useDispatch();

    function handleFilterAlpha (event) {
        dispatch(filterAlphabetic(event.target.value));
    }
  return (
    <div>
        <select 
        className = 'select-container'
        defaultValue={''}
        onChange={(event) => handleFilterAlpha(event)}
        >
        <option value='' disabled>Alfabetico</option>
        <option value='asc'>Ascendente</option>
        <option value='desc'>Descendente</option>
        </select>
    </div>
  )
}

export default AlphabeticFilter;