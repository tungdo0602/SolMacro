echo "Installing dependencies..."
pkg install termux-api nodejs git
cd storage
git clone -b main "https://github.com/tungdo0602/SolMacro.git"
cd SolMacro
bash setup.sh
npm install
echo "Setting rish..."
mv ./shizuku/ $HOME
echo "Done!"
node main.js