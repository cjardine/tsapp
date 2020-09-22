const decimalAdjust = (type, value, exp) => {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
};

// Decimal round
const round10 = (value, exp) => {
    return decimalAdjust('round', value, exp);
};

const floor10 = (value, exp) => {
    return decimalAdjust('floor', value, exp);
};

// Decimal ceil
const ceil10 = (value, exp) => {
    return decimalAdjust('ceil', value, exp);
};

export const MATH_UTILITIES = {
    round10,
    floor10,
    ceil10,
};

export default MATH_UTILITIES;
