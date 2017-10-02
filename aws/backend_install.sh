

#build+package backend
cp -r ../backend/ ./backend/
cp ../package.json ../package-lock.json .
zip -r backend_build.zip ./backend/ ./package.json ./package-lock.json
rm -rf ./backend/ package.json package-lock.json
scp -i ~/.aws/mypagecomments_keypair.pem backend_build.zip ~/.aws/credentials ec2-user@34.215.58.13:~
ssh -i ~/.aws/mypagecomments_keypair.pem ec2-user@52.27.95.205 'bash -s' << EOF

mkdir ~/.aws
mv credentials ~/.aws

sudo yum -y update
sudo yum -y install unzip
sudo yum -y install gcc

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 8.1.0

sudo pip install nltk
sudo pip install boto3
sudo pip install twython
sudo python -m nltk.downloader -d /usr/local/share/nltk_data all-nltk

unzip backend_build.zip
rm -rf backend_build.zip

nvm use 8.1.0
npm install
npm install forever -g

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000

forever start backend/index.js

EOF

rm -rf backend_build.zip

# sudo ln -s /usr/local/bin/pip /usr/bin/pip IF NEEED INSERT ON LINE 20
