import { HTTPError } from 'superagent'
import request from 'supertest'

import server from '../../src/index'
import { LoginDataInterface } from '../../src/types/types'

const credentials: LoginDataInterface = {
  client_id: 'ju16a6m81mhid5ue1z3v2g0uh',
  email: 'aeiberra@gmail.com',
  name: 'Alan Iberra'
}
const fakeCredentials: LoginDataInterface = {
  client_id: 'fakeCredentials',
  email: 'aeiberra@gmail.com',
  name: 'Alan Iberra'
}

beforeAll(done => {
  done()
})

afterAll(done => {
  server.close()
  done()
})

describe('Test socialPlatform.ts', () => {
  test('/post without credentials', async () => {
    const res = await request(server).get('/api/v1/social/post')
    expect(res.statusCode).toBe(400)
    expect((res.error as HTTPError).text).toContain('Incorrect or missing Token')
  })
  test('/dashboard without credentials', async () => {
    const res = await request(server).get('/api/v1/social/dashboard')
    expect(res.statusCode).toBe(400)
    expect((res.error as HTTPError).text).toContain('Incorrect or missing Token')
  })
  test('/login without credentials', async () => {
    const res = await request(server).post('/api/v1/social/login')
    expect(res.statusCode).toBe(400)
    expect((res.error as HTTPError).text).toContain('Incorrect or missing Client ID')
  })
  test('/login with fake credentials', async () => {
    const res = await request(server).post('/api/v1/social/login').send(fakeCredentials)
    expect(res.statusCode).toBe(401)
    expect((res.error as HTTPError).text).toContain('{"code":"INVALID_CLIENT_ID","message":"INVALID_CLIENT_ID","description":"INVALID_CLIENT_ID"}')
  })
  test('/login without email', async () => {
    const res = await request(server).post('/api/v1/social/login').send({
      client_id: credentials.client_id,
      name: credentials.name
    })
    expect(res.statusCode).toBe(400)
    expect((res.error as HTTPError).text).toContain('Incorrect or missing Email')
  })
  test('/login without name', async () => {
    const res = await request(server).post('/api/v1/social/login').send({
      client_id: credentials.client_id,
      email: credentials.email
    })
    expect(res.statusCode).toBe(400)
    expect((res.error as HTTPError).text).toContain('Incorrect or missing Name')
  })
  test('/login with credentials', async () => {
    const res = await request(server).post('/api/v1/social/login').send(credentials)
    expect(res.statusCode).toBe(200)
    expect(res.body.client_id).toContain(credentials.client_id)
    expect(res.body.email).toContain(credentials.email)
  })
  test('/post with fake credentials', async () => {
    const token: string = 'fakeCredential'
    const page: number = 1
    const res = await request(server).get(`/api/v1/social/post?sl_token=${token}&page=${page}`)

    expect(res.statusCode).toBe(401)
    expect((res.error as HTTPError).text).toContain('{"code":"Invalid SL Token","message":"Invalid SL Token","description":"Invalid SL Token"}')
  })
  test('/post without page', async () => {
    const token: string = 'fakeCredential'
    const res = await request(server).get(`/api/v1/social/post?sl_token=${token}`)

    expect(res.statusCode).toBe(400)
    expect((res.error as HTTPError).text).toContain('Incorrect or missing Page')
  })
  test('/post with credentials', async () => {
    const resLogin = await request(server).post('/api/v1/social/login').send(credentials)
    const token: string = resLogin.body.sl_token
    const page: number = 1
    const res = await request(server).get(`/api/v1/social/post?sl_token=${token}&page=${page}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.page).toBe(page)
  })
  test('/dashboard with fake credentials', async () => {
    const token: string = 'fakeCredential'
    const res = await request(server).get(`/api/v1/social/dashboard?sl_token=${token}`)

    expect(res.statusCode).toBe(401)
    expect((res.error as HTTPError).text).toContain('{"code":"Invalid SL Token","message":"Invalid SL Token","description":"Invalid SL Token"}')
  })
  test('/dashboard with credentials', async () => {
    const resLogin = await request(server).post('/api/v1/social/login').send(credentials)
    const token: string = resLogin.body.sl_token
    const res = await request(server).get(`/api/v1/social/dashboard?sl_token=${token}`)

    expect(res.statusCode).toBe(200)
    // expect(res.body.page).toBe(page)
  })
})
