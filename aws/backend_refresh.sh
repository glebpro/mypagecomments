

# TODO: automatic install
#         node, npm, python, nltk (+nltk.download() packages)

cp -r ../backend/ ./backend/
cp ../package.json ../package-lock.json .
zip -r backend_build.zip ./backend/ ./package.json ./package-lock.json
rm -rf ./backend/ package.json package-lock.json
scp -i ~/.aws/mypagecomments_keypair.pem backend_build.zip ec2-user@34.215.58.13:~
ssh -i ~/.aws/mypagecomments_keypair.pem ec2-user@34.215.58.13 'bash -s' << EOF

source ~/.bash_profile

forever stopall

rm -rf backend/ package.json package-lock.json

unzip backend_build.zip
rm -rf backend_build.zip

nvm use 8.1.0
npm install

forever start backend/index.js

EOF

rm -rf backend_build.zip
