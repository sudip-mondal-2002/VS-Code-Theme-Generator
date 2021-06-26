# VS-Code-Theme-Generator

## Create your Own VS Code Theme

### Install yo generator-code

```cmd
$ npm install -g yo generator-code
```

### Run the extension generator

```cmd
$yo code

# ? What type of extension do you want to create? New color theme(TypeScript)
# ? What's the name of your extension? mytheme
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? mytheme
# ? What's the description of your extension? this is a theme
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? npm

code ./mytheme
```

## Go to the website created using this repository

* Add your colour schemes
* Get the json file
* Replace your json file inside the theme directory usng this file

## Package your project using vsce
* Create a azure devops account or sign in if you have aleready one
* Create a access token
* Go to vscode marketplace and create a publisher ID
* install vsce extension and publish you package from your terminal
