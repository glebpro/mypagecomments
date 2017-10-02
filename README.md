# mypagecomments

Frontend/backend/build+deploy code for `https://mypagecomments.com` a site that allows users to analyze their Facebook page comments.

## Setup

```
$ git clone this_url that_dir/
$ npm install
```

## Run frontend

```
$ npm run front
```

Visit `http://localhost:3001/`
Server is visible from the local network as well.

## Run backend
```
$ npm run back
```

Visit `http://localhost:3000/`

## Run both

```
$ npm run both
```

## Build (production)

Build will be placed in the `build` folder.
### TODO: this will only build frontend

```
$ npm run frontend_build
```

## Deploy

Run a build a deploy it to s3 bucket, create a `.aws.json` from `aws-example.json`

```
gulp deploy
```

## Icons
Use [realfavicongenerator](http://realfavicongenerator.net/)

Based off [Marvin Boilerplate](https://github.com/glebpro/gleb-react-seed)
