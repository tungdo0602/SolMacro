termux-wake-lock
export PATH="$PATH:$HOME/shizuku"
chmod +x $HOME/shizuku/rish
echo "Checking for update..."
git pull
echo "Starting SolMacro..."
node main.js
