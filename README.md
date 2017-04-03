# Genge
`yarn global add https://github.com/felixfong227/genge.git`

or

`npm -g install https://github.com/felixfong227/genge.git`

A simple `ExpressJS` template generator

CLI:
```
$ genge [option] [option] --flat --flat
```

## Create your first app
```
$ genge add app pony.com
```
Genge will create some start up folders and files
```
.
├── index.js
├── node_modules/
├── package.json
├── public/
│   ├── index.ejs
│   └── style.css
├── router/
│   └── login.js
└── yarn.lock
```
And with the `--run` flat, what you can do is as soon as Genge finish creating thought files and folder, it will run the app right a way

## Install packages

Once Genge finish create the files, then it will start install some necessary packages such as `express`

By defualt Genge will run:
```
$ npm install
```

But if you want to use the Yarn, what you can do it using that yarn flat `--yarn`
```
$ yarn install
```

# Runing the app

You can use the `--run` flat to tell Genge run the app as soon as everything is OK

## Open the web site right a way

You can also use the `--open` flat to tell Gegen then everything is OK, open the browser and load your express app

PS: Require the `--run` flat to do so

# Router

# Create a new router
```
$ genge add router pony/ponyville/isfun
```

```
.
├── index.js
├── package.json
├── public/
│   ├── index.ejs
│   └── style.css
├── router/
│   ├── login.js
│   └── pony/
│       └── ponyville/
│           └── isfun.js
└── yarn.lock
```

# Removing the router
```
$ genge remove router pony/ponyville/isfun
```