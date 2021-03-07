const { Position } = require('../utils/db')

exports.addPosition = (data) => {
    const position = new Position(data)
    return position.save()
}

exports.listPositions = () => {
  return Position.find({}).sort({_id:-1})
}

exports.removePosition = (id) => {
  return Position.deleteOne({_id: id})
}