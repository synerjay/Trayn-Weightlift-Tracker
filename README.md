# TRAYN Weightlifting Journal App

<img src="https://github.com/synerjay/Trayn-Weightlift-Tracker/blob/main/screenshots/traynlogo.png?raw=true" />

## About 

TRAYN app is a weightlifting journal keeper that records the repetitions and sets of each exercise in a workout session. It is built with React, Redux, Node Express, and MongoDB.
As an avid gym goer I've always wanted to build a weightlifting app like the Strong app on the iPhone so I made an app similar in functionality but made with the MERN stack technologies. Also I thought it was cool to clone the Strong app with my full stack abilities and build an app that supports one of my beloved hobbies: Fitness.

## Landing Page

<img src="https://github.com/synerjay/Trayn-Weightlift-Tracker/blob/main/screenshots/landingpage.png?raw=true" />

## Dashboard
Once the user signs into their account they are greeted with widgets that related to their habits in the gym. Users can see a a heat map calendar of their gym sessions throughout the year as well as a weekly workout frequency bar charts. Both of these graphs are created with D3.js through the Nivo package.

<img src="https://github.com/synerjay/Trayn-Weightlift-Tracker/blob/main/screenshots/dashboard.png?raw=true" />

## Adding a New Workout
Clicking on the "New Workout" button will prompt the user to add a workout. Users can choose a pre-made workout template based on the Push, Pull, Leg workout regimemnt or they can choose a custom workout of their choice. 

<img src="https://github.com/synerjay/Trayn-Weightlift-Tracker/blob/main/screenshots/chooseworkout.gif?raw=true" />

## Editing and Adding an Exercise to a Workout
Once a workout is made, users can utilize full CRUD functionality on the interface. Automatically, the changes made are saved on the database.
Clicking on the name will prompt the text editor to execute and allows the user to change the workout name and/or exercise names

<img src="https://github.com/synerjay/Trayn-Weightlift-Tracker/blob/main/screenshots/addingexercise.gif?raw=true" />

## Adding sets to an Exercise
Similar the Strong app functionality, the TRAYN app uses the same technique of saving sets individually OR saving sets as a whole within an exercise.
Users are able to add more sets freely and in unlimited numbers as they like.

<img src="https://github.com/synerjay/Trayn-Weightlift-Tracker/blob/main/screenshots/addsets.gif?raw=true" />

## Editing Workout
When the user finishes a workout, users can see their workout history on the dashboard and are able to edit the workout from there.

<img src="https://github.com/synerjay/Trayn-Weightlift-Tracker/blob/main/screenshots/editworkout.gif?raw=true" />

## Technologies used
- React
- Redux
- Node.js
- Express
- MongoDB
- Tailwind CSS
- Nivo 

See a live demo here: http://trayn.herokuapp.com/
