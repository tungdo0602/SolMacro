# Biome Notifier
#### Simple biome detection for android

## Installation
#### Required apps:
+ [Termux](https://github.com/termux/termux-app)
+ [Termux:API](https://github.com/termux/termux-api)
+ [Shizuku (by thedjchi)](https://github.com/thedjchi/Shizuku)
+ [Files (optional, for access termux storage)](https://play.google.com/store/apps/details?id=com.marc.files)
+ [Termux:Widget (optional)](https://github.com/termux/termux-widget)

## Setup
#### 1.1: Apps Setup
+ Install required apps
+ Go to settings, enable developer mode (if you haven't)
+ Enable Wireless Debugging and USB Debugging
+ Open Shizuku and enable it ([Tutorial](https://youtu.be/tm5qvhw7T6Q?si=uNeBvMtabtWX4X9X&t=129))
+ Open settings -> Apps -> Termux -> Battery, choose "Unrestricted", do the same thing with Termux:API
<img src="https://dontkillmyapp.com/assets/img/samsung/samsung13_per_app_4.jpg" width="200"/>
For more infomation go to [here](https://dontkillmyapp.com/) to keep Termux awake

+ Open Termux, run `termux-setup-storage`
+ Run `pkg install termux-api nodejs git`
+ Run `cd storage && git clone "https://github.com/tungdo0602/BiomeNotifier.git && cd BiomeNotifier && node main"`
+ Open Files, open Termux tab on the dropdown then open storage/BiomeNotifier and edit config.json
+ Then run open Termux and run `node main` again to start
+ Open Roblox and start afk