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

import { Button, Box, TextField } from "@material-ui/core";
import React from "react";
import { useFormik, Formik } from "formik";
import { object, string } from "yup";

export default function RequestForm() {
const formik = useFormik({
initialValues: {
requestId: "",
vendor_Name: "",
vendor_Mailing_Address: "",
vendor_Telephone_Number: "",
vendor_Email_Address: "",
vendor_Website: "",
vendor_POC: "",
vourseName: "",
courseId: "",
training_StartDate: "",
training_EndDate: "",
training_DutyHours: "",
training_NonDutyHours: "",
training_PurposeType: "",
training_TypeCode: "",
training_SubTypeCode: "",
training_DeliveryTypeCode: "",
training_DesignationTypeCode: "",
training_Credit: "",
training_CreditTypeCode: "",
training_AccreditionIdicator: "",
continued_Service_Agreement_ExpirationDate: "",
training_Source_TypeCode: "",
individual_or_Group_Training: "",
student_Membership_ID: "",
skill_Learning_Objective: "",
},
onSubmit: (values) => {
console.log(values);
},
});
console.log(formik.values);
return (
<Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >

<form style={{ backgroundColor: "lightgreen" }}>
<Box display="flex" flexDirection="column">
<Box mb={2}>
<TextField
              id="requestId"
              name="requestId"
              type="text"
              placeholder="Request ID"
              onChange={formik.handleChange}
              value={formik.values.requestId}
            />
</Box>
<Box mb={2}>
<TextField
              id="vendor_Name"
              name="vendor_Name"
              type="text"
              placeholder="Vendor Name"
              onChange={formik.handleChange}
              value={formik.values.vendor_Name}
            />
</Box>
<Box mb={2}>
<TextField
              id="vendor_Mailing_Address"
              name="vendor_Mailing_Address"
              type="text"
              placeholder="Vendor Mailing Address"
              onChange={formik.handleChange}
              value={formik.values.vendor_Mailing_Address}
            />
</Box>
</Box>
<Button type="submit">Submit</Button>
</form>
</Box>
);
}

import React from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
root: {
backgroundColor: "#4CAF50",
height: "100vh",
},
form: {
backgroundColor: "white",
padding: theme.spacing(3),
borderRadius: theme.spacing(1),
},
}));

const validationSchema = Yup.object().shape({
name: Yup.string().required("Name is required"),
email: Yup.string().email("Invalid email").required("Email is required"),
});

const initialValues = {
name: "",
email: "",
};

export const RequestForm = () => {
const classes = useStyles();

const handleSubmit = (values) => {
console.log(values);
};

const formik = useFormik({
initialValues,
validationSchema,
onSubmit: handleSubmit,
});

return (
<Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >

<form onSubmit={formik.handleSubmit} className={classes.form}>
<Grid container direction="column" spacing={3}>
<Grid item>
<Typography variant="h4">Form Example</Typography>
</Grid>
<Grid item>
<TextField
name="name"
label="Name"
fullWidth
value={formik.values.name}
onChange={formik.handleChange}
error={formik.touched.name && Boolean(formik.errors.name)}
helperText={formik.touched.name && formik.errors.name}
/>
</Grid>
<Grid item>
<TextField
name="email"
label="Email"
fullWidth
value={formik.values.email}
onChange={formik.handleChange}
error={formik.touched.email && Boolean(formik.errors.email)}
helperText={formik.touched.email && formik.errors.email}
/>
</Grid>
<Grid item>
<Button type="submit" variant="contained" color="primary">
Submit
</Button>
</Grid>
</Grid>
</form>
</Grid>
);
};

import React, { useState } from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
root: {
backgroundColor: "#4CAF50",
height: "100vh",
},
form: {
backgroundColor: "white",
padding: theme.spacing(3),
borderRadius: theme.spacing(1),
},
}));

const validationSchema1 = Yup.object().shape({
field1: Yup.string().required("Field 1 is required"),
});

const validationSchema2 = Yup.object().shape({
field2: Yup.string().required("Field 2 is required"),
});

const validationSchema3 = Yup.object().shape({
name: Yup.string().required("Name is required"),
email: Yup.string().email("Invalid email").required("Email is required"),
});

const initialValues1 = {
field1: "",
};

const initialValues2 = {
field2: "",
};

const initialValues3 = {
name: "",
email: "",
};

export const RequestForm = () => {
const classes = useStyles();
const [currentForm, setCurrentForm] = useState(1);

const handleSubmit = (values) => {
console.log(values);
};

const handleContinue = () => {
setCurrentForm((prevForm) => prevForm + 1);
};

const formik1 = useFormik({
initialValues: initialValues1,
validationSchema: validationSchema1,
onSubmit: handleSubmit,
});

const formik2 = useFormik({
initialValues: initialValues2,
validationSchema: validationSchema2,
onSubmit: handleSubmit,
});

const formik3 = useFormik({
initialValues: initialValues3,
validationSchema: validationSchema3,
onSubmit: handleSubmit,
});

return (
<Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
{currentForm === 1 && (

<form onSubmit={formik1.handleSubmit} className={classes.form}>
<Grid container direction="column" spacing={3}>
<Grid item>
<Typography variant="h4">Form 1</Typography>
</Grid>
<Grid item>
<TextField
name="field1"
label="Field 1"
fullWidth
value={formik1.values.field1}
onChange={formik1.handleChange}
error={formik1.touched.field1 && Boolean(formik1.errors.field1)}
helperText={formik1.touched.field1 && formik1.errors.field1}
/>
</Grid>
<Grid item>
<Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleContinue}
              >
Continue
</Button>
</Grid>
</Grid>
</form>
)}
{currentForm === 2 && (
<form onSubmit={formik2.handleSubmit} className={classes.form}>
<Grid container direction="column" spacing={3}>
<Grid item>
<Typography variant="h4">Form 2</Typography>
</Grid>
<Grid item>
<TextField
name="field2"
label="Field 2"
fullWidth
value={formik2.values.field2}
onChange={formik2.handleChange}
error={formik2.touched.field2 && Boolean(formik2.errors.field2)}
helperText={formik2.touched.field2 && formik2.errors.field2}
/>
</Grid>
<Grid item>
<Button
                type="button"
                variant="contained"
                color="primary"
                onClick={handleContinue}
              >
Continue
</Button>
</Grid>
</Grid>
</form>
)}
{currentForm === 3 && (
<form onSubmit={formik3.handleSubmit} className={classes.form}>
<Grid container direction="column" spacing={3}>
<Grid item>
<Typography variant="h4">Form 3</Typography>
</Grid>
<Grid item>
<TextField
name="name"
label="Name"
fullWidth
value={formik3.values.name}
onChange={formik3.handleChange}
error={formik3.touched.name && Boolean(formik3.errors.name)}
helperText={formik3.touched.name && formik3.errors.name}
/>
</Grid>
<Grid item>
<TextField
name="email"
label="Email"
fullWidth
value={formik3.values.email}
onChange={formik3.handleChange}
error={formik3.touched.email && Boolean(formik3.errors.email)}
helperText={formik3.touched.email && formik3.errors.email}
/>
</Grid>
<Grid item>
<Button type="submit" variant="contained" color="primary">
Submit
</Button>
</Grid>
</Grid>
</form>
)}
</Grid>
);
};

import React from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const useStyles = makeStyles((theme) => ({
root: {
backgroundColor: "#4CAF50",
height: "100vh",
},
form: {
backgroundColor: "white",
padding: theme.spacing(3),
borderRadius: theme.spacing(1),
},
}));

const validationSchema = Yup.object().shape({
name: Yup.string().required("Name is required"),
email: Yup.string().email("Invalid email").required("Email is required"),
});

const initialValues = {
name: "",
email: "",
};

export const RequestForm = () => {
const classes = useStyles();

const handleSubmit = (values) => {
console.log(values);
};

const formik = useFormik({
initialValues,
validationSchema,
onSubmit: handleSubmit,
});

return (
<Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
    >
<Stepper>
<Step>
<StepLabel>First</StepLabel>

<form onSubmit={formik.handleSubmit} className={classes.form}>
<Grid container direction="column" spacing={3}>
<Grid item>
<Typography variant="h4">Form Example</Typography>
</Grid>
<Grid item>
<TextField
name="name"
label="Name"
fullWidth
value={formik.values.name}
onChange={formik.handleChange}
error={formik.touched.name && Boolean(formik.errors.name)}
helperText={formik.touched.name && formik.errors.name}
/>
</Grid>
<Grid item>
<TextField
name="email"
label="Email"
fullWidth
value={formik.values.email}
onChange={formik.handleChange}
error={formik.touched.email && Boolean(formik.errors.email)}
helperText={formik.touched.email && formik.errors.email}
/>
</Grid>
<Grid item>
<Button type="submit" variant="contained" color="primary">
Submit
</Button>
</Grid>
</Grid>
</form>
</Step>
<Step>
<StepLabel>Second</StepLabel>
<form onSubmit={formik.handleSubmit} className={classes.form}>
<Grid container direction="column" spacing={3}>
<Grid item>
<Typography variant="h4">Form Example</Typography>
</Grid>
<Grid item>
<TextField
name="name"
label="Name"
fullWidth
value={formik.values.name}
onChange={formik.handleChange}
error={formik.touched.name && Boolean(formik.errors.name)}
helperText={formik.touched.name && formik.errors.name}
/>
</Grid>
<Grid item>
<TextField
name="email"
label="Email"
fullWidth
value={formik.values.email}
onChange={formik.handleChange}
error={formik.touched.email && Boolean(formik.errors.email)}
helperText={formik.touched.email && formik.errors.email}
/>
</Grid>
<Grid item>
<Button type="submit" variant="contained" color="primary">
Submit
</Button>
</Grid>
</Grid>
</form>
</Step>
<Step>
<StepLabel>Third</StepLabel>
<form onSubmit={formik.handleSubmit} className={classes.form}>
<Grid container direction="column" spacing={3}>
<Grid item>
<Typography variant="h4">Form Example</Typography>
</Grid>
<Grid item>
<TextField
name="name"
label="Name"
fullWidth
value={formik.values.name}
onChange={formik.handleChange}
error={formik.touched.name && Boolean(formik.errors.name)}
helperText={formik.touched.name && formik.errors.name}
/>
</Grid>
<Grid item>
<TextField
name="email"
label="Email"
fullWidth
value={formik.values.email}
onChange={formik.handleChange}
error={formik.touched.email && Boolean(formik.errors.email)}
helperText={formik.touched.email && formik.errors.email}
/>
</Grid>
<Grid item>
<Button type="submit" variant="contained" color="primary">
Submit
</Button>
</Grid>
</Grid>
</form>
</Step>
</Stepper>
</Grid>
);
};

import React, { useState } from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
form: {
display: "flex",
flexDirection: "column",
alignItems: "center",
backgroundColor: "white",
borderRadius: "8px",
padding: "32px",
boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
[theme.breakpoints.up("sm")]: {
width: "50%",
},
},
stepper: {
padding: theme.spacing(3, 0),
},
button: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
backButton: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
instructions: {
marginTop: theme.spacing(1),
marginBottom: theme.spacing(1),
},
background: {
backgroundColor: "#5cb85c",
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
},
}));

const initialValues = {
field1: "",
field2: "",
field3: "",
field4: "",
field5: "",
};

const validationSchema = Yup.object({
field1: Yup.string().required("Field 1 is required"),
field2: Yup.string().required("Field 2 is required"),
field3: Yup.string().required("Field 3 is required"),
field4: Yup.string().required("Field 4 is required"),
field5: Yup.string().required("Field 5 is required"),
});

const steps = [
{
label: "Step 1",
fields: [
<TextField name="field1" label="Field 1" />,
<TextField name="field2" label="Field 2" />,
<TextField name="field2" label="Field 3" />,
],
},
{
label: "Step 2",
fields: [
<TextField name="field3" label="Field 3" />,
<TextField name="field4" label="Field 4" />,
],
},
{
label: "Step 3",
fields: [<TextField name="field5" label="Field 5" />],
},
];

export const RequestForm = () => {
const classes = useStyles();
const [activeStep, setActiveStep] = useState(0);
const formik = useFormik({
initialValues,
validationSchema,
onSubmit: (values) => {
console.log(values);
},
});

const handleNext = () => {
setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

return (

<div className={classes.background}>
<form onSubmit={formik.handleSubmit} className={classes.form}>
<Stepper activeStep={activeStep} className={classes.stepper}>
{steps.map((step) => (
<Step key={step.label}>
<StepLabel>{step.label}</StepLabel>
</Step>
))}
</Stepper>
{steps[activeStep].fields}
<div>
{activeStep === steps.length - 1 ? (
<div>
<Button
onClick={() => setActiveStep(0)}
className={classes.button} >
Reset
</Button>
<Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
Submit
</Button>
</div>
) : (
<div>
<Button
disabled={activeStep === 0}
onClick={handleBack}
className={classes.backButton} >
Back
</Button>
<Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
Next
</Button>
</div>
)}
</div>
</form>
</div>
);
};

import React, { useState } from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
form: {
display: "flex",
flexDirection: "column",
alignItems: "center",
backgroundColor: "white",
borderRadius: "8px",
padding: "32px",
boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
[theme.breakpoints.up("sm")]: {
width: "50%",
},
},
stepper: {
padding: theme.spacing(3, 0),
},
button: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
backButton: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
instructions: {
marginTop: theme.spacing(1),
marginBottom: theme.spacing(1),
},
background: {
backgroundColor: "#5cb85c",
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
},
}));

const initialValues = {
field1: "",
field2: "",
field3: "",
field4: "",
field5: "",
field6: "",
field7: "",
field8: "",
};

const validationSchema = Yup.object({
field1: Yup.string().required("Field 1 is required"),
field2: Yup.string().required("Field 2 is required"),
field3: Yup.string().required("Field 3 is required"),
field4: Yup.string().required("Field 4 is required"),
field5: Yup.string().required("Field 5 is required"),
});

const steps = [
{
label: "Step 1",
fields: [
<TextField name="field1" label="Field 1" />,
<TextField name="field2" label="Field 2" />,
<TextField name="field3" label="Field 3" />,
<TextField name="field4" label="Field 4" />,
<TextField name="field5" label="Field 5" />,
<TextField name="field6" label="Field 6" />,
<TextField name="field7" label="Field 7" />,
<TextField name="field8" label="Field 8" />,
],
onSubmit: (values) => {
// save data for step 1 to table 1
console.log("Submitting data for step 1", values);
},
},
{
label: "Step 2",
fields: [
<TextField name="field3" label="Field 3" />,
<TextField name="field4" label="Field 4" />,
],
onSubmit: (values) => {
// save data for step 2 to table 2
console.log("Submitting data for step 2", values);
},
},
{
label: "Step 3",
fields: [<TextField name="field5" label="Field 5" />],
onSubmit: (values) => {
// save data for step 3 to table 3
console.log("Submitting data for step 3", values);
},
},
];

export const RequestForm = () => {
const classes = useStyles();
const [activeStep, setActiveStep] = useState(0);
const formik = useFormik({
initialValues,
validationSchema,
onSubmit: () => {},
});

const handleNext = () => {
const currentStep = steps[activeStep];
currentStep.onSubmit(formik.values); // call onSubmit for current step to save data
setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

return (

<div className={classes.background}>
<form onSubmit={formik.handleSubmit} className={classes.form}>
<Stepper activeStep={activeStep} className={classes.stepper}>
{steps.map((step) => (
<Step key={step.label}>
<StepLabel>{step.label}</StepLabel>
</Step>
))}
</Stepper>
{steps.map((step, index) => {
if (index === activeStep) {
return step.fields;
}
return null;
})}
<div>
{activeStep === steps.length - 1 ? (
<div>
<Button
onClick={() => setActiveStep(0)}
className={classes.button} >
Reset
</Button>
<Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
Submit
</Button>
</div>
) : (
<div>
<Button
disabled={activeStep === 0}
onClick={handleBack}
className={classes.backButton} >
Back
</Button>
<Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
Next
</Button>
</div>
)}
</div>
</form>
</div>
);
};

import React, { useState } from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
form: {
display: "flex",
flexDirection: "column",
alignItems: "center",
backgroundColor: "white",
borderRadius: "8px",
padding: "32px",
boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
[theme.breakpoints.up("sm")]: {
width: "50%",
},
},
stepper: {
padding: theme.spacing(3, 0),
},
button: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
backButton: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
instructions: {
marginTop: theme.spacing(1),
marginBottom: theme.spacing(1),
},
background: {
backgroundColor: "#5cb85c",
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
},
}));

const initialValues = {
step1: {
field1: "",
},
step2: {
field2: "",
},
step3: {
field3: "",
},
};

const validationSchema = Yup.object({
field1: Yup.string().required("Field 1 is required"),
field2: Yup.string().required("Field 2 is required"),
field3: Yup.string().required("Field 3 is required"),
});

const steps = [
{
label: "Step 1",
fields: [<TextField name="field1" label="Field 1" />],
onSubmit: (values) => {
// save data for step 1 to table 1
console.log("Submitting data for step 1", values);
},
},
{
label: "Step 2",
fields: [<TextField name="field2" label="Field 2" />],
onSubmit: (values) => {
// save data for step 2 to table 2
console.log("Submitting data for step 2", values);
},
},
{
label: "Step 3",
fields: [<TextField name="field3" label="Field 3" />],
onSubmit: (values) => {
// save data for step 3 to table 3
console.log("Submitting data for step 3", values);
},
},
{
label: "Complete",
},
];

export const RequestForm = () => {
const classes = useStyles();
const [activeStep, setActiveStep] = useState(0);
const formik = useFormik({
initialValues,
validationSchema,
onSubmit: () => {},
});

const handleNext = () => {
const currentStep = steps[activeStep];
currentStep.onSubmit(formik.values); // call onSubmit for current step to save data
setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

return (

<div className={classes.background}>
<form onSubmit={formik.handleSubmit} className={classes.form}>
<Stepper activeStep={activeStep} className={classes.stepper}>
{steps.map((step) => (
<Step key={step.label}>
<StepLabel>{step.label}</StepLabel>
</Step>
))}
</Stepper>
{steps.map((step, index) => {
if (index === activeStep) {
return step.fields;
}
return null;
})}
<div>
{activeStep === steps.length - 1 ? (
<div>
<Button
disabled={activeStep === 0}
onClick={handleBack}
className={classes.backButton} >
Back
</Button>
<Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
Submit
</Button>
</div>
) : (
<div>
<Button
disabled={activeStep === 0}
onClick={handleBack}
className={classes.backButton} >
Back
</Button>
<Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
Next
</Button>
</div>
)}
</div>
</form>
</div>
);
};

import React, { useState } from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
form: {
display: "flex",
flexDirection: "column",
alignItems: "center",
backgroundColor: "white",
borderRadius: "8px",
padding: "32px",
boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
[theme.breakpoints.up("sm")]: {
width: "50%",
},
},
stepper: {
padding: theme.spacing(3, 0),
},
button: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
backButton: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
instructions: {
marginTop: theme.spacing(1),
marginBottom: theme.spacing(1),
},
background: {
backgroundColor: "#5cb85c",
minHeight: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
},
}));

const initialValues = {
step3: { requestId: "", vendor_Name: "", vendor_Mailing_Address: "" },
};

const validationSchema = Yup.object({
field1: Yup.string().required("Field 1 is required"),
field2: Yup.string().required("Field 2 is required"),
field3: Yup.string().required("Field 3 is required"),
});

export const RequestForm = () => {
const classes = useStyles();
const [activeStep, setActiveStep] = useState(0);
const formik = useFormik({
initialValues,
validationSchema,
onSubmit: () => {},
});

const steps = [
{
label: "Step 1",
fields: [<TextField />],
},
{
label: "Step 2",
fields: [<TextField />],
},
{
label: "Step 3",
fields: [
<TextField
name="step3.requestId"
label="Request ID"
onChange={formik.handleChange}
value={formik.values.step3.requestId}
/>,
<TextField
name="step3.vendor_Name"
label="Vendor Name"
onChange={formik.handleChange}
value={formik.values.step3.vendor_Name}
/>,
<TextField
name="step3.vendor_Mailing_Address"
label="Vendor Mailing Address"
onChange={formik.handleChange}
value={formik.values.step3.vendor_Mailing_Address}
/>,
],
},
];

const handleNext = () => {
setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

console.log(formik.values);

return (

<div className={classes.background}>
<form onSubmit={formik.handleSubmit} className={classes.form}>
<Stepper activeStep={activeStep} className={classes.stepper}>
{steps.map((step) => (
<Step key={step.label}>
<StepLabel>{step.label}</StepLabel>
</Step>
))}
</Stepper>
{steps.map((step, index) => {
if (index === activeStep) {
return step.fields;
}
return null;
})}
<div>
{activeStep === steps.length - 1 ? (
<div>
<Button
disabled={activeStep === 0}
onClick={handleBack}
className={classes.backButton} >
Back
</Button>
<Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
Submit
</Button>
</div>
) : (
<div>
<Button
disabled={activeStep === 0}
onClick={handleBack}
className={classes.backButton} >
Back
</Button>
<Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
Next
</Button>
</div>
)}
</div>
</form>
</div>
);
};

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import \* as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
form: {
display: "flex",
flexDirection: "column",
alignItems: "center",
backgroundColor: "white",
borderRadius: "8px",
padding: "32px",
boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
[theme.breakpoints.up("xs")]: {
width: "200%",
},
},
container: {
marginTop: "32px",
display: "flex",
flexDirection: "column",
alignItems: "center",
},
stepper: {
padding: theme.spacing(3, 0),
width: "105%", // set a fixed pixel width for the stepper
},
button: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
backButton: {
marginTop: theme.spacing(1),
marginRight: theme.spacing(1),
},
instructions: {
marginTop: theme.spacing(1),
marginBottom: theme.spacing(1),
},
background: {
backgroundColor: "#5cb85c",
minHeight: "100vh",
display: "flex",
flexDirection: "column", // Position the form below the title
justifyContent: "center",
alignItems: "center",
},
textfield: {
width: "50%",
padding: "10px",
},
title: {
color: "white",
fontSize: "5rem",
fontWeight: "bold",
textAlign: "center",
marginTop: "4.8rem",
},
subtitle: {
color: "#6EE7B7",
fontSize: "2rem",
textAlign: "center",
marginTop: "2rem",
},
}));

const initialValues = {
step3: { requestId: "", vendor_Name: "", vendor_Mailing_Address: "" },
};

const validationSchema = Yup.object({
field1: Yup.string().required("Field 1 is required"),
field2: Yup.string().required("Field 2 is required"),
field3: Yup.string().required("Field 3 is required"),
});

export const RequestForm = () => {
const classes = useStyles();
const [activeStep, setActiveStep] = useState(0);
const formik = useFormik({
initialValues,
validationSchema,
onSubmit: () => {},
});

const steps = [
{
label: "Step 1",
// content: (
// <>
// {/* Step 1 text fields go here */}
// <TextField
// name="step1.field1"
// label="Field 1"
// onChange={formik.handleChange}
// value={formik.values.step1.field1}
// />
// {/* Add other text fields for Step 1 */}
// </>
// ),
},
{
label: "Step 2",
// content: (
// <>
// {/* Step 2 text fields go here */}
// <TextField
// name="step2.field2"
// label="Field 2"
// onChange={formik.handleChange}
// value={formik.values.step2.field2}
// />
// {/* Add other text fields for Step 2 */}
// </>
// ),
},
{
label: "Step 3",
content: (
<>
<TextField
name="step3.requestId"
label="Request ID"
onChange={formik.handleChange}
value={formik.values.step3.requestId}
variant="outlined"
className={classes.textfield}
/>
<TextField
name="step3.vendor_Name"
label="Vendor Name"
onChange={formik.handleChange}
value={formik.values.step3.vendor_Name}
variant="outlined"
className={classes.textfield}
/>
<TextField
name="step3.vendor_Mailing_Address"
label="Vendor Mailing Address"
onChange={formik.handleChange}
value={formik.values.step3.vendor_Mailing_Address}
variant="outlined"
className={classes.textfield}
/>
</>
),
},
];
const handleNext = () => {
setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

useEffect(() => {
if (activeStep === 2) {
console.log(formik.values);
}
}, [formik.values.step3]);

// Function handles create request on the frontend and backend
const handleCreateRequest = async () => {
try {
// Send a POST request to the backend API to create a new row in the database
const response = await fetch("http://localhost:5201/api/Requests/", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(formik.values.step3),
});

      if (!response.ok) {
        throw new Error("Failed to create request");
      }
    } catch (error) {
      console.error(error);
    }

};

return (

<div className={classes.background}>
<div className="mx-auto z-10 mt-48 text-center">
<h1 className={classes.title}>
Welcome to <span className="text-yellow-500">the Club</span>
</h1>
<p className={classes.subtitle}>Become a new member in 3 easy steps</p>
</div>
<div className={classes.container}>
<form className={classes.form}>
<Stepper
            activeStep={activeStep}
            alternativeLabel
            className={classes.stepper}
          >
{steps.map((step) => (
<Step key={step.label}>
<StepLabel>{step.label}</StepLabel>
</Step>
))}
</Stepper>
{steps[activeStep].content}
<div>
{activeStep === steps.length - 1 ? (
<div>
<Button
disabled={activeStep === 0}
onClick={handleBack}
className={classes.backButton} >
Back
</Button>
<Button
                  variant="contained"
                  color="primary"
                  type="button"
                  className={classes.button}
                  onClick={handleCreateRequest}
                >
Submit
</Button>
</div>
) : (
<div>
<Button
disabled={activeStep === 0}
onClick={handleBack}
className={classes.backButton} >
Back
</Button>
<Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
Next
</Button>
</div>
)}
</div>
</form>
</div>
</div>
);
};

const validationSchema = Yup.object().shape({
step3: Yup.object().shape({
requestId: Yup.string()
.required("Request ID is required"),
vendor_Name: Yup.string().required("Vendor Name is required"),
vendor_Mailing_Address: Yup.string().required(
"Vendor Mailing Address is required"
),
}),
});
