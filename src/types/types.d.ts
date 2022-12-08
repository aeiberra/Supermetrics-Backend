export interface PostData {
  id: string
  from_name: string
  from_id: string
  message: string
  type: string
  created_time: string
}
export interface PostDataInterface {
  posts: PostData[]
  page: number
}

export interface LoginDataInterface {
  client_id: string
  email: string
  name: string
}

export interface TokenInterface extends Omit<LoginDataInterface, 'client_id'> {
  sl_token: string
}

export interface ErrorInterface {
  code: string
  message: string
  description: string
}

export interface PeopleInterface {
  id: string
  name: string
  posts: number
  characters: number
  longestPost: number
  postsPerMonth: number[]
  charactersAverage: number
}

export interface PeopleObjectInterface extends Object<PeopleInterface> {}
