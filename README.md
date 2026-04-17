# Biome Notifier
#### Simple Sol's RNG macro for android

## Table of contents (Read FAQ first before asking)
+ [Features](#features)
+ [Installation](#installation)
+ [Setup](#setup)
+ [FAQ](#faq)


## Features
+ Biome detection & notifier
+ Anti AFK (Beta)
+ Auto roll biome (Beta)
+ Merchant detection (Todo)
+ Fish automation (Todo)

## Installation
#### Required apps:
+ [Termux](https://github.com/termux/termux-app)
+ [Termux:API](https://github.com/termux/termux-api)
+ [Shizuku (by thedjchi)](https://github.com/thedjchi/Shizuku)
+ [QuickEdit (optional, for edit config)](https://play.google.com/store/apps/details?id=com.rhmsoft.edit)
+ [Termux:Widget (optional)](https://github.com/termux/termux-widget)

## Setup
#### Apps Setup
+ Install required apps
+ Go to settings, enable developer mode (if you haven't)
+ Enable **Wireless Debugging**, **USB Debugging** and **Disable child process restrictions** (if you have this one)
+ Open Shizuku and open its settings, then enable **Start on boot** and **Watchdog**.
+ After that go back and start it ([Tutorial](https://youtu.be/tm5qvhw7T6Q?si=uNeBvMtabtWX4X9X&t=129))
+ Open settings -> Apps -> Termux -> Battery, choose "Unrestricted", do the same thing with Termux:API
<img src="https://dontkillmyapp.com/assets/img/samsung/samsung13_per_app_4.jpg" width="200"/>

For more infomation go to [here](https://dontkillmyapp.com/) for specific android phone

#### Biome Notifier Setup
+ Open Termux, and run these commands
```bash
termux-setup-storage
```
```bash
bash <(curl -s https://raw.githubusercontent.com/tungdo0602/SolMacro/refs/heads/main/assets/scripts/setup.sh)
```
+ Open QuickEdit -> open (SAF), then heads to Termux tab on the dropdown and open `storage` -> `SolMacro` folder and edit `config.json`
<img src="https://raw.githubusercontent.com/tungdo0602/SolMacro/refs/heads/main/assets/image2.webp" width="200"/>
<img src="https://raw.githubusercontent.com/tungdo0602/SolMacro/refs/heads/main/assets/image3.webp" width="200"/>
<img src="https://raw.githubusercontent.com/tungdo0602/SolMacro/refs/heads/main/assets/image1.webp" width="200"/>

+ To start biome notifier, open Termux and run (No need to run commands above if you've already ran it)
```bash
cd storage/SolMacro && bash start.sh`
```
+ Open Roblox and start afk (You can close the Termux window, it will run in background)

#### You can use Termux:widget to add a shortcut to the home screen so you don't need to open Termux and run command again

## FAQ
+ **Why I don't see start button in Shizuku?**
- You need to have Android 11+ in order to have **Wireless Debugging**

+ **Why biome notifier/detection not working?**
- Possible Solutions:
  + Make sure **Shizuku is running**, try press start button again to restart service
  + Open settings and make sure **Logger buffer size** is >= **1M**
  + Make sure you disable **Battery Optimization** for Termux, Termux:API and Shizuku
  + Try lock/pin **Shizuku** and **Termux** window
<img src="https://dontkillmyapp.com/assets/img/samsung/samsung_keep_open.jpg" width="200"/>