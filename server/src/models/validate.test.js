const validate = require('./validate.js');

describe('Test isArray', () => {
    const testValue = function(value) {
        return validate.isArray(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeTruthy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeTruthy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isBoolean', () => {
    const testValue = function(value) {
        return validate.isBoolean(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeTruthy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isBooleanValue', () => {
    const testValue = function(value) {
        return validate.isBooleanValue(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeTruthy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeTruthy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeTruthy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeTruthy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeTruthy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeTruthy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeTruthy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isDate', () => {
    const testValue = function(value) {
        return validate.isDate(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeTruthy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isDateValue', () => {
    const testValue = function(value) {
        return validate.isDateValue(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeTruthy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeTruthy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeTruthy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeTruthy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeTruthy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isEmpty', () => {
    const testValue = function(value) {
        return validate.isEmpty(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeTruthy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeTruthy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeTruthy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeTruthy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeTruthy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isFunction', () => {
    const testValue = function(value) {
        return validate.isFunction(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeTruthy();
    });
});

describe('Test isNotEmpty', () => {
    const testValue = function(value) {
        return validate.isNotEmpty(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeTruthy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeTruthy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeTruthy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeTruthy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeTruthy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeTruthy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeTruthy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeTruthy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeTruthy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeTruthy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeTruthy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeTruthy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeTruthy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeTruthy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeTruthy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeTruthy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeTruthy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeTruthy();
    });
});

describe('Test isNull', () => {
    const testValue = function(value) {
        return validate.isNull(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeTruthy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isNumber', () => {
    const testValue = function(value) {
        return validate.isNumber(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeTruthy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeTruthy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeTruthy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeTruthy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeTruthy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeTruthy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeTruthy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isNumberValue', () => {
    const testValue = function(value) {
        return validate.isNumberValue(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeTruthy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeTruthy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeTruthy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeTruthy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeTruthy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeTruthy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeTruthy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeTruthy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isObject', () => {
    const testValue = function(value) {
        return validate.isObject(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeTruthy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeTruthy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isString', () => {
    const testValue = function(value) {
        return validate.isString(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeTruthy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeTruthy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeTruthy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeTruthy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeTruthy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeFalsy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeTruthy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});

describe('Test isUndefined', () => {
    const testValue = function(value) {
        return validate.isUndefined(value)
    };

    test('Test -1', () => {
        expect(testValue(-1)).toBeFalsy();
    });
    test('Test 0', () => {
        expect(testValue(0)).toBeFalsy();
    });
    test('Test 1', () => {
        expect(testValue(1)).toBeFalsy();
    });
    test('Test 1.123', () => {
        expect(testValue(1.123)).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf()', () => {
        expect(testValue(new Date('01/01/3000').valueOf())).toBeFalsy();
    });
    test('Test new Date(\'01/01/3000\').valueOf() + 1', () => {
        expect(testValue(new Date('01/01/3000').valueOf() + 1)).toBeFalsy();
    });
    test('Test NaN', () => {
        expect(testValue(NaN)).toBeFalsy();
    });
    test('Test Infinity', () => {
        expect(testValue(Infinity)).toBeFalsy();
    });
    test('Test \'1\'', () => {
        expect(testValue('1')).toBeFalsy();
    });
    test('Test true', () => {
        expect(testValue(true)).toBeFalsy();
    });
    test('Test \'false\'', () => {
        expect(testValue('false')).toBeFalsy();
    });
    test('Test \'a\'', () => {
        expect(testValue('a')).toBeFalsy();
    });
    test('Test \'  \'', () => {
        expect(testValue('  ')).toBeFalsy();
    });
    test('Test \' a \'', () => {
        expect(testValue(' a ')).toBeFalsy();
    });
    test('Test []', () => {
        expect(testValue([])).toBeFalsy();
    });
    test('Test [1]', () => {
        expect(testValue([1])).toBeFalsy();
    });
    test('Test {}', () => {
        expect(testValue({})).toBeFalsy();
    });
    test('Test {a: 1}', () => {
        expect(testValue({a: 1})).toBeFalsy();
    });
    test('Test null', () => {
        expect(testValue(null)).toBeFalsy();
    });
    test('Test {}.missing', () => {
        expect(testValue({}.missing)).toBeTruthy();
    });
    test('Test new Date()', () => {
        expect(testValue(new Date())).toBeFalsy();
    });
    test('Test \'12/31/23\'', () => {
        expect(testValue('12/31/23')).toBeFalsy();
    });
    test('Test () => {return true}', () => {
        expect(testValue(() => {return true})).toBeFalsy();
    });
});
