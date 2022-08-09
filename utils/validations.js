// If empty
function isEmpty(s) {
    return s === undefined || s === null || s === '';
}

// Validate date
function isDate(d){
    return typeof(d) === 'object' || Date.parse(d) || Date.parse(d) > 1;
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

// Validate Email address
function isEmail(e){
    let expression = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let regex = new RegExp(expression);
    
    return e.match(regex);
}

module.exports = {
    isEmpty,
    isDate,
    isNumeric,
    isBoolean,
    isString,
    isEmail
}