import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Checkbox, FormControlLabel } from "@mui/material";
import "typeface-inter";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    padding: "32px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.up("xs")]: {
      width: "300%",
    },
  },
  containerTitle: {
    marginTop: "48px",
    display: "flex",
    flexDirection: "column",
  },
  containerForm: {
    marginTop: "90px",
    marginBottom: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stepper: {
    padding: theme.spacing(3, 0),
    width: "105%", // set a fixed pixel width for the stepper
    backgroundColor: "#FFFFFF",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  background: {
    backgroundColor: "#4285F4",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column", // Position the form below the title
    justifyContent: "center",
    alignItems: "center",
  },
  textfield: {
    width: "50%",
    padding: "10px",
    marginBottom: "16px", // Add some space between the text fields
    textAlign: "left",
    "& .MuiOutlinedInput-root": {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: "thin",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: "thin",
      },
    },
  },
  title: {
    color: "white",
    fontSize: 35,
    marginTop: "0",
    marginBottom: "0",
    fontFamily: "Inter",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "0",
    fontFamily: "Inter",
  },
  label: {
    fontSize: 20, // Change the font size
    fontWeight: "bold", // Make the label bold
    marginBottom: "8px", // Add some space below the label and input field
    fontFamily: "Inter",
  },
}));

const initialValues = {
  step1: {
    employeeId: null,
    agency_Code: null,
    first_Name: null,
    last_Name: null,
    middle_Initial: null,
    home_Address: null,
    home_Telephone: null,
    position_Level: null,
    organization_Mailing_Address: null,
    office_Telephone: null,
    work_Email_Address: null,
    position_Title: null,
    isSpecialAccomodationNeeded: null,
    specialAccomodation_Details: null,
    education_Level: null,
    pay_Plan: null,
    series: null,
    grade: null,
    step: null,
  },
  step2: {
    courseId: null,
    courseName: null,
    vendorId: null,
    vendor_Name: null,
    vendor_Mailing_Address: null,
    vendor_Telephone_Number: null,
    vendor_Email_Address: null,
    vendor_Website: null,
    vendor_POC: null,
  },
  step3: {
    requestId: null,
    vendorId: null,
    vendor_Name: null,
    vendor_Mailing_Address: null,
    vendor_Telephone_Number: null,
    vendor_Email_Address: null,
    vendor_Website: null,
    vendor_POC: null,
    courseName: null,
    courseId: null,
    training_StartDate: null,
    training_EndDate: null,
    training_DutyHours: null,
    training_NonDutyHours: null,
    training_PurposeType: null,
    training_TypeCode: null,
    training_SubTypeCode: null,
    training_DeliveryTypeCode: null,
    training_DesignationTypeCode: null,
    training_Credit: null,
    training_CreditTypeCode: null,
    training_AccreditionIndicator: null,
    continued_Service_Agreement_ExpirationDate: null,
    training_Source_TypeCode: null,
    individual_or_Group_Training: null,
    student_Membership_ID: null,
    skill_Learning_Objective: null,
  },
};

const validationSchema = Yup.object().shape({
  step1: Yup.object().shape({
    employeeId: Yup.string().required("Employee ID is required"),
  }),
  step3: Yup.object().shape({
    requestId: Yup.string().required("Request ID is required"),
    courseId: Yup.string().required("Course ID is required"),
    vendorId: Yup.string().required("Vendor ID is required"),
  }),
});

export const RequestForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  // Open dialog box when user clicks submit
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  const handleDialogClose = () => {
    setDialogOpen(false);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // If the user is on the last step, submit the form
      if (activeStep === steps.length - 1) {
        handleCreateRequest(values);
        setDialogOpen(true);
        resetForm();
        setActiveStep(0);
      } else {
        // This ensures that when the form is submitted at step 3,
        // the API call is made, the dialog is displayed, the form is reset,
        // and the user is taken back to step 1. If the form is submitted at
        // any step other than step 3, the user is simply taken to the next step.
        setActiveStep(activeStep + 1);
      }
    },
  });

  const steps = [
    {
      label: "Step 1",
      content: (
        <>
          {/* Step 1 text fields go here */}
          <label className={classes.label}>Employee Information</label>
          <TextField
            {...formik.getFieldProps("step1.employeeId")}
            key="step1.employeeId"
            label="Employee ID"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Employee ID is the 9 digit number on your ID badge. If you do not know your Employee ID, please contact your HR representative.",
            }}
            error={
              formik.touched.step1?.employeeId &&
              Boolean(formik.errors.step1?.employeeId)
            }
            helperText={
              formik.touched.step1?.employeeId &&
              formik.errors.step1?.employeeId
            }
          />
          <TextField
            {...formik.getFieldProps("step1.agency_Code")}
            key="step1.agency_Code"
            label="Agency Code"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Agency Code is the first 3 digits of your employee ID. If you do not know your Agency Code, please contact your HR representative.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step1.first_Name")}
            key="step1.first_Name"
            label="First Name"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.last_Name")}
            key="step1.last_Name"
            label="Last Name"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.middle_Initial")}
            key="step1.middle_Initial"
            label="Middle Initial"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.home_Address")}
            key="step1.home_Address"
            label="Home Address"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.home_Telephone")}
            key="step1.home_Telephone"
            label="Home Telephone"
            variant="outlined"
            className={classes.textfield}
          />
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step1.position_Level">
              Position Level
            </InputLabel>
            <Select
              label="Position Level"
              {...formik.getFieldProps("step1.position_Level")}
              inputProps={{
                name: "step1.position_Level",
                id: "step1.position_Level",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Non-supervisory">Non-supervisory</MenuItem>
              <MenuItem value="Supervisory">Supervisory</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Executive">Executive</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...formik.getFieldProps("step1.organization_Mailing_Address")}
            key="step1.organization_Mailing_Address"
            label="Organization Mailing Address"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the internal agency address of the applicant's Branch-Division/Office/Bureau/Agency, including the street name, city, state and zip code.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step1.office_Telephone")}
            key="step1.office_Telephone"
            label="Office Telephone"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.work_Email_Address")}
            key="step1.work_Email_Address"
            label="Work Email Address"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.position_Title")}
            key="step1.position_Title"
            label="Position Title"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the applicant's current position title within the agency.",
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  formik.values.step1.isSpecialAccomodationNeeded || false
                }
                onChange={(e) =>
                  formik.setFieldValue(
                    "step1.isSpecialAccomodationNeeded",
                    e.target.checked
                  )
                }
                name="step1.isSpecialAccomodationNeeded"
              />
            }
            label="Is Special Accomodation Needed?"
            className={classes.checkbox}
          />

          <TextField
            {...formik.getFieldProps("step1.specialAccomodation_Details")}
            key="step1.specialAccomodation_Details"
            label="Special Accomodation Details"
            variant="outlined"
            className={classes.textfield}
            disabled={!formik.values.step1.isSpecialAccomodationNeeded}
            InputProps={{
              title:
                "Check box if the applicant is in need of special arrangements (brailing, taping, interpreters, facility accessibility, etc.).",
            }}
          />
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step1.education_Level">
              Education Level
            </InputLabel>
            <Select
              label="Education Level"
              {...formik.getFieldProps("step1.education_Level")}
              inputProps={{
                name: "step1.education_Level",
                id: "step1.education_Level",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value="High School">High School</MenuItem>
              <MenuItem value="Associate's">Associate's</MenuItem>
              <MenuItem value="Bachelor's">Bachelor's</MenuItem>
              <MenuItem value="Master's">Master's</MenuItem>
              <MenuItem value="Doctorate">Doctorate</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...formik.getFieldProps("step1.pay_Plan")}
            key="step1.pay_Plan"
            label="Pay Plan"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the applicant's pay plan. (e.g., GS, WG, ES…Pay Band).",
            }}
          />
          <TextField
            {...formik.getFieldProps("step1.series")}
            key="step1.series"
            label="Series"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the applicant's position classification four-digit series (e.g., 0201).",
            }}
          />
          <TextField
            {...formik.getFieldProps("step1.grade")}
            key="step1.grade"
            label="Grade"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title: "Enter the applicant's grade level (1-15).",
            }}
          />
          <TextField
            {...formik.getFieldProps("step1.step")}
            key="step1.step"
            label="Step"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title: "The applicant must insert the appropriate step (1-10).",
            }}
          />
        </>
      ),
    },
    {
      label: "Step 2",
      content: (
        // Using step 3 state variables for step 2 because the variables are the same
        // Don't want the user to have to fill out the same information twice
        <>
          {/* Step 2 text fields go here */}
          <label className={classes.label}>Course Information</label>
          <TextField
            {...formik.getFieldProps("step3.courseId")}
            key="step3.courseId"
            label="Course ID"
            variant="outlined"
            className={classes.textfield}
            error={
              formik.touched.step3?.courseId &&
              Boolean(formik.errors.step3?.courseId)
            }
            helperText={
              formik.touched.step3?.courseId && formik.errors.step3?.courseId
            }
            InputProps={{
              title: "Enter the number assigned to the course.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.courseName")}
            key="step3.courseName"
            label="Course Name"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "The title of the course or the program that the applicant is scheduled to complete.",
            }}
          />
          <label className={classes.label}>Vendor Information</label>
          <TextField
            {...formik.getFieldProps("step3.vendorId")}
            key="step3.vendorId"
            label="Vendor ID"
            variant="outlined"
            className={classes.textfield}
            error={
              formik.touched.step3?.vendorId &&
              Boolean(formik.errors.step3?.vendorId)
            }
            helperText={
              formik.touched.step3?.vendorId && formik.errors.step3?.vendorId
            }
            InputProps={{
              title: "Vendor ID is the same as the vendor's site code.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Name")}
            key="step3.vendor_Name"
            label="Vendor Name"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Mailing_Address")}
            key="step3.vendor_Mailing_Address"
            label="Vendor Mailing Address"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the mailing address of the training vendor, including the street number, city, state, and ZIP code.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Telephone_Number")}
            key="step3.vendor_Telephone_Number"
            label="Vendor Telephone Number"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Email_Address")}
            key="step3.vendor_Email_Address"
            label="Vendor Email Address"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Website")}
            key="step3.vendor_Website"
            label="Vendor Website"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_POC")}
            key="step3.vendor_POC"
            label="Vendor POC"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title: "Enter the name of the vendor's point-of-contact (POC).",
            }}
          />
        </>
      ),
    },
    {
      label: "Step 3",
      content: (
        <>
          <label className={classes.label}>Request Information</label>
          <TextField
            // formik.getFieldProps, returns an object containing properties such as
            // value, onChange, onBlur, and name, which are then spread onto the TextField component
            {...formik.getFieldProps("step3.requestId")}
            key="step3.requestId"
            label="Request ID"
            variant="outlined"
            className={classes.textfield}
            error={
              formik.touched.step3?.requestId &&
              Boolean(formik.errors.step3?.requestId)
            }
            helperText={
              formik.touched.step3?.requestId && formik.errors.step3?.requestId
            }
            InputProps={{
              title: "Enter a unique code to be used to identify your request.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.courseId")}
            key="step3.courseId"
            label="Course ID"
            variant="outlined"
            className={classes.textfield}
            error={
              formik.touched.step3?.courseId &&
              Boolean(formik.errors.step3?.courseId)
            }
            helperText={
              formik.touched.step3?.courseId && formik.errors.step3?.courseId
            }
            InputProps={{
              title: "Enter the number assigned to the course.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.courseName")}
            key="step3.courseName"
            label="Course Name"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "The title of the course or the program that the applicant is scheduled to complete.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.vendorId")}
            key="step3.vendorId"
            label="Vendor ID"
            variant="outlined"
            className={classes.textfield}
            error={
              formik.touched.step3?.vendorId &&
              Boolean(formik.errors.step3?.vendorId)
            }
            helperText={
              formik.touched.step3?.vendorId && formik.errors.step3?.vendorId
            }
            InputProps={{
              title: "Vendor ID is the same as the vendor's site code.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Name")}
            key="step3.vendor_Name"
            label="Vendor Name"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Mailing_Address")}
            key="step3.vendor_Mailing_Address"
            label="Vendor Mailing Address"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the mailing address of the training vendor, including the street number, city, state, and ZIP code.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Telephone_Number")}
            key="step3.vendor_Telephone_Number"
            label="Vendor Telephone Number"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Email_Address")}
            key="step3.vendor_Email_Address"
            label="Vendor Email Address"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Website")}
            key="step3.vendor_Website"
            label="Vendor Website"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_POC")}
            key="step3.vendor_POC"
            label="Vendor POC"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title: "Enter the name of the vendor's point-of-contact (POC).",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.training_StartDate")}
            key="step3.training_StartDate"
            label="Training Start Date"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title: "Enter date in this format: 2023-04-23T18:25:43.511Z",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.training_EndDate")}
            key="step3.training_EndDate"
            label="Training End Date"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title: "Enter date in this format: 2023-04-23T18:25:43.511Z",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.training_DutyHours")}
            key="step3.training_DutyHours"
            label="Training Duty Hours"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_NonDutyHours")}
            key="step3.training_NonDutyHours"
            label="Training Non Duty Hours"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_PurposeType")}
            key="step3.training_PurposeType"
            label="Training Purpose Type"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_TypeCode")}
            key="step3.training_TypeCode"
            label="Training Type Code"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_SubTypeCode")}
            key="step3.training_SubTypeCode"
            label="Training Sub Type Code"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_DeliveryTypeCode")}
            key="step3.training_DeliveryTypeCode"
            label="Training Delivery Type Code"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_DesignationTypeCode")}
            key="step3.training_DesignationTypeCode"
            label="Training Designation Type Code"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_Credit")}
            key="step3.training_Credit"
            label="Training Credit"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_CreditTypeCode")}
            key="step3.training_CreditTypeCode"
            label="Training Credit Type Code"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_AccreditionIndicator")}
            key="step3.training_AccreditionIndicator"
            label="Training Accredition Indicator"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps(
              "step3.continued_Service_Agreement_ExpirationDate"
            )}
            key="step3.continued_Service_Agreement_ExpirationDate"
            label="Continued Service Agreement Expiration Date"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_Source_TypeCode")}
            key="step3.training_Source_TypeCode"
            label="Training Source Type Code"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.individual_or_Group_Training")}
            key="step3.individual_or_Group_Training"
            label="Individual or Group Training"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.student_Membership_ID")}
            key="step3.student_Membership_ID"
            label="Student Membership ID"
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.skill_Learning_Objective")}
            key="step3.skill_Learning_Objective"
            label="Skill Learning Objective"
            variant="outlined"
            className={classes.textfield}
          />
        </>
      ),
    },
  ];

  const stepFields = {
    step1: ["employeeId"],
    step2: [],
    step3: ["requestId", "courseId", "vendorId"],
  };

  // The handleNext function ensures that the form only proceeds to the next step
  // if all fields in the current step pass validation. It also handles steps that
  // don't have any fields by simply moving to the next step.
  const handleNext = async () => {
    const currentStepName = `step${activeStep + 1}`;
    const fieldNames = stepFields[currentStepName];

    if (fieldNames.length > 0) {
      // Run validation for each field in the current step
      const validationPromises = fieldNames.map((fieldName) =>
        formik.validateField(`${currentStepName}.${fieldName}`)
      );

      try {
        await Promise.all(validationPromises);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        // Do nothing, Formik will handle displaying the errors
      }
    } else {
      // Proceed to the next step if there are no fields in the current step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  // Function handles create request on the frontend and backend
  const handleCreateRequest = async () => {
    // Run validation on the entire form
    await formik.validateForm();

    // Check if there are any errors in the form
    if (Object.keys(formik.errors).length === 0) {
      try {
        // Send a POST request to the backend API to create a new row in the database
        const response1 = await fetch("http://localhost:5201/api/Employees/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values.step1),
        });
        const response2 = await fetch("http://localhost:5201/api/Courses/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values.step3),
        });
        const response3 = await fetch("http://localhost:5201/api/Vendors/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values.step3),
        });
        const response4 = await fetch("http://localhost:5201/api/Requests/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values.step3),
        });

        if (!response1.ok && !response2.ok && !response3.ok && !response4.ok) {
          throw new Error("Failed to create request");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Form has errors, cannot submit");
    }
  };

  return (
    <div className={classes.background}>
      <div className={classes.containerTitle}>
        <h1 className={classes.title}>
          Training Request Form Based on the Authorization, Agreement, and
          Certification of Training(SF-182)
        </h1>
        <p className={classes.subtitle}>
          Form used by the United States federal government to request training
          and development for federal employees
        </p>
      </div>
      <div className={classes.containerForm}>
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
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={formik.submitForm}
                >
                  Submit
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
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
      <Dialog
        open={dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Form Submitted</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The form has been submitted successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
