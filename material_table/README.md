# Federal Training Request Form Project (Frontend)

Deployed Frontend code can be found at this link: (https://request-form.herokuapp.com)

Backend code for the project can be found at this link: (https://github.com/Jitahidi/training-form-backend).

## Objective

The objective of this project was to create a streamlined full-stack application based on the Federal Employee Training Form (SF-182), which can be found at this link: (https://www.opm.gov/forms/pdf_fill/sf182.pdf). The front-end portion of the project was developed using React, while the back-end portion was built with the Entity Framework Code First Library (ASP.NET Core) in C# and PostgreSQL. The project emphasizes the creation of a form to gather trainee information and training course data, subsequently storing the collected data in a database.

## Summary of the Frontend Code

The code provided is a web application for a Federal Employee Training Request Form built using React, Material React Table, Formik, Yup, and Material-UI. The application includes a multi-step form for submitting training requests, a table for displaying submitted requests, and a table for displaying employee information.

The `RequestForm` component is a multi-step form that allows users to submit training requests. It uses Formik and Yup for form validation and handles form submission through an API call. The form is divided into several steps, each with its own set of fields. The user can navigate between steps using the "Next" and "Back" buttons. Once the user has completed all the steps, they can submit the form by clicking the "Submit" button.

The `RequestTable` component is a table that displays the submitted training requests. It uses Material React Table for table functionality and fetches data from an API endpoint. The table includes sorting and filtering functionality, as well as edit and delete functionality for each row.

The `EmployeeTable` component is a table that displays employee information. It uses Material React Table for table functionality and fetches data from an API endpoint. The table includes sorting and filtering functionality, as well as edit and delete functionality for each row.

The API endpoint is a simple JavaScript object that stores the submitted training requests and employee information as arrays. The endpoint provide actions for creating, retrieving, updating, and deleting records.
The application also includes various helper functions and styling files to customize the appearance and functionality of the web application.
Overall, the Employee Training Request Form is a comprehensive web application that allows users to submit training requests and manage employee information in an efficient and user-friendly manner.

## Short Summary of the Backend Code

The code provides a web application for managing training requests through a RESTful API. The application uses ASP.NET Core for handling API requests, Entity Framework for interacting with the PostgreSQL database, and a well-structured data model to represent the training request entities.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
