# react-todo-list
Todo list app with React and an Express + Mysql backend.

## Installation

### API

#### Requirements

You must have [Knex.js](http://knexjs.org/) installed globally.

```bash
npm i knex -g
```

#### Installation

1. You must save the .env.example file as .env and modify the environment variables to coincide with your system.

```bash
cp .env.example .env
```

2. Install modules on `package.json`

```bash
npm install
```

3. Execute migrations

```bash
knex migrate:latest
```

4. Run the Node.js server

```bash
node server.js
```

### Client

#### Installation

1. You must save the .env.example file as .env and modify the environment variables to coincide with your system.

```bash
cp .env.example .env
```

2. Install modules on `package.json`

```bash
npm install
```

4. Run the React app

```bash
npm run start
```
