# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.


##Problem resolution 
YogiTrack Prototype

YogiTrack is a MERN-style web application using React/Vite for the frontend, Node.js/Express for the backend, and MongoDB for data storage.

Technology Stack

Frontend: React 19 + Vite

Backend: Node.js + Express

Database: MongoDB + Mongoose

HTTP Client: Axios

API: Express routes

Frontend Build Tool: Vite

Project Structure

The project is organized approximately like this:

yogitrack-prototype/
├── server.js
├── package.json
├── routes/
│   └── posts.js
│
└── client/
    ├── package.json
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── components/
    │
    └── dist/
        ├── index.html
        └── assets/


The src directory contains the React source code.

The dist directory is created by Vite when the application is built.

Frontend: React + Vite

The React frontend uses Vite.

The client/package.json contains:

{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  }
}

Important JSX Concept

The browser does not normally execute raw JSX.

For example:

function App() {
    return <h1>Hello YogiTrack</h1>;
}


The <h1> syntax is JSX.

Vite processes the JSX and converts it into JavaScript that the browser can execute.

The general flow is:

App.jsx
   ↓
Vite
   ↓
Compiled JavaScript
   ↓
Browser


Therefore, the Node/Express server does not need to parse .jsx files.

Development Mode

During development, use Vite to run the React frontend.

From the project root:

cd client


Then:

npm run dev


Vite will provide a local development URL, typically:

http://localhost:5173/


At the same time, run the Node backend separately.

From the project root:

node server.js


The backend normally runs on:

http://localhost:5000


The development architecture is:

                    Browser
                       |
                       |
                +------+------+
                |             |
                v             v
          Vite :5173     Express :5000
          React/JSX          API
                              |
                              v
                           MongoDB


Vite handles React and JSX.

Express handles API requests.

MongoDB stores application data.

Backend: Express

The backend is contained in:

server.js


A basic server configuration is:

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const postsRoute = require('./routes/posts');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const DB_CONNECTION = 'mongodb://localhost:27017/yogitrack';

app.use(cors());
app.use(express.json());

// API routes
app.use('/posts', postsRoute);

// Serve the Vite production build
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// React fallback
app.get('/{*splat}', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'client', 'dist', 'index.html')
    );
});

// MongoDB connection
mongoose.connect(DB_CONNECTION)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

Understanding app.use()

app.use() registers Express middleware.

For example:

app.use(cors());


enables Cross-Origin Resource Sharing.

app.use(express.json());


allows Express to parse JSON request bodies.

app.use('/posts', postsRoute);


tells Express to use the posts router for requests beginning with /posts.

Understanding express.static()

This line is important:

app.use(express.static(path.join(__dirname, 'client', 'dist')));


express.static() allows Express to serve files from a directory.

In this case, Express serves files from:

client/dist


The path:

path.join(__dirname, 'client', 'dist')


resolves to the project's actual client/dist directory.

For example, if the project is located at:

C:\Users\jrc95\Documents\Fall 2026\Development for WWW\yogitrack-prototype


then Express will serve files from:

C:\Users\jrc95\Documents\Fall 2026\Development for WWW\yogitrack-prototype\client\dist

Why Express Serves dist

React source files are located in:

client/src/


For example:

client/src/App.jsx


These are source files and can contain JSX.

Vite processes them when the application is built.

Run:

cd client
npm run build


Vite generates:

client/dist/


with files similar to:

client/dist/
├── index.html
└── assets/
    ├── index-ABC123.js
    └── index-ABC123.css


The browser receives the compiled JavaScript and CSS.

Therefore:

React source
     ↓
   Vite
     ↓
client/dist
     ↓
 Express
     ↓
  Browser


Express does not need to parse the original .jsx files.

API Routes

The backend currently uses:

app.use('/posts', postsRoute);


This means the routes inside:

routes/posts.js


are available under:

/posts


For example, if routes/posts.js contains:

router.get('/', async (req, res) => {
    // ...
});


the endpoint becomes:

GET /posts


When running locally:

http://localhost:5000/posts


React can request the API using Axios:

axios.get('http://localhost:5000/posts');


or Fetch:

fetch('http://localhost:5000/posts');

MongoDB

The backend uses Mongoose to connect to MongoDB.

The connection string should include the database name:

const DB_CONNECTION = 'mongodb://localhost:27017/yogitrack';


The previous connection string:

mongodb://localhost:27017//


contained an unnecessary extra slash and did not specify a database name.

A database name such as:

yogitrack


makes the connection easier to understand and manage.

The connection is established with:

mongoose.connect(DB_CONNECTION)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('MongoDB connection error:', error));

CORS

The backend uses:

app.use(cors());


This allows the React development server and Express API to communicate when they are running on different ports.

For example:

React/Vite:
http://localhost:5173

Express:
http://localhost:5000


Without appropriate CORS configuration, browser requests between different origins can be blocked.

Production Build

When the application is ready to run through Express, build the React frontend.

From the project root:

cd client


Then:

npm run build


This creates:

client/dist/


After building, return to the project root:

cd ..


Start the backend:

node server.js


Then open:

http://localhost:5000


Express will serve the compiled React application.

Development vs. Production
Development

Use two processes.

Terminal 1:

node server.js


Terminal 2:

cd client
npm run dev


The result is:

React:
http://localhost:5173

Node API:
http://localhost:5000


Vite processes JSX during development.

Production

Build React:

cd client
npm run build


Then run Node:

cd ..
node server.js


The result is:

Browser
   ↓
Express :5000
   ├── React files → client/dist
   │
   └── API → /posts
           ↓
        MongoDB

React Routing and the Express Fallback

If the React application uses client-side routing, a URL such as:

/dashboard


may not correspond to an actual file on the server.

For example:

client/dist/dashboard


probably does not exist.

The Express fallback:

app.get('/{*splat}', (req, res) => {
    res.sendFile(
        path.join(__dirname, 'client', 'dist', 'index.html')
    );
});


returns the React application's index.html.

React can then determine which component should be displayed for the requested route.

The basic concept is:

/dashboard
     ↓
Express
     ↓
index.html
     ↓
React
     ↓
Dashboard component

Vite Configuration

The React application should have a Vite configuration similar to:

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
});


The important part is:

plugins: [react()]


This enables Vite's React support.

Common Mistake: Serving JSX Directly

Do not expect this:

client/src/App.jsx


to be directly executable by the browser just because Express serves the file.

For example, this JSX:

function App() {
    return <h1>Hello</h1>;
}


must be processed by Vite before it can be executed normally by the browser.

The correct workflow is:

.jsx source
    ↓
Vite
    ↓
JavaScript
    ↓
Browser


not:

.jsx source
    ↓
Express
    ↓
Browser

Useful Commands
Install frontend dependencies
cd client
npm install

Start Vite development server
cd client
npm run dev

Build React application
cd client
npm run build

Preview the production build through Vite
cd client
npm run preview

Start Node backend

From the project root:

node server.js

Troubleshooting
JSX is not being parsed

Make sure the frontend is running through Vite:

cd client
npm run dev


Do not attempt to have Express parse the .jsx source files.

client/dist does not exist

Run:

cd client
npm run build


Then check that:

client/dist/


was created.

Express cannot find index.html

Verify that the build produced:

client/dist/index.html


and that server.js contains:

app.use(express.static(path.join(__dirname, 'client', 'dist')));


and the fallback points to:

path.join(__dirname, 'client', 'dist', 'index.html')

API requests are failing

Verify that Node is running:

node server.js


Then test the API directly:

http://localhost:5000/posts


Also verify that the route is registered:

app.use('/posts', postsRoute);

MongoDB connection fails

Check that MongoDB is running and that the connection string is correct:

const DB_CONNECTION = 'mongodb://localhost:27017/yogitrack';


Look at the Node terminal for the Mongoose error.

Key Concept to Remember

The most important distinction in this project is:

                FRONTEND
        React + JSX + Vite
                 |
                 | Build
                 v
             client/dist
                 |
                 v
               Browser


                BACKEND
        Node + Express
                 |
                 +---- /posts ----> MongoDB
                 |
                 +---- static ----> client/dist


Vite handles JSX.

Express handles the API and serves the compiled frontend.

MongoDB handles persistent data.

This separation keeps the YogiTrack application organized and prevents the Node backend from being responsible for parsing React JSX.
