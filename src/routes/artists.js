import { Router } from 'express'
import { Artist } from '../models/artist'


const heroes = Router()

// define the mongobd ObjectId filter once for all routes
const objectIdFilter = "[0-9,a-f]*"

// GET all heroes
heroes.get('/', async (req, res) => {
  const artistsList = await Artist.find({})
  res.json({
    status: 'success',
    result: artistsList
  })
})

heroes.get('/search/:term', async (req, res) => {
  try {
    const searchList = await Artist.find({
      name: new RegExp(req.params.term, 'i')
    })
    res.json({
      status: 'success',
      result: searchList
    })
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// GET: get one hero by its ID
heroes.get(`/:heroId(${objectIdFilter})`, async (req, res) => {
  try {
    const hero = await Artist.findById({ _id: req.params.heroId })
    res.json({
      status: 'success',
      result: hero
    })
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// POST: add new hero
heroes.post('/', async (req, res) => {
  try {
    const artist = new Artist(req.body)
    const savedHero = await artist.save()
    res.status(201).json({
      status: 'success',
      result: savedHero
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// PUT: update an existing hero by ID
heroes.put(`/:artistId(${objectIdFilter})`, async (req, res) => {
  try {
    const artist = await Artist.findOneAndUpdate({ _id: req.params.artistId }, req.body, { new: true })
    res.json({
      status: 'success',
      result: artist
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// DELETE: remove an existing hero by ID
heroes.delete(`/:artistId(${objectIdFilter})`, async (req, res) => {
  try {
    const artist = await Artist.findOneAndRemove({ _id: req.params.artistId })
    if (artist === null) throw new Error('Item does not exist')
    res.status(204).json()
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

export default heroes
