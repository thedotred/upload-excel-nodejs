// Validate date
function isDate(d){
    return typeof(d) !== 'object' || !Date.parse(d) || Date.parse(d) < 1;
}

// Validate Number
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Validate Boolean
function isBoolean(b) {
    return typeof(b) === 'boolean';
}

// Validate String
function isString(s) {
    return typeof(s) === 'string';
}

module.exports = {
    isDate,
    isNumeric,
    isBoolean,
    isString
}