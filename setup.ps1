#Microsoft Windows Setup Script
#Remember to Set-ExecutionPolicy Bypass -Scope Process -Force
Write-Host "Remember to Set-ExecutionPolicy Bypass -Scope Process -Force"
#Defining variables
#Defining functions
function setwindowsUpdate{
    #Preparing Update Module
    Register-PSRepository -Default
    Get-PSRepository
    Install-Module -Name PSWindowsUpdate -Force
    Get-Package -Name PSWindowsUpdate
    #Update Windows and AutoReboot after installing updates
    "Installing Windows Updates..."
    Install-WindowsUpdate -MicrosoftUpdate -AcceptAll -AutoReboot
    ###Other Windows Update commands
    #Get-WindowsUpdate -AcceptAll -Install -AutoReboot
    #Get-WindowsUpdate -Install -KBArticleID KB5017308
    #Get-WUHistory
    #Remove-WindowsUpdate -KBArticleID KB5017308 -NoRestart
    #$HideList = "KB5017308"
    #Get-WindowsUpdate -KBArticleID $HideList –Hide
    #Show-WindowsUpdate -KBArticleID $HideList
}
function windows10tweaks{
    #Dark Theme
    Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize -Name AppsUseLightTheme -Value 0
    #Hiding unwanted taskbar elements
    Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Search -Name SearchBoxTaskbarMode -Value 0
    Set-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Feeds" -Name "ShellFeedsTaskbarViewMode" -Value 2
    #Does not add 'Shortcut' to new shortcuts
    REM Does not add "- Shortcut" to new shortcuts
    REG ADD "HKU\%1\Software\Microsoft\Windows\CurrentVersion\Explorer" /v "link" /t REG_BINARY /d 00000000 /f
    #Stops explorer to load changes
    Stop-Process -name explorer -force
    #Installing WSL distributions
    #wsl --install -d Ubuntu
    #wsl --install -d Debian
}
function windows11tweaks{
    ###How to add a new registry property, otherwise, modify them following the rest of commands in the function
    #New-itemproperty "HKLM:\Default\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" -Name "TaskbarDa" -Value "0" -PropertyType Dword
    #Dark Theme
    Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Themes\Personalize -Name AppsUseLightTheme -Value 0
    # Removes Search button from the Taskbar
    Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Search -Name SearchBoxTaskbarMode -Value 0
    # Removes Task View from the Taskbar
    Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced  -Name ShowTaskViewButton -Value 0
    # Removes Widgets from the Taskbar
    Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced  -Name TaskbarDa -Value 0
    # Removes Chat from the Taskbar
    Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced -Name TaskbarMn -Value 0 
    # Default StartMenu alignment 0=Left
    #Set-ItemProperty -Path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced  -Name TaskbarAl -Value 0
    #Stops explorer to load changes
    Stop-Process -name explorer -force
}
#Selecting case
Write-Host "Microsoft Windows Setup Script"
#Read-Host -Prompt "Welcome $env:username`nPlease select an option:`n1. Setup for Workstation`n2. Setup for Server`n3. Update my Windows System`n4. Install Video Drivers`n"
#Getting Windows Version
$windoeVersion=(Get-CimInstance Win32_OperatingSystem).version
"Your current Windows version is $windoeVersion"
$a=(Get-CimInstance Win32_OperatingSystem).version
switch ($a)
{
 "10.0.22000" {
    Write-Host "Basic profile for Windows 11"
    windows11tweaks
    setwindowsUpdate
    continue
}
 '10.0.22631' {
    Write-Host "Basic profile for Windows 11"
    windows11tweaks
    setwindowsUpdate
    continue'Second Block Executes'
    continue
}
 '3'  {
    'Third Block Exectues'
    continue
}
 Default {'Nothing executed'}
}
$b=Read-Host -Prompt "Now you must choose for a use case profile`nPlease select an option:`n1. Basic profile. For the most basic use cases like media playback, internet browsing, office suite, file manipulation, communication and remote assistance. `n2. Gaming profile. Is Basic profile plus popular gaming platforms and utilities, like Steam. `n3. Corporate profile. Delivers the most packages for office work, videocalls, including applications for specific working ecosystems like Microsoft's, Google's and Cisco's.`n4. FOSS profile. Includes ONLY open source alternatives for general use cases. Still on the works.`n6. Exit`n"
#Installing packages
switch ($b)
{
   "1" {
    Write-Host "Installing packages..."
(
    "KDE.Okular.Nightly",
    "Google.Chrome",
    "CodecGuide.K-LiteCodecPack.Mega",
    "AdrienAllard.FileConverter",
    "7zip.7zip",
    "OBSProject.OBSStudio",
    "Oracle.JavaRuntimeEnvironment",
    #"Mozilla.Thunderbird",
    "AnyDeskSoftwareGmbH.AnyDesk",
    #"RustDesk.RustDesk",
    #"Telegram.TelegramDesktop",
    #"TheDocumentFoundation.LibreOffice",
    #"KeePassXCTeam.KeePassXC",
    #"Git.Git"
    "ONLYOFFICE.DesktopEditors"
) | foreach {winget install $_}
   } 
   "2" {#Probably can execute basic case then gaming to avoid repeating so many packages
    Write-Host "Installing packages..."
(
    "CodecGuide.K-LiteCodecPack.Mega",
    "KDE.Okular.Nightly",
    "Spotify.Spotify",
    "AdrienAllard.FileConverter",
    "7zip.7zip",
    "Oracle.JavaRuntimeEnvironment",
    #"Mozilla.Thunderbird",
    "ventoy.Ventoy",
    "RustDesk.RustDesk",
    #"Telegram.TelegramDesktop",
    "TheDocumentFoundation.LibreOffice",
    "Valve.Steam",
    "OBSProject.OBSStudio",
    "Mumble.Mumble.Client"
) | foreach {winget install $_}
   }
   "3" {
    Write-Host "Installing packages..."
(
    "Cisco.WebexTeams",
    "KDE.Okular.Nightly",
    "Cisco.Jabber",
    "Google.Chrome",
    "Google.Drive",
    "CodecGuide.K-LiteCodecPack.Mega",
    "AdrienAllard.FileConverter",
    "7zip.7zip",
    "ventoy.Ventoy",
    "OBSProject.OBSStudio",
    "Oracle.JavaRuntimeEnvironment",
    #"Mozilla.Thunderbird",
    #"AnyDeskSoftwareGmbH.AnyDesk",
    #"RustDesk.RustDesk",
    #"Telegram.TelegramDesktop",
    #"TheDocumentFoundation.LibreOffice",
    #"KeePassXCTeam.KeePassXC",
    #"Git.Git"
    "ONLYOFFICE.DesktopEditors"
) | foreach {winget install $_}
   }
   "4" {
    Write-Host "Installing packages..."
(
    "CodecGuide.K-LiteCodecPack.Mega",
    "KDE.Okular.Nightly",
    "Spotify.Spotify",
    "AdrienAllard.FileConverter",
    "7zip.7zip",
    "ventoy.Ventoy",
    "OBSProject.OBSStudio",
    "Oracle.JavaRuntimeEnvironment",
    #"Mozilla.Thunderbird",
    "RustDesk.RustDesk",
    "Telegram.TelegramDesktop",
    "TheDocumentFoundation.LibreOffice",
    "Valve.Steam",
    "Mumble.Mumble.Client",
    "Microsoft.VisualStudioCode",
    "KeePassXCTeam.KeePassXC",
    "SleuthKit.Autopsy",
    "StrawberryPerl.StrawberryPerl",
    "mRemoteNG.mRemoteNG",
    "DebaucheeOpenSourceGroup",
    "Git.Git",
    "Python.Python.3.11",
    "qBittorrent.qBittorrent"

) | foreach {winget install $_}
   }
   "0" {
     Write-Host "Installing packages..."
(
    "CodecGuide.K-LiteCodecPack.Mega",
    "KDE.Okular.Nightly",
    "AdrienAllard.FileConverter",
    "7zip.7zip",
    "dbeaver.dbeaver",
    "Espanso.Espanso",
    "Gyan.FFmpeg",
    "GIMP.GIMP",
    "KDE.Kdenlive",
    "Oracle.JavaRuntimeEnvironment",
    #"Mozilla.Thunderbird",
    "AnyDeskSoftwareGmbH.AnyDesk",
    "ventoy.Ventoy",
    "RustDesk.RustDesk",
    "OBSProject.OBSStudio",
    "Google.Chrome",
    #"Telegram.TelegramDesktop",
    "TheDocumentFoundation.LibreOffice",
    "qBittorrent.qBittorrent",
    "Mozilla.Thunderbird",
    "KDE.Okular",
    "RedHat.Podman",
    "RedHat.Podman-Desktop",
    "KeePassXCTeam.KeePassXC",
    "Microsoft.VisualStudioCode"
    #"Spotify.Spotify"
) | foreach {winget install $_}
   }
   Default {
    'Nothing will be installed'
   }
}
#Setting up a new hostname
#Write-Host "Please, provide a name for your computer:"
#ForegroundColor Green
#$ComputerName = Read-Host
#Rename-Computer -NewName "$ComputerName"