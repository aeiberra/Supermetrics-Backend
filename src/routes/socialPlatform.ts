import express, { RequestHandler } from 'express'
import * as socialServices from '../services/socialServices'
import { checkParamsToToken, checkParamsToPost, checkParamsToDashboard } from '../utils/utils'

const router = express.Router()

router.get('/post', (async (req, res) => {
  try {
    const [slToken, page] = checkParamsToPost(req.query)

    const pages = await socialServices.getEntries(slToken, page)

    let status
    'code' in pages ? status = 401 : status = 200

    res.status(status).json(pages)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}) as RequestHandler)

router.post('/login', (async (req, res) => {
  try {
    const paramsToToken = checkParamsToToken(req.body)

    const token = await socialServices.registerToken(paramsToToken)

    let status
    'code' in token ? status = 401 : status = 200

    res.status(status).json(token)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}) as RequestHandler)

router.get('/dashboard', (async (req, res) => {
  try {
    const slToken = checkParamsToDashboard(req.query)

    const pages = await socialServices.getDashboard(slToken)

    let status
    'code' in pages ? status = 401 : status = 200

    res.status(status).json(pages)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}) as RequestHandler)

export default router
