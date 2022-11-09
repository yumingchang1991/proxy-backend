import express from 'express'
import request from 'supertest'
import route from '../routes'
import app from '../app'

describe('testing ETF Controller', () => {
  test('get correct ETF', async () => {
    const res = await request(app).get('/api/VTI/eod')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('status')
    expect(res.body).toEqual({ status: 'error', message: "Your access token is invalid" })
  })
})
