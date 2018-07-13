Copy-Item ($PSScriptRoot + "/WASP") -Destination "C:\Program Files" -Recurse -Force

$DesktopPath = [Environment]::GetFolderPath("Desktop")

$Shell = New-Object -ComObject ("WScript.Shell")
$ShortCut = $Shell.CreateShortcut($DesktopPath + "\WASP.lnk")
$ShortCut.TargetPath="C:\Program Files\WASP\WASP.exe"
$ShortCut.Arguments=""
$ShortCut.WorkingDirectory = "C:\Program Files\WASP";
$ShortCut.WindowStyle = 1;
# $ShortCut.Hotkey = "CTRL+SHIFT+F";
$ShortCut.IconLocation = "C:\Program Files\WASP\WASP.exe, 0";
$ShortCut.Description = "WASP";
$ShortCut.Save()

Write-Host 'Done!'
Read-Host -Prompt "Press Enter to continue"