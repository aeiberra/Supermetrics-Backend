import { PostData } from '../types/types'
import { getMonth } from './utils'

export const updateUserInfo = (usersObject: any, data: PostData): void => {
  usersObject[data.from_id].posts++
  usersObject[data.from_id].characters = +usersObject[data.from_id].characters + data.message.length
  usersObject[data.from_id].charactersAverage = usersObject[data.from_id].characters / usersObject[data.from_id].posts
  if (String(usersObject[data.from_id].longestPost).length < data.message.length) usersObject[data.from_id].longestPost = data.message
  const monthIndex = getMonth(data.created_time)
  usersObject[data.from_id].postsPerMonth[monthIndex]++
}

export const createUserInfo = (usersObject: any, data: PostData): void => {
  usersObject[data.from_id] = {
    id: data.from_id,
    name: data.from_name,
    posts: 1,
    characters: data.message.length,
    longestPost: data.message,
    postsPerMonth: new Array(12).fill(0)
  }
  const monthIndex = getMonth(data.created_time)
  usersObject[data.from_id].postsPerMonth[monthIndex]++
}
