# Show me the money

##Based on react-starter-kit

This app is using IndexedDB for storage. It is my first time with IndexedDB 
and I recommend to run it in incognito mode due to possible initialisation issues

Listening to changes is done by simple interval handler

There's no styling and optimisations, I don't really think that's important for that task

But if you guys think that the app should be good looking I could update it

Source code is not arranged well but it's fine for that size of project

Some application parameters such as interest rates or risk parameters are defined in ./src/routes/Loan/modules/loan.js file

## Requirements
* node `^4.5.0`
* yarn `^0.17.0` or npm `^3.0.0`

## Install from source

First, clone the project:

```bash
$ git clone https://github.com/kniknak/show-me-the-money.git <my-project-name>
$ cd <my-project-name>
```

Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
$ yarn install    # Install project dependencies
$ yarn dev        # Compile and launch (same as `npm run dev`)
$ npm run dev     # Launch app on http://localhost:3009, port could be changed in ./config/project.config.js file
```

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note, however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and patterns for building scalable applications. If you wish to read more about this pattern, please check out this [awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```
.
├── bin                      # Build/Start scripts
├── config                   # Project and build configurations
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── components           # Global Reusable Presentational Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── CoreLayout.js    # CoreLayout which receives children for each route
│   │   └── CoreLayout.scss  # Styles related to the CoreLayout
│   │   └── index.js         # Main file for layout
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Loan             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```
