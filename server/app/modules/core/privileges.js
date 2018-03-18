module.exports = [
  {
    name: 'admin',
    description: 'The best privilege',
    resources: {
      'get': [],
      'post': [],
      'put': [],
      'delete': [],
      'socket': []
    }
  }
].forEach(p => p.module = 'core')
