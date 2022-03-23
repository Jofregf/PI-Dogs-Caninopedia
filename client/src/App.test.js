import rootReducer from './Reducer/index';
import {orderByWeight } from './Action/index';


test('should return initial state', () => {
  expect(rootReducer(undefined, {})).toEqual({
    breeds: [],
    allBreeds: [],
    breedDetails: [],
    temperaments: [],
    loading: {
        loading: false,
        msg: '',
    },
  });
});


describe("Action", () => {
  it('Debería retornar una action con la propiedad type "orderbyWeight" y el payload, su valor lo recibe por argumento:', () => {
    expect(orderByWeight("asc")).toEqual({
      type: "ORDER_BY_WEIGHT",
      payload: "asc",
    });
  });
});


