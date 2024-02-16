import PropTypes from "prop-types";

export const stringProp = PropTypes.string.isRequired;
export const arrayProp = PropTypes.array.isRequired;
export const funcProp = PropTypes.func.isRequired;
export const dateProp = PropTypes.instanceOf(Date).isRequired;
