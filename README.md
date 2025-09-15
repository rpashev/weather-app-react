# Weather App

A responsive single page application allowing registered users to track the weather for multiple locations and view a weather map with different layers like temperature, precipitation, wind, etc. Built with React and Tailwind, it was fun incorporating a map and different charts, visualising the weather condtions.
This app is built with the MERN stack - Mongo/Express/React/Node and is employing the Open Weather API.

The backend API is part of a larger API that I have built for another app. Here you can find the **[REST API](https://github.com/rpashev/journal-app-REST)** 

> Live demo **[HERE](https://weather-app-react-tw.netlify.app/)**

## Table of Contents

- [General Info](#general-information)
- [Challenges](#challenges)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Room for Improvement](#room-for-improvement)
- [Contact](#contact)

## General Information

I like playing with external APIs so I decided to create an application using the [Open Weather API](https://openweathermap.org/), containing all CRUD operations and visualizing the data in nice charts and an interactive map. Practicing Tailwind was also a goal of mine so I was looking for an opportunity to build an application using the CSS framework along with the trusty React.

## Challenges

- figuring out how to properly use the [Open Weather API](https://openweathermap.org/)
- first time using Tailwind was a fun but at times challenging process
- first time using Zod for validating API responses took some digging into the documentation but proved very useful
- integrating the Leaflet map with the different weather layers required some configurations as well as produced some styling difficulties
- implementing the app in different languages, including more exotic like Chinese and Hindi
- implementing settings for switching between imperial and metric units

## Technologies Used

### Front End

- React 18.2.0
- React Router 6.22.1
- TypeScript
- Tailwind CSS
- Chart.js
- Leaflet
- Tanstack Query
- Context API
- Zod
- Axios

### Back End

- Open Weather API
- Node
- Express
- MongoDB
- Mongo Atlas
- Mongoose
- JWT
- Axios

## Features

### Anonymous users are able to:

- search and view weather for any location, including a detailed modal view with a chart, showing daily and hourly changes
- view an interactive map with weather overlays, including such for temperature, precipitation, and wind speed
- view weather overview in header for user's location in case access to location is allowed
- view a settings page, where user can change language, units, dark/light mode and enable/disable location permission
- switch between dark and light mode
- register
- login

### Authenticated users are able to:

- add locations to 'tracked' list so they can be viewed on the home page
- change the order of the tracked locations through a modal with a drag & drop functionality
- delete tracked locations
- view tracked locations on map
- logout

## Setup

### To get a local copy up and running follow these simple steps:

1. Make sure you have **`node`** and **`npm`** installed globally on your machine.

2. Clone the repo

   ### `git clone https://github.com/rpashev/weather-app-react.git`

3. Install NPM packages

   ### `npm install`

4. Run the app in development mode with hot reloading

   ### `npm run dev`

5. You can view the app on [http://localhost:3000](http://localhost:3000)

6. To build for production run the following command
   ### `npm run build`
7. If you want to connect to the backend follow the instructions [here](https://github.com/rpashev/journal-app-REST/#readme)

## Room for Improvement

- purchase Open Weather API subscription so the map can have more locations shown (more API requests can be made before hitting a limit)
- implement a pollution layer for the map (requires subscription)
- implement a push notification for weather alerts in your area
- break up some of the larger components

## Contact

Created by rpashev - feel free to [contact me](https://www.rpashev.com/).

