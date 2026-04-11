echo "Remember to start Shizuku before running this!"
termux-wake-lock
export PATH="$PATH:$HOME/shizuku"
chmod +x $HOME/shizuku/rish
node main.js
