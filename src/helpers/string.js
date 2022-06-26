const startCase = (value) => {
    return value.replace(/_/g, ' ')
                .replace(/([a-z])([A-Z])/g, (value, $1, $2) => `${$1} ${$2}`)
                .replace(/(\s|^)(\w)/g, (value, $1, $2) => `${$1}${$2.toUpperCase()}`)
}

const camel = (value) => {}
const kebab = (value) => {}
const lcfirst = (value) => {}
const length = (value) => value.length()
const limit = (value) => {}
const lower = (value) => value.toLowerCase()
const upper = (value) => value.toUpperCase()
const snake = (value) => {}
const title = (value) => {}

export {
    startCase,
    lower,
    upper,
    length
}