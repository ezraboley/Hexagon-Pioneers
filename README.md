# Hexagon Pioneers
Download node and npm<br/>
In project directory, run `npm install` from both ui and backend folder.<br/>
Next, run `npm run backend` then `npm run frontend` from separate shells.<br/>
To run test suite, run `npm test`

<br/>
<br/>
<br/>



## Out of Date

This project was bootstrapped using play-scala-starter-example and
create-react-app.

The overall model is oriented around the backend as a service, and the game
communicates with it over its API (detailed below).

## Running

### Backend

Run this using [sbt](http://www.scala-sbt.org/). 

```bash
sbt run
```

Using http://localhost:9000/ combined with any of the below endpoints, anyone
can view the result of any given API call.

### Frontend

Run this using [npm](https://www.npmjs.com/).

```bash
cd ui
npm start
```

And then navigate to http://localhost:3000 to see the basic frontend

## Developer Notes

Use this for graphics
https://medium.com/better-programming/creating-an-interactive-map-using-svg-and-css-94a688c11bd6

### API Endpoints

- /board        = JSON representing the current board state
- /player/:id   = JSON for a particular player

