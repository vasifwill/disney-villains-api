const villains = (connection, Sequelize) => {
  return connection.define('villains', {
    name: { type: Sequelize.STRING, primaryKey: true },
    movie: { type: Sequelize.STRING },
    slug: { type: Sequelize.STRING }
  }, { paranoid: true })
}

module.exports = villains
