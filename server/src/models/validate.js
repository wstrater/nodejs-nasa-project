const ARRAY_CONSTRUCTOR = [].constructor;
const BOOLEAN_CONSTRUCTOR = (true).constructor;
const FUNCTION_CONSTRUCTOR = (() => {return true;}).constructor;
const NUMBER_CONSTRUCTOR = (1).constructor;
const OBJECT_CONSTRUCTOR = ({}).constructor;
const STRING_CONSTRUCTOR = "test".constructor;

function isArray(value) {
    return value != null
        && value != undefined
        && Array.isArray(value)
        && value.constructor === Array
        && value.constructor === ARRAY_CONSTRUCTOR;
}

function isBoolean(value) {
    return value != null
        && value != undefined
        && typeof value === 'boolean'
        && (value).constructor === Boolean
        && (value).constructor === BOOLEAN_CONSTRUCTOR;
}

function isBooleanValue(value) {
    if (isBoolean(value)) {
        // console.log('isBooleanValue', '2');
        return true;
    } else if (isNumberValue(value)) {
        // console.log('isBooleanValue', '3');
        return !isNaN(value)
            && Number.isInteger(value);
    } else if (isString(value)) {
        // console.log('isBooleanValue', '4');
        return ['yes', 'y', 'no', 'n', 'true', 't', 'false', 'f'].indexOf(value.toLowerCase()) >= 0;
    } else {
        // console.log('isBooleanValue', '5');
        return false;
    }
}

function isDate(value) {
    return value != null
        && value != undefined
        && (value).constructor === Date
        && !isNaN(value);
}

function isDateValue(value) {
    if (isDate(value)) {
        console.log('isDateValue', 1, value);
        return true;
    } else if (isNumberValue(value)) {
        const num = Number(value);
        console.log('isDateValue', 2, value, num);
        return !isNaN(num)
            && Number.isInteger(value)
            && num >= 0
            && num <= 32503698000000;
    } else if (isString(value)) {
        const date = new Date(value);
        console.log('isDateValue', 3, value, date);
        return (!isNaN(date)
            || date.toString() != 'Invalid Date');
    }
}

function isEmpty(value) {
    if (typeof value === 'undefined') {
        return true;
    } else if (value === null) {
        return true;
    } else if (typeof value === 'string') {
        return value.trim().length === 0;
    } else if (isArray(value)) {
        return value.length == 0;
    } else if (isObject(value)) {
        return Object.keys(value).length === 0;
    }

    return false;
}

function isFunction(value) {
    return value != null 
        && value != undefined
        && typeof value === 'function'
        && (value).constructor === Function;
}

function isNotEmpty(value) {
    return !isEmpty(value);
}

function isNull(value) {
    return value === null;
}

function isNumber(value) {
    return value != null 
        && value != undefined
        && typeof value === 'number'
        && !isNaN(value)
        && (value).constructor === Number
        && (value).constructor === NUMBER_CONSTRUCTOR;
}

function isNumberValue(value) {
    if (isNumber(value)) {
        // console.log('isNumberValue', '2');
        return !isNaN(value);
    } else if (isString(value)) {
        // console.log('isNumberValue', '4');
        const num = Number(value);
        return !isNaN(num)
            && value.trim().length > 0;
    }
}

function isObject(value) {
    return value != null 
        && value != undefined
        && typeof value === 'object'
        && value.constructor === Object
        && value.constructor === OBJECT_CONSTRUCTOR;
}

function isString(value) {
    return value != null 
        && value != undefined
        && typeof value === 'string'
        && value.constructor === String
        && value.constructor === STRING_CONSTRUCTOR;
}

function isUndefined(value) {
    return value === undefined;
}

// function runTests() {
//     testValue(-1);
//     testValue(0);
//     testValue(1);
//     testValue(1.123);
//     testValue(new Date('01/01/3000').valueOf());
//     testValue(new Date('01/01/3000').valueOf() + 1);
//     testValue(NaN);
//     testValue(Infinity);
//     testValue('1');
//     testValue(true);
//     testValue('false');
//     testValue('a');
//     testValue([]);
//     testValue([1]);
//     testValue({});
//     testValue({a: 1});
//     testValue(null);
//     testValue({}.missing);
//     testValue(new Date());
//     testValue('12/31/23')
//     testValue(() => {return true});
// }

// function testValueIs(value) {
//     const ret = [];

//     if (isArray(value)) {
//         ret.push('isArray');
//     }
//     if (isBoolean(value)) {
//         ret.push('isBoolean');
//     }
//     if (isBooleanValue(value)) {
//         ret.push('isBooleanValue');
//     }
//     if (isDate(value)) {
//         ret.push('isDate');
//     }
//     if (isDateValue(value)) {
//         ret.push('isDateValue');
//     }
//     if (isEmpty(value)) {
//         ret.push('isEmpty');
//     }
//     if (isFunction(value)) {
//         ret.push('isFunction');
//     }
//     if (isNull(value)) {
//         ret.push('isNull');
//     }
//     if (isNumber(value)) {
//         ret.push('isNumber');
//     }
//     if (isNumberValue(value)) {
//         ret.push('isNumberValue');
//     }
//     if (isObject(value)) {
//         ret.push('isObject');
//     }
//     if (isString(value)) {
//         ret.push('isString');
//     }
//     if (isUndefined(value)) {
//         ret.push('isUndefined');
//     }

//     return ret;
// }

// function testValue(value) {
//     console.log(value, (typeof value), testValueIs(value));
// }

function validateIsBoolean(errors, value, error) {
    if (isArray(errors) && !isNull(error) && !isUndefined(error)) {
        if (!isNumber(value)) {
            errors.push(error);
        }

        return true;
    }
}

function validateIsBooleanOrEmpty(errors, value, error) {
    if (isArray(errors) && !isNull(error) && !isUndefined(error)) {
        if (!isEmpty(value) && !isBoolean(value)) {
            errors.push(error);
        }

        return true;
    }
}

function validateIsDate(errors, value, error) {
    if (isArray(errors) && !isNull(error) && !isUndefined(error)) {
        if (!isDate(value)) {
            errors.push(error);
        }

        return true;
    }
}

function validateIsDateValue(errors, value, error) {
    if (isArray(errors) && !isNull(error) && !isUndefined(error)) {
        if (!isDateValue(value) && !isNumber(value)) {
            errors.push(error);
        }

        return true;
    }
}

function validateIsEmpty(errors, value, error) {
    if (isArray(errors) && error) {
        if (!isEmpty(value)) {
            errors.push(error);
            return false;
        }

        return true;
    }
}

function validateIsNotEmpty(errors, value, error) {
    if (isArray(errors) && error) {
        if (!isNotEmpty(value)) {
            errors.push(error);
            return false;
        }

        return true;
    }
}

function validateIsNumber(errors, value, error) {
    if (isArray(errors) && !isNull(error) && !isUndefined(error)) {
        if (!isNumber(value)) {
            errors.push(error);
        }

        return true;
    }
}

function validateIsNumberOrEmpty(errors, value, error) {
    if (isArray(errors) && !isNull(error) && !isUndefined(error)) {
        if (!isEmpty(value) && !isNumber(value)) {
            errors.push(error);
        }

        return true;
    }
}

// runTests();

module.exports = {
    isArray,
    isBoolean,
    isBooleanValue,
    isDate,
    isDateValue,
    isEmpty,
    isFunction,
    isNotEmpty,
    isNull,
    isNumber,
    isNumberValue,
    isObject,
    isString,
    isUndefined,
    validateIsBoolean,
    validateIsBooleanOrEmpty,
    validateIsDate,
    validateIsDateValue,
    validateIsEmpty,
    validateIsNotEmpty,
    validateIsNumber,
    validateIsNumberOrEmpty
}
