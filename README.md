# Portfolio Website

This portfolio is an online presentation of work that I have done, as well as my skills and experiences. Users can send me an email with files attached using <strong>Contact form.</strong>

## Getting Started

### .env File

Rename the env.example file to .env and fill in the environment variables

### Install dependencies

After downloading code from this repo, open terminal window and navigate to each "client" and "server" folder to run `npm install` to build all the dependencies in the project.

### Run program

1. Run the application with your cloned codes:
   - With your terminal, move into 'server' folder and run `node server.js ` to start the server.
   - Open another terminal window, move into 'client' folder and run `npm run serve` to run the program.
2. Run the application without code downloading

- You need Docker installed in your system.
- Download the "docker-compose.yml" from this repo
- Open the termial and move to the directory contains "docker-compose.yml"
- Run `docker compose up`
- Open http://localhost:5000 with your browser to see the result

## Technologies

- HTML, CSS, JavaScript
- Tailwind CSS, PostCSS
- React, NodeJS, ExpressJS
- TypeWritter, Multer, NodeMailer
- Webpack

## Features

- Fully responsive( many size of screens)
- Light/Dark mode
- Showing many projects with links to live demo and code repositories
- Contact form with validation and sending Email with files attached using NodeMailer, Multer
- Writing text using Typewritter-effect
