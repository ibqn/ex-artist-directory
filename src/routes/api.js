import { Router } from 'express'
import artists from './artists'


const api = Router()

api.use('/artist', artists)

export default api
