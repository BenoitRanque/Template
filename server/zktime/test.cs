using System;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

public class Startup
{
    public async Task<object> Invoke(dynamic input)
    {
        Console.WriteLine("hello");
        Console.WriteLine(IntPtr.Size); // show architecture. 4 = 32 bit, 8 = 64 bit
        IntPtr h = ZKTime.Connect(input.ToString());
        Console.WriteLine(h);
        return h;
    }
}

public class ZKTime {
    [DllImport("C:\\Users\\BENOIT\\Dev\\template\\server\\zktime\\plcommpro.dll", EntryPoint = "Connect")]
    public static extern IntPtr Connect(string Parameters);

    // [DllImport("C:\\Users\\desarrollo\\Dev\\template\\server\\zktime\\dll\\plcommpro.dll", EntryPoint = "PullLastError")]
    // public static extern int PullLastError();

    // [DllImport("C:\\Users\\desarrollo\\Dev\\template\\server\\zktime\\dll\\plcommpro.dll", EntryPoint = "Connect")]
    // public static extern IntPtr Connect(string Parameters);

    // [DllImport("C:\\Users\\desarrollo\\Dev\\template\\server\\zktime\\dll\\plcommpro.dll", EntryPoint = "PullLastError")]
    // public static extern int PullLastError();
}

