---
title: Windows & pm2 or NSSM
weight: 20
---

## A cross roads
You now either have two choices, you can either use pm2 (easier) or NSSM (a bit harder) to start the rustdesk server
There are some benefits to using NSSM:
- Backwards compatibility with older windows (Windows Server 2008R2/Windows 7 and earlier although untested).
- Ideal for Windows Server
- Auto start on boot without login (The user who created the startup entry does not need to log on for it to start).
- Running both binaies as Services.
- Standalone (no dependency on nodejs)

While the benefits of pm2 include:
- Good idea if you run the server on the same computer as your main work computer
- You logon regularly to the user that created the rustdesk startup entry
- More user friendly

## Installing using NSSM

### Installing NSSM
Please [download](https://nssm.cc/release/nssm-2.24.zip) and extract NSSM select the appropriate 
architecture to your windows system (if x86 use the contents of the win32 folder, if x64 use the 
contents of win64 folder). It is also best practice to move the binary of NSSM into the 
`Program Files\NSSM` (NSSM once started as a service, it cannot be moved from the directory it was placed in.
thus it is best to tuck it away in Program files) directory of your Installation drive (Usually the C drive). 
It is also advisable to add the path (such as `C:\Program Files\NSSM`) to the path variable. 


### Checking if NSSM is installed properly
If you've done everything correctly the folder `C:\Program Files\NSSM` (in this example I use the C: 
drive but you can use whatever drive you installed windows to or whatever path you desire) should 
only contain the file `nssm.exe`. 

We will be using `C:\Program Files\NSSM` in this example

Open Command prompt and run `nssm` if you see a help page you are ready to move onto the next step

### Run hbbr and hbbs
Download the Windows version of [server program](https://github.com/rustdesk/rustdesk-server/releases). 
Unzip the program to the `C:\Program Files\RustDesk Server` (or anywhere you desire just make sure it
doesn't change after the service is installed). now get back to Command prompt

We will be using `C:\Program Files\RustDesk Server` in this example
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe" -r 0.0.0.0 -k _
nssm install "RustDesk hbbr Service" "C:\Program Files\RustDesk Server\hbbr.exe" -k _
```
**Note:**
- You can change `RustDesk hbbs service` to whatever you desire to name hbbs the service
- You can change `RustDesk hbbr service` to whatever you desire to name hbbr the service
- You can change `C:\Program Files\RustDesk Server\hbbs.exe` to wherever you placed the rustdesk binaries
- You can change `C:\Program Files\RustDesk Server\hbbr.exe` to wherever you placed the rustdesk binaries
- You do not need the `-k _` option which is optional, it's just for better security

**Command templates:**

The command template in case you just want to copy and paste and edit.

```cmd
nssm install <Desired hbbs servicename> <RustDesk hbbs binary path> <RustDesk hbbs arguments>
nssm install <Desired hbbr servicename> <RustDesk hbbr binary path> <RustDesk hbbr arguments>
```

**Start services**
After successful instalationof services they need to be started.
```cmd
nssm start <Desired hbbs servicename>
nssm start <Desired hbbr servicename>
```


**Done !**

(The method above has been tested on Windows Server Core 2022 Standard).

## or

## Installing using pm2

### Install NodeJs

Please [download](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) and install NodeJS.
NodeJs is the runtime environment of pm2, so you need to install NodeJs first。

### Install pm2

Enter belows in `cmd.exe`, press the <kbd>Enter</kbd> key for each line, and run them line by line.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Run hbbr and hbbs

Download the Windows version of [server program](https://github.com/rustdesk/rustdesk-server/releases). Unzip the program to the C: drive. Run the following four commands (take care to edit the `-r` parameter):

```cmd
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r <The host where hbbr is running>
pm2 start hbbr.exe 
pm2 save
```

### View the log

```cmd
pm2 log hbbr
pm2 log hbbs
```
