import { LoginDataInterface } from '../types/types'

const parseClientId = (clientIdFromRequest: any): string => {
  if (!isString(clientIdFromRequest)) {
    throw new Error('Incorrect or missing Client ID')
  }

  return clientIdFromRequest
}

const parseMail = (mailFromRequest: any): string => {
  if (!isString(mailFromRequest) || !isEmail(mailFromRequest)) {
    throw new Error('Incorrect or missing Email')
  }

  return mailFromRequest
}

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing Name')
  }

  return nameFromRequest
}

const parseToken = (tokenFromRequest: any): string => {
  if (!isString(tokenFromRequest)) {
    throw new Error('Incorrect or missing Token')
  }

  return tokenFromRequest
}

const parsePage = (pageFromRequest: any): string => {
  if (!isString(pageFromRequest)) {
    throw new Error('Incorrect or missing Page')
  }

  return pageFromRequest
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isEmail = (email: string): boolean => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return re.test(email)
}

export const checkParamsToToken = (object: any): LoginDataInterface => {
  const paramsToToken: LoginDataInterface = {
    client_id: parseClientId(object.client_id),
    email: parseMail(object.email),
    name: parseName(object.name)
  }

  return paramsToToken
}

export const checkParamsToPost = (object: any): any[string] => {
  const paramsToPost: any[string] = [
    parseToken(object.sl_token),
    parsePage(object.page)
  ]

  return paramsToPost
}

export const checkParamsToDashboard = (object: any): string => {
  const paramsToDashboard: string = parseToken(object.sl_token)

  return paramsToDashboard
}

export const getMonth = (date: string): number => {
  return new Date(date).getMonth()
}
