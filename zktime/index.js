(async function () {
  try {

    const ref = require('ref')
    const ffi = require('ffi')
    // const longPtr = ref.refType('long')
    // const intPtr = ref.refType('int')

    const charPtr = ref.refType(ref.types.char)
    const intPtr = ref.refType(ref.types.int)

    const zktime = ffi.Library('plcommpro', {
      'Connect': ['int', ['string']],
      'Disconnect': ['void', ['pointer'] ],
      'GetDeviceParam': ['int', ['pointer', 'pointer', 'int', 'string' ]]
    })

    let conectionString = 'protocol=TCP,ipaddress=192.168.0.27,port=4370,timeout=5000,passwd='
    // let conectionString = 'protocol=TCP,ipaddress=192.168.0.27'

    // let conectionString = ref.allocCString('protocol=TCP,ipaddress=192.168.0.27,port=4370,timeout=5000,passwd=')

    let handle = await zktime.Connect(conectionString);
    console.log(handle)

    // let bufSize = 10 * 1024 * 1024
    // let buf = new Buffer(bufSize)

    // buf.type = ref.types.char

    // let settings = await zktime.GetDeviceParam(handle, buf, bufSize, 'DeviceID')

    // console.log(buf.deref())
    // console.log(settings)

    // if (handle !== 0) {
    //   await zktime.Disconnect(handle)
    //   console.log(handle.deref())
    // }
    // if (conected) {
    //   var state = ref.alloc('long')
    //   await zktime.Z_QueryState(state)
    //   console.log('hi')
    //   console.log(state.deref())
    // }
  } catch (error) {
    console.log(error)
  }
})()