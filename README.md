# Openweather App

## Requirements

For development, you will only need Node.js

## Node

- ### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- ### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- ### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

## Structure

The main directories are:

| Directories            | Description                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `/modules`             | This directory contains all weather functions                                                                                    |
| `/public`              | This directory contains JS file for form submission and style sheet for the application                                          |
| `/routes`              | This directory contains all the static and dynamic routes for the application                                                    |
| `/views`               | This directory contains the html files                                                                                           |

In addition to this we also have .eslintrc that holds all the information related to style guide

The entry point of the application is located in `index.js` from where the server starts

## Configure app

### You will need to first install all the dependencies by running this command

    $ npm ci

### Start the application using command

    $ npm start
