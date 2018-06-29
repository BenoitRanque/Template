const Model = require('@tools/model')
const { HasOneRelation, BelongsToOneRelation, HasOneThroughRelation, HasManyRelation, ManyToManyRelation } = Model
const parse = require('date-fns/parse')

module.exports = class HRAttTimetable extends Model {
  static get tableName () { return 'hr_att_timetable' }
  static get idColumn () { return 'timetable_id' }
  static get relationMappings () {
    const AttType = require('./AttType')
    return {
      'type': {
        relation: HasOneRelation,
        modelClass: AttType,
        join: {
          from: this.tableName + '.type_id',
          to: AttType.tableName + '.type_id'
        }
      }
    }
  }
  async $beforeInsert (ctx) {
    this.created_at = new Date().toISOString();
    this.start_time ? this.start_time = this.start_time.match(/T[^.]*/) : null
    this.end_time ? this.end_time = this.end_time.match(/T[^.]*/) : null
    this.duration = `${this.duration.hours}:${this.duration.minutes}:${this.duration.seconds}`.replace(/(?<![0-9])[0-9]/, '0$1')
  }

  async $beforeUpdate (ctx) {
    this.created_at = new Date().toISOString();
    this.start_time ? this.start_time = this.start_time.match(/T[^.]*/) : null
    this.end_time ? this.end_time = this.end_time.match(/T[^.]*/) : null
  }
  
  async $afterGet (ctx) {
    console.log(this)
  this.start_time ? this.start_time = parse('2000-00-00T'+this.start_time.match(/[^-]*/)) : null
  this.end_time ? this.end_time = parse('2000-00-00T'+this.end_time.match(/[^-]*/)) : null
    // this.duration ? this.duration = parse(`${this.duration.hours ? this.duration.hours : 0}:${this.duration.minutes ? this.duration.minutes : 0}`) : null
    console.log(this)
    return this
  }
}
