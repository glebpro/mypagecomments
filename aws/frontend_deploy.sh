# build+package+deploy frontend
cd ..
npm run frontend_build
AWS_PROFILE=default gulp deploy
rm -rf ./frontend_build/
cd aws/
