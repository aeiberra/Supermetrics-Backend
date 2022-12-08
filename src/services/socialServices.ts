import { httpsRequest } from '../api/httpRequest'
import { PostDataInterface, LoginDataInterface, TokenInterface, ErrorInterface, PostData, PeopleObjectInterface } from '../types/types'
import { createUserInfo, updateUserInfo } from '../utils/dashboard'

export const getEntries = async (token: string, page: string): Promise<PostDataInterface | ErrorInterface> => {
  const posts = await httpsRequest({
    body: '',
    options: {
      method: 'GET',
      path: `/assignment/posts?sl_token=${token}&page=${page}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  })

  return posts.data ?? posts.error
}

export const registerToken = async (LoginData: LoginDataInterface): Promise<TokenInterface | ErrorInterface> => {
  const token = await httpsRequest({
    body: JSON.stringify(LoginData),
    options: {
      method: 'POST',
      path: '/assignment/register',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  })

  return token.data ?? token.error
}

export const getDashboard = async (token: string): Promise<PeopleObjectInterface> => {
  const usersObject: any = {}
  // The correct way is that this number is obtained through an api
  let numberOfPages: number = 10

  do {
    const post = await getEntries(token, numberOfPages.toString())

    if ('posts' in post && post.posts instanceof Array) {
      post.posts.forEach((data: PostData) => {
        usersObject[data.from_id] !== undefined
          ? updateUserInfo(usersObject, data)
          : createUserInfo(usersObject, data)
      })
    } else return post as ErrorInterface
  } while ((numberOfPages--) !== 1)
  return usersObject
}
