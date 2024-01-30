const ARRAY_CONSTRUCTOR = [].constructor;
const BIGINT_CONSTRUCTOR = (1n).constructor;
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

function isBigInt(value) {
    return value != null
        && value != undefined
        && typeof value === 'bigint'
        && (value).constructor === BigInt
        && (value).constructor === BIGINT_CONSTRUCTOR
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
    } else if (isBigInt(value)) {
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
    } else if (isBigInt(value)) {
        const big = BigInt(value);
        console.log('isDateValue', 2, value, big, big >= 0n, big <= 32503698000000n);
        return big >= 0n
            && big <= 32503680000000n;
    } else if (isNumberValue(value)) {
        const num = Number(value);
        console.log('isDateValue', 3, value, num, !isNaN(num), Number.isInteger(value));
        return !isNaN(num)
            && Number.isInteger(value)
            && num >= 0
            && num <= 32503680000000;
    } else if (isString(value)) {
        const date = new Date(value);
        console.log('isDateValue', 4, value, date);
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
    if (isBigInt(value)) {
        return true;
    } else {
        return value != null
            && value != undefined
            && !isNaN(value)
            && typeof value === 'number'
            && (value).constructor === Number
            && (value).constructor === NUMBER_CONSTRUCTOR;
    }
}

function isNumberValue(value) {
    if (isBigInt(value)) {
        return true;
    } else if (isNumber(value)) {
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
    isBigInt,
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
