const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')
const tokenBuilder = require('./middleware/token-builder')
const bcrypt = require('bcryptjs')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async() => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe(`[POST] /api/auth/register`, () => {
  it(`creates a user given valid information`, async () => {
    await request(server).post('/api/auth/register').send({ username: 'I Am Groot', password: 'I Am Groot' })
    let groot = await db('users').where('username', 'I Am Groot').first()
    expect(bcrypt.compareSync('I Am Groot', groot.password)).toBeTruthy()
    groot = await db('users').where('username', 'I Am Groot').select('username').first()
    console.log(groot)
    expect(groot).toEqual({username: 'I Am Groot'})
  })
  
  it(`requires a valid username and password to register`, async () => {
    let res = await request(server).post('/api/auth/register').send({ username: 'Rocket Raccoon'})
    expect(res.body.message).toMatch(/username and password required/i)
    expect(res.status).toBe(422)
  })
})

describe(`[POST] /api/auth/login`, () => {
  it(`permits a user to log in with proper credentials`, () => {

  })

  it(`requires a valid username and password to log in`, () => {

  })
})

describe(`[GET] /api/auth/login`, () => {
  it(`permits a user to view the jokes when logged in`, () => {

  })

  it(`denies access to jokes when not logged in`, () => {

  })
})