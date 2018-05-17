const edge = require('edge-js');

// var test = edge.func({
//   references: [
//     './dll/plcommpro.dll',
//     './dll/plcomms.dll',
//     './dll/plrscagent.dll',
//     './dll/plrscomm.dll',
//     './dll/pltcpcomm.dll',
//     './dll/plusbcomm.dll'
//   ],
//   source: require('./test.cs')
// })


// var test = edge.func({
//   // references: [
//   //   './zktime/dll/plcommpro.dll',
//   //   './zktime/dll/plcomms.dll',
//   //   './zktime/dll/plrscagent.dll',
//   //   './zktime/dll/plrscomm.dll',
//   //   './zktime/dll/pltcpcomm.dll',
//   //   './zktime/dll/plusbcomm.dll'
//   // ],
//   source: function () {/*
//     using System;
//     using System.Runtime.InteropServices;
//     using System.Threading.Tasks;

//     public class Startup
//     {
//       public async Task<object> Invoke(string input)
//       { 
//         return Helper.Connect(input);
//       }
//     }

//     static class Helper
//     {
//         [DllImport("C:\\Users\\desarrollo\\Dev\\template\\server\\zktime\\dll\\plcommpro.dll", EntryPoint = "Connect")]
//         public static extern IntPtr Connect(string Parameters);

//         public static int AddSeven(int v) 
//         {
//             return v + 7;
//         }
//     }

//   */}
// });


var test = edge.func({
  source: require('path').join(__dirname, 'test.cs')
})

// test(1, (err, response) => {
//   console.log(response)
// })
test('protocol=TCP,ipaddress=192.168.0.27,port=4370,timepout=4000,passwd=', (err, response) => {
  if (err) throw err
  console.log(response)
})
