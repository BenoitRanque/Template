(async function () {
  try {

    const ref = require('ref')
    const ffi = require('ffi')

    const zktime = ffi.Library('zkemsdk', {
      'Z_Connect_NET': ['bool', ['string', 'long']]
    })

    let conected = await zktime.Z_Connect_NET('192.168.0.27', 4370);
    console.log(conected)
  } catch (error) {
    console.log(error)
  }
})()