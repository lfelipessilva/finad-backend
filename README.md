# Finad!

Finad is a simple finance administrator app.

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Built Using](#built_using)

## About <a name = "about"></a>
This project exists because i wanted to understand better practices to create simple applications.<br />
And also managing your own money suited this case perfectly, it is not too complex, but involves some thinking about the better way to create the architecture.  

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites
You will need [docker](https://docs.docker.com/) and [docker-compose](https://docs.docker.com/compose/) (or other database solution), and the [NestJS CLI](https://docs.nestjs.com/cli/overview)

```bash
$ npm i -g @nestjs/cli
```

### Installing
A step by step series of examples that tell you how to get a development env running.

#### Install NestJS CLI
```bash
$ npm i -g @nestjs/cli
```

#### Install dependencies
```bash
$ yarn
```
or
```bash
$ npm
```

#### Run docker
```bash
$ docker-compose up -d
```

#### Run application
```bash
$ yarn start:dev
```

End with an example of getting some data out of the system or using it for a little demo.

## 🔧 Running the tests <a name = "tests"></a>
For testing all you need to do is run the test command

```bash
$ yarn test
```

## 🎈 Usage <a name="usage"></a>
For using, you will need to create and user first, then authenticating it. after that you can create accounts, expenses and incomes and fetch them with filters.

All API docs can be found in the <b>localhost:3000/docs</b> route.

## ⛏️ Built Using <a name = "built_using"></a>
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Typescript](https://www.typescriptlang.org/) - Language
- [NestJS](https://nestjs.com/) - Backend Framework 
- [PostgreSQL](https://www.postgresql.org/) - Databse

## ✍️ Authors <a name = "authors"></a>
- [@lfelipessilva](https://github.com/lfelipessilva) - One man army