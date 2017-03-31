# Genge
`yarn global add genge`

or

`npm -g install genge`

A simple `ExpressJS` template generator

CLI:
```
$ genge [option] [option] --flat --flat
```

## Create your first app
```
$ genge create app appName
```
Genge will create some start up folders and files
```
<Current working directory>
|
+-- <appName>/
	|
    +-- public/
    |	|
    |   +-- index.ejs
    |   +-- style.css
    +-- router/
    |	|
   	|   +--login.js
    +-- index.js
```
And with the `--run` flat, what you can do is as soon as Genge finish creating thought files and folder, it will run the app right a way