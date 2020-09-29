const models = require('../models')

const getAllVillains = async (request, response) => {
  const villains = await models.villains.findAll()

  return response.send(villains)
  // return response.send(villains)
}



const findTitle = async (request, response) => {
  const { slug } = request.params
  const foundTitle = await models.villains.findOne({
    where: { slug }
  })

  return response.send(foundTitle)
}

const newVillains = async (request, response) => {
  const { name, movie, slug } = request.body

  if (!name || !movie || !slug) {
    return response.status(400).send('lol')
  }
  try {
    const newVilla = await models.villains.create({ name, movie, slug })

    return response.status(201).send(newVilla)
  } catch (error) {
    return response.status(404).send('unable to create vilain')
  }
}

module.exports = { findTitle, getAllVillains, newVillains }
