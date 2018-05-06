const AccessControl = require('accesscontrol')
const grants = [{ role: 'admin', resource: 'user', action: 'read:any', attributes: ['username', 'friends', 'role.*']}]
const ac = new AccessControl(grants)
const permission = ac.permission({ role: 'admin', action: 'read:any', resource: 'user' })
console.log(permission)
const data = [{
  username: 'foo',
  password: 'fub',
  friends: {
    name: 'pedro',
    age: 5
  },
  role: [
    {
      role_name: 'a name'
    }
  ]
}]
console.log(permission.filter(data))