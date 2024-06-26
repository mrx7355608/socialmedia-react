import PropTypes from "prop-types";

export const stringProp = PropTypes.string.isRequired;
export const arrayProp = PropTypes.array.isRequired;
export const arrayPropOptional = PropTypes.array;
export const funcProp = PropTypes.func.isRequired;
export const dateProp = PropTypes.instanceOf(Date).isRequired;
export const booleanProp = PropTypes.bool.isRequired;
export const numberProp = PropTypes.number.isRequired;
