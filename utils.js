import {split, uniq, pipe} from 'fandy'

export const splitResponse = string => split(string, '<NEXT>')
export const splitUniq = pipe(splitResponse, uniq)
