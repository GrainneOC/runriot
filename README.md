Fullstack 1 Assignment - 'Run Riot' running app
A web app that allows users to create an account, add the name and location of preferred 'trails' (running routes), add their latest stats: 'distance','duration','date' and update them.
Hapi Swagger provides for the implementation of joi security and visibility of API documentation.

Getting Started
A template project was used as a base for building this app, refactored and expanded to suit the app's theme with steps in building an API according the RESTful principles and TDD testing implemented throughout.

Information on the starter template
A starter project focused primarily on back-end tech stack.

This is a Node.js project, created using the Hapi framework, and deployed from Glitch. It includes eslint and prettier formatting frameworks, and handlebars templating.
Database can be initialised in the server.js file on local mem (default), mongo or json.
Robo 3T was used to facilitate mongo initiation.
Validation is implemented through use of Joi schema. Data seeding is through use of the Mongoose seeder utility.
Cloudinary and Cloud Atlas functionality was also implemented.

This template is prepared for students undertaking the Fullstack 1 module in the Higher Diploma in Computing at SETU, Waterford, Ireland.

Features
Users can create an account
Users can create a 'trail' including its location and store 'results' (running stats) to keep track of their personal best speeds for each time they run on the trail.
Users can create many trails and submit many results on a trail.
Users can delete results and trails.

Image for seeded (preloaded) data is uploaded via Cloudinary
Images on welcome page and about page are uploaded using the Hapi Inert tool.

Swagger is used for documentation for the API, tracking RESTful end points and documenting the models and their parameters.

The use of a Cluster on Cloud Atlas allows for database collections to be viewed.



Site
RunRiot

Author
This project was created by Gráinne O' Connor

