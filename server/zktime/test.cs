using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

// static extern IntPtr Connect(string Parameters);


public class Startup
{
    public async Task<object> Invoke(dynamic input)
    {
        // return Task.Run(()=>
        //     {
        //         return ZKTime.Connect(input.ToString());
        //     }
        // );
        IntPtr h = ZKTime.Connect(input.ToString());
        return await Task.FromResult(h);
    }
}

public class ZKTime {
    [DllImport("C:\\Users\\desarrollo\\Dev\\template\\server\\zktime\\dll\\plcommpro.dll", EntryPoint = "Connect")]
    public static extern IntPtr Connect(string Parameters);

    [DllImport("C:\\Users\\desarrollo\\Dev\\template\\server\\zktime\\dll\\plcommpro.dll", EntryPoint = "PullLastError")]
    public static extern int PullLastError();
}

