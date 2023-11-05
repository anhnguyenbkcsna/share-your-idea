# Getting Started

# Before running

Running link-module-alias for shorter relative path

```sh
    yarn run postinstall
```

Install all package

```sh
    yarn add
```

Start the development server

```sh
    yarn start
```

Components

1. Deconstruct props
2. Define state, formRef,...
3. Define function -> declare state and bind your class methods to the class instance
4. return JSX

```
yarn add @babel/preset-react -D
```

This resolve the JSX Parsing Error from eslintrc

Setup Eslint Formatt On Save: settings.json

```
"eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.workingDirectories": [{ "mode": "auto" }]
```
