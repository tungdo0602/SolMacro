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
#### Apps Setup
+ Install required apps
+ Go to settings, enable developer mode (if you haven't)
+ Enable Wireless Debugging and USB Debugging
+ Open Shizuku and enable it ([Tutorial](https://youtu.be/tm5qvhw7T6Q?si=uNeBvMtabtWX4X9X&t=129))
+ Open settings -> Apps -> Termux -> Battery, choose "Unrestricted", do the same thing with Termux:API
<img src="https://dontkillmyapp.com/assets/img/samsung/samsung13_per_app_4.jpg" width="200"/>

For more infomation go to [here](https://dontkillmyapp.com/) to keep Termux awake

#### Biome Notifier Setup
+ Open Termux, run `termux-setup-storage`
+ Run `pkg install termux-api nodejs git`
+ Run `cd storage && git clone "https://github.com/tungdo0602/BiomeNotifier.git" && cd BiomeNotifier && node main`
+ Open Files, open Termux tab on the dropdown then open storage/BiomeNotifier and edit `config.json`
+ Move `shizuku` folder to outside storage
<img src="https://raw.githubusercontent.com/tungdo0602/BiomeNotifier/refs/heads/main/assets/image1.webp" width="200"/>

+ To start biome notifier, open Termux and run `cd storage/BiomeNotifier && start.sh`
+ Open Roblox and start afk (You can close the Termux window, it will run in background)

#### You can use Termux:widget to add a shortcut to the home screen so you don't need to open Termux and run command again