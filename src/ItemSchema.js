class ItemSchema {
  constructor(object) {
    console.log(object)
    this.props = object
    this.props.description = "No description! Add your own?"
  }
  toObject() {
    return this.props
  }
}
module.exports = ItemSchema
