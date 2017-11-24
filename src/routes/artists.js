import { Router } from 'express'
import { Artist } from '../models/artist'


const artists = Router()

// define the mongobd ObjectId filter once for all routes
const objectIdFilter = "[0-9,a-f]*"

// GET all items
artists.get('/', async (req, res) => {
  const artistsList = await Artist.find({})
  res.json({
    status: 'success',
    result: artistsList
  })
})

// define search route with additiona options: sort, order
artists.get('/search/(:term|)', async (req, res) => {
  try {
    let filter = {}
    if (req.params.term) {
      filter = {
        name: new RegExp(req.params.term, 'i')
      }
    }
    // sort by name
    let field = ('sort' in req.query && ['name', 'reknown'].indexOf(req.query.sort) >= 0) ? req.query.sort : 'name'
    let order = ('order' in req.query && ['asc', 'desc'].indexOf(req.query.order) >= 0) ? req.query.order : 'asc'
    /*
    if ('sort' in req.query && ['name', 'reknown'].indexOf(req.query.sort) >= 0) {
      field = req.query.sort
    }
    if ('order' in req.query && ['asc', 'desc'].indexOf(req.query.order) >= 0) {
      order = req.query.order
    }
    */
    console.log(`order by '${order}'`)
    console.log(`sort by '${field}' field`)
    const sort = { [field]: order }
    const searchList = await Artist.find(filter, null, { sort })
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

// GET: get one item by its ID
artists.get(`/:artistId(${objectIdFilter})`, async (req, res) => {
  try {
    const artist = await Artist.findById({ _id: req.params.artistId })
    res.json({
      status: 'success',
      result: artist
    })
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error.message
    })
  }
})

// POST: add new item
artists.post('/', async (req, res) => {
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

// PUT: update an existing item by ID
artists.put(`/:artistId(${objectIdFilter})`, async (req, res) => {
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

// DELETE: remove an existing item by ID
artists.delete(`/:artistId(${objectIdFilter})`, async (req, res) => {
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

export default artists
