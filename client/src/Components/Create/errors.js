export function validation (input) {
    let errors = [];
    if (!input.name) {
        errors.name = 'Ingrese un nombre';
    }else if (input.name.search(/^[a-zA-Z\s]*$/)) {
        errors.name = 'No se permiten simbolos ni numeros';
    };

    if(!input.height_min) {
        errors.height_min = 'Ingrese una altura mínima';
    }else if(input.height_min <= 0) {
        errors.height_min = 'La altura debe ser mayor a 0'
    }else if(isNaN(input.height_min) || input.height_min > 100) {
        errors.height_min = 'La altura debe ser un numero menor a 100'
    };

    if (!input.height_max) {
        errors.height_max = 'Ingrese una altura máxima';
    }else if (parseInt(input.height_min) > parseInt(input.height_max)) {
        errors.height_max = 'La altura máxima no puede ser menor que la altura mínima';
    };

    if(!input.weight_min) {
        errors.weight_min = 'Ingrese un peso mínimo';
    }else if(input.weight_min <= 0) {
        errors.weight_min = 'El peso debe ser mayor a 0'
    }else if(isNaN(input.weight_min) || input.weight_min > 100) {
        errors.weight_min = 'La altura debe ser un numero menor a 100'
    };

    if (!input.weight_max) {
        errors.weight_max = 'Ingrese un peso máximo';
    }else if (parseInt(input.weight_min) > parseInt(input.weight_max)) {
        errors.weight_max = 'El peso máximo no puede ser menor que el peso mínimo';
    };

    if(!input.life_span_min) {
        errors.life_span_min = 'Ingrese años de vida mínimo';
    }else if(input.life_span_min <= 0) {
        errors.life_span_min = 'El promedio de vida debe ser mayor a 0'
    }else if(isNaN(input.life_span_min) || input.life_span_min > 20) {
        errors.life_span_min = 'La altura debe ser un numero menor a 100'
    };

    if (!input.life_span_max) {
        errors.life_span_max = 'Ingrese años de vida máximo';
    }else if (parseInt(input.life_span_min) > parseInt(input.life_span_max)) {
        errors.life_span_max = 'El promedio de vida máximo no puede ser menor que el mínimo';
    };

    if (!input.image) {
        errors.image = 'Ingrese el link de una imagen';
    }
    if(input.temperament ===['']){
        errors.temperament = 'Debe seleccionar al menos un temperamento'
    }
    return errors;
}






            
            
            