// const AccessControl = require('accesscontrol')
// const grants = [{ role: 'admin', resource: 'user', action: 'read:any', attributes: ['username', 'friends', 'role.*']}]
// const ac = new AccessControl(grants)
// const permission = ac.permission({ role: 'admin', action: 'read:any', resource: 'user' })
// console.log(permission)
// const data = [{
//   username: 'foo',
//   password: 'fub',
//   friends: {
//     name: 'pedro',
//     age: 5
//   },
//   role: [
//     {
//       role_name: 'a name'
//     }
//   ]
// }]
// console.log(permission.filter(data))


function test1 (param) {
  test2(param)
}

function test2 ({ message } = {}) {
  console.log(message)
}

test1({ message: 'hi'})
test1({ })
test1()
test1(null)
test1(false)
test1({ message: 'hello'})