import { ENV } from '../cfg'

export default function (req, res, next) {
  if (ENV === 'dev' && req.get('origin')) res.setHeader('Access-Control-Allow-Origin', req.get('origin'))
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
}
