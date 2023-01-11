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

} from '../Action/constants';

const initialState = {
    breeds: [],
    allBreeds: [],
    breedDetails: [],
    temperaments: [],
    loading: false,
    control: false,
   
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload,
                allBreeds: action.payload,
                breedDetails: [],
                loading: false,
            };
        case LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_BREEDS_DETAILS:
            return {
                ...state,
                breedDetails: action.payload,
                breeds: [],
                allBreeds: [],
                loading: false,
                
            };
        case GET_BREED_BY_NAME:
            return{
                ...state,
                breeds: action.payload,
                loading: false,
            };
        case SEARCHBAR_NAME:
            const breedSearch = state.allBreeds;
            //eslint-disable-next-line
            const filterName = breedSearch.filter((breed) => {
                let name = breed.name.toLowerCase();
                if (name.includes(action.payload)) return breed;
            });
            return {
                ...state,
                breeds : filterName,
                loading: false,
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload,
                loading: false,                                                                   
            };
        case DB_OR_API:
            const allBreeds = state.allBreeds;
            const filterBreed = action.payload === 'created'
            ? allBreeds.filter((breeds) => breeds.id.length > 8 && breeds.id)
            : allBreeds.filter((breeds) => typeof breeds.id === 'number')

            return {
                ...state,
                breeds: action.payload === 'all' ?  state.allBreeds : filterBreed,
                loading: false,
                control: filterBreed.length === 0 ? true : false,
            }
        
        case ORDER_BY_WEIGHT:
            const orderWeight = action.payload === 'desc' ?
                [...state.breeds].sort(function (a, b) {
                    if (a.weight_min === null) {return 0}
                    if (a.weight_min < b.weight_min) {return 1}
                    if (b.weight_min < a.weight_min) {return -1}
                    return 0
                }):
                [...state.breeds].sort(function (a,b) {
                    if (a.weight_min === null) {return 0}
                    if (a.weight_min < b.weight_min) {return -1}
                    if (b.weight_min < a.weight_min) {return 1}
                    return 0
                })
            return {
                ...state,
                breeds: orderWeight
            }
        case POST_BREED:
            console.log('reduce')
            return {
                ...state,
                allBreeds: action.payload,
                loading: {
                    loading: false,
                    msg: ''
                },
            };
        case FILTER_BY_TEMPERAMENT:
            return{
                ...state,
                breeds: action.payload,
            };
        case FILTER_ALPHABETIC:
            return{
                ...state,
                breeds: action.payload,
            };
        default:
            return state;
    };
};

export default rootReducer;