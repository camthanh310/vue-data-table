const isObject = (value) => typeof value === 'object'
const isString = (value) => typeof value === 'string'
const isFunction = (value) => typeof value === 'function'
const isArray = (value) => Array.isArray(value)

export {
    isObject,
    isString,
    isFunction,
    isArray
}