const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains, findTitle, newVillains } = require('../../controller/villainscon')
const models = require('../../Models')
const { villainsList, singleVillain } = require('./mocks/villains')

chai.use(sinonChai)
const { expect } = chai

describe('Controllers - villainscon', () => {
  describe('getAllVillains', () => {
    it('should return a list of villains', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
  describe('findTitle', () => {
    it('should find slug in the villains list', async () => {
      const request = { params: { slug: 'find-slug' } }
      const stubSendStatus = sinon.stub()
      const response = { send: stubSendStatus }

      const stubFindOne = sinon.stub(models.villains, 'findOne').returns(singleVillain)

      await findTitle(request, response)

      expect(stubFindOne).to.have.been.calledWith({ where: { slug: request.params.slug } })
    })
  })
  describe('newVillains', () => {
    it('creates a hero', async () => {
      const villa = {
        name: 'Will',
        movie: 'Good Will Hunting',
        slug: 'Wills'
      }
      const request = { body: villa }
      const stubStatus = sinon.stub()
      const stubSend = sinon.stub()
      const response = {
        status: stubStatus.returns({ send: stubSend })
      }
      const stubbedCreate = sinon.stub(models.villains, 'create').returns(villa)

      await newVillains(request, response)
      expect(stubStatus).to.be.calledWith(201)
      expect(stubSend).to.be.calledWith(villa)
    })
  })
})
