module.exports = {
  async login ({ session, fields }, tools, { username, password }, params) {
    const bcrypt = require()
    const User = require('@models/core/User')

    let user = await User.query().where({ username }).eager('role').first()	
    if (!user) throw new Error(401)	

    let auth = await bcrypt.compare(password, user.password)	
    if (!auth) throw new Error(401)	

    delete user.password	
    
    session.user = user	

    let permission = permission(User.resource, 'read', 'own')

    if (!permission.granted) return

    let result = await User.query().belongsTo(user.user_id).eagerFromFields(fields)
    
    return permission.filter(results)
  },
  async logout ({ session }, { authenticate }, data, params) {
    authenticate()

    session.destroy()
  }
}