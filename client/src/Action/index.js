import axios from 'axios';
import {
            GET_BREEDS,
            LOADING,
            GET_BREEDS_DETAILS,
            GET_BREED_BY_NAME,
            SEARCHBAR_NAME,
            GET_TEMPERAMENTS,
            DB_OR_API,
            ORDER_BY_WEIGHT,
            POST_BREED,
            FILTER_BY_TEMPERAMENT,
            FILTER_ALPHABETIC,

        } from './constants';

export function getBreeds() {
    return function (dispatch) {
       
        fetch('http://localhost:3001/dogs')
        .then(res => res.json())
        .then(data => {dispatch({type: GET_BREEDS, payload: data})})
        .catch(function (error) {
            console.log(error)
        });
    };
};

export function getBreedsDetails (id) {
    // console.log(id, 'action')
    return function (dispatch){
        fetch (`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(data => {dispatch({type: GET_BREEDS_DETAILS, payload: data})})
        .catch(function (error) {
            console.log(error)
        });
    };
};

export function getBreedByName (name) {
    //console.log(name, 'action')
    return function (dispatch) {
        fetch (`/dogs?name=${name}`)
        .then(res => res.json())
        .then(data => {dispatch({type: GET_BREED_BY_NAME, payload: data})})
        .catch(function (err) {
            console.log(err)
        });
    };
};

export function searchbarName (payload) {
    return async function (dispatch) {
        try {
            dispatch ({
                type: SEARCHBAR_NAME,
                payload,
            })
        } catch (error) {
            console.log(error)
        };
    };
};

export function getTemperaments () {
    return async function (dispatch) {
        
        fetch (`/temperament/`)
        .then(res => res.json())
        .then(data => {dispatch({type: GET_TEMPERAMENTS, payload: data})})
        .catch(function (error) {
            console.log(error)
        });
    };
};

export function dbOrApi (payload) {
    //console.log(payload, 'desde action')
    return async function (dispatch) {
        try {
            dispatch({type: DB_OR_API, payload})
        } catch (error) {
            alert('No existe breed en la base de datos')
        };
    };
};

export function orderByWeight (payload) {
    //console.log(payload, 'action weight')
    try {
        return {
            type: ORDER_BY_WEIGHT,
            payload
        };
    } catch (error) {
        console.log(error)    
    }
};

export function postBreed (breed){
    console.log(breed, 'action')
    return async function (dispatch) {
        try {
            const newBreed = await axios.post(`/dog`, breed);
            dispatch({
                type: POST_BREED,
                payload: newBreed.data
            });
        } catch (error) {
            console.log(error)
        };
    };
};

export function getBreedbyTemperament (payload) {
    return async function (dispatch) {
        try {
            const search = await axios.get(`/temperament/dogs?temperament=${payload}`);
            dispatch({
                type: FILTER_BY_TEMPERAMENT,
                payload: search.data
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export function filterAlphabetic (payload) {
    return async function (dispatch) {
        try {
            const search = await axios.get(`/dogs/breeds/orden?alpha=${payload}`);
            dispatch({
                type: FILTER_ALPHABETIC,
                payload: search.data,
            })
        } catch (error) {
            console.log(error)
        };
    };
};

export function spinner ()  {
    return {
        type: LOADING,
    }
}