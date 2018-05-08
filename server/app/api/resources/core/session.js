module.exports = {
  async login ({ session, fields }, tools, { username, password }, params) {
    const bcrypt = require('bcrypt')
    const User = require('@models/core/User')

    let user = await User.query().where({ username }).eager('role.privileges.privilege').first()	
    if (!user) throw new Error(401)	

    let auth = await bcrypt.compare(password, user.password)	
    if (!auth) throw new Error(401)	

    delete user.password	
    
    let {
      user_id,
      displayname,
      role
    } = user

    session.user = {
      user_id,
      username,
      displayname,
      role: role.map(({ role_id }) => role_id)
    }

    let privileges = {}
    role.forEach(role => {
      role.privileges.forEach(privilege => {
        let { resource, action, possession } = privilege.privilege
        if (!privileges[resource]) privileges[resource] = {}
        if (!privileges[resource][action]) privileges[resource][action] = []
        if (!privileges[resource][action].includes(possession)) privileges[resource][action].push(possession)
      })
    })
    return {
      user_id,
      username,
      displayname,
      privileges
    }
  },
  async logout ({ session }, { authenticate }, data, params) {
    authenticate()

    session.destroy()
  }
}
