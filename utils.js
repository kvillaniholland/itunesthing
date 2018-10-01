export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
export const split = (string, token) => string.split(token)
export const uniq = array => array.filter((el, i, a) => i === a.indexOf(el))
export const splitResponse = string => split(string, '<NEXT>')
export const splitUniq = pipe(splitResponse, uniq)
export const zipArrays = (array1, array2, keys) => array1.map((element, index) => ({[keys[0]]: element, [keys[1]]: array2[index]}))
