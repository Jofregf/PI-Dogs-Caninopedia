import React from 'react';
import {useDispatch} from 'react-redux';
import {dbOrApi, spinner} from '../../Action/index'

function FilterDbOrApi(props) {

  const dispatch = useDispatch();
  const {setCurrentPage} = props;

  function handleDbOrApi (event) {
    event.preventDefault();
    dispatch(spinner())
    dispatch(dbOrApi(event.target.value))
    setCurrentPage(1)
  }
  
  return (
    <div>
      <select
      className = 'select-container'
      defaultValue={''}
      onChange={(event) => handleDbOrApi(event)}
      >
        <option value='' disabled>Filtro por DB/API</option>
        <option value='all'>Todos</option>
        <option value='created'>Base de Datos</option>
        <option value='api'>Api</option>
      </select>
    </div>
  )
}

export default FilterDbOrApi