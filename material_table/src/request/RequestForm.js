import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import "typeface-inter";

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
      width: "300%",
    },
  },
  containerTitle: {
    marginTop: "48px",
    display: "flex",
    flexDirection: "column",
  },
  containerForm: {
    marginTop: "120px",
    marginBottom: "120px",
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
    backgroundColor: "#42a5f5",
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
    fontSize: 40,
    marginTop: "0",
    marginBottom: "0",
    //zIndex: "10",
    fontFamily: "Inter",
  },
  yellowText: {
    color: "#ffd700",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "0",
    fontFamily: "Inter",
  },
  greenText: {
    color: "#8bc34a",
  },
}));

const initialValues = {
  step1: {
    employeeId: "test",
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
  step3: Yup.object().shape({
    requestId: Yup.string().required("Request ID is required"),
  }),
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
      content: (
        <>
          {/* Step 1 text fields go here */}
          <TextField
            {...formik.getFieldProps("step1.employeeId")}
            label="Employee ID"
            onChange={formik.handleChange}
            value={formik.values.step1.employeeId}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.agency_Code")}
            label="Agency Code"
            onChange={formik.handleChange}
            value={formik.values.step1.agency_Code}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.first_Name")}
            label="First Name"
            onChange={formik.handleChange}
            value={formik.values.step1.first_Name}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.last_Name")}
            label="Last Name"
            onChange={formik.handleChange}
            value={formik.values.step1.last_Name}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.middle_Initial")}
            label="Middle Initial"
            onChange={formik.handleChange}
            value={formik.values.step1.middle_Initial}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.home_Address")}
            label="Home Address"
            onChange={formik.handleChange}
            value={formik.values.step1.home_Address}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.home_Telephone")}
            label="Home Telephone"
            onChange={formik.handleChange}
            value={formik.values.step1.home_Telephone}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.position_Level")}
            label="Position Level"
            onChange={formik.handleChange}
            value={formik.values.step1.position_Level}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.organization_Mailing_Address")}
            label="Organization Mailing Address"
            onChange={formik.handleChange}
            value={formik.values.step1.organization_Mailing_Address}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.office_Telephone")}
            label="Office Telephone"
            onChange={formik.handleChange}
            value={formik.values.step1.office_Telephone}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.work_Email_Address")}
            label="Work Email Address"
            onChange={formik.handleChange}
            value={formik.values.step1.work_Email_Address}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.position_Title")}
            label="Position Title"
            onChange={formik.handleChange}
            value={formik.values.step1.position_Title}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.isSpecialAccomodationNeeded")}
            label="Is Special Accomodation Needed"
            onChange={formik.handleChange}
            value={formik.values.step1.isSpecialAccomodationNeeded}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.specialAccomodation_Details")}
            label="Special Accomodation Details"
            onChange={formik.handleChange}
            value={formik.values.step1.specialAccomodation_Details}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.education_Level")}
            label="Education Level"
            onChange={formik.handleChange}
            value={formik.values.step1.education_Level}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.pay_Plan")}
            label="Pay Plan"
            onChange={formik.handleChange}
            value={formik.values.step1.pay_Plan}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.series")}
            label="Series"
            onChange={formik.handleChange}
            value={formik.values.step1.series}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.grade")}
            label="Grade"
            onChange={formik.handleChange}
            value={formik.values.step1.grade}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step1.step")}
            label="Step"
            onChange={formik.handleChange}
            value={formik.values.step1.step}
            variant="outlined"
            className={classes.textfield}
          />
        </>
      ),
    },
    {
      label: "Step 2",
      content: (
        <>
          {/* Step 2 text fields go here */}
          <TextField
            {...formik.getFieldProps("step2.courseId")}
            label="Course ID"
            onChange={formik.handleChange}
            value={formik.values.step2.courseId}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step2.courseName")}
            label="Course Name"
            onChange={formik.handleChange}
            value={formik.values.step2.courseName}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step2.vendorId")}
            label="Vendor ID"
            onChange={formik.handleChange}
            value={formik.values.step2.vendorId}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step2.vendor_Name")}
            label="Vendor Name"
            onChange={formik.handleChange}
            value={formik.values.step2.vendor_Name}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step2.vendor_Mailing_Address")}
            label="Vendor Mailing Address"
            onChange={formik.handleChange}
            value={formik.values.step2.vendor_Mailing_Address}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step2.vendor_Telephone_Number")}
            label="Vendor Telephone Number"
            onChange={formik.handleChange}
            value={formik.values.step2.vendor_Telephone_Number}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step2.vendor_Email_Address")}
            label="Vendor Email Address"
            onChange={formik.handleChange}
            value={formik.values.step2.vendor_Email_Address}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step2.vendor_Website")}
            label="Vendor Website"
            onChange={formik.handleChange}
            value={formik.values.step2.vendor_Website}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step2.vendor_POC")}
            label="Vendor POC"
            onChange={formik.handleChange}
            value={formik.values.step2.vendor_POC}
            variant="outlined"
            className={classes.textfield}
          />
        </>
      ),
    },
    {
      label: "Step 3",
      content: (
        <>
          <TextField
            // formik.getFieldProps, returns an object containing properties such as
            // value, onChange, onBlur, and name, which are then spread onto the TextField component
            {...formik.getFieldProps("step3.requestId")}
            label="Request ID"
            onChange={formik.handleChange}
            value={formik.values.step3.requestId}
            variant="outlined"
            className={classes.textfield}
            error={
              Boolean(formik.touched.step3?.requestId) &&
              Boolean(formik.errors.step3?.requestId)
            }
            helperText={
              formik.touched.step3?.requestId && formik.errors.step3?.requestId
            }
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Name")}
            label="Vendor Name"
            onChange={formik.handleChange}
            value={formik.values.step3.vendor_Name}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Mailing_Address")}
            label="Vendor Mailing Address"
            onChange={formik.handleChange}
            value={formik.values.step3.vendor_Mailing_Address}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Telephone_Number")}
            label="Vendor Telephone Number"
            onChange={formik.handleChange}
            value={formik.values.step3.vendor_Telephone_Number}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Email_Address")}
            label="Vendor Email Address"
            onChange={formik.handleChange}
            value={formik.values.step3.vendor_Email_Address}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_Website")}
            label="Vendor Website"
            onChange={formik.handleChange}
            value={formik.values.step3.vendor_Website}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.vendor_POC")}
            label="Vendor POC"
            onChange={formik.handleChange}
            value={formik.values.step3.vendor_POC}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.courseName")}
            label="Course Name"
            onChange={formik.handleChange}
            value={formik.values.step3.courseName}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.courseId")}
            label="Course ID"
            onChange={formik.handleChange}
            value={formik.values.step3.courseId}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_StartDate")}
            label="Training Start Date"
            onChange={formik.handleChange}
            value={formik.values.step3.training_StartDate}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_EndDate")}
            label="Training End Date"
            onChange={formik.handleChange}
            value={formik.values.step3.training_EndDate}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_DutyHours")}
            label="Training Duty Hours"
            onChange={formik.handleChange}
            value={formik.values.step3.training_DutyHours}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_NonDutyHours")}
            label="training Non Duty Hours"
            onChange={formik.handleChange}
            value={formik.values.step3.training_NonDutyHours}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_PurposeType")}
            label="Training Purpose Type"
            onChange={formik.handleChange}
            value={formik.values.step3.training_PurposeType}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_TypeCode")}
            label="Training Type Code"
            onChange={formik.handleChange}
            value={formik.values.step3.training_TypeCode}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_SubTypeCode")}
            label="Training Sub Type Code"
            onChange={formik.handleChange}
            value={formik.values.step3.training_SubTypeCode}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_DeliveryTypeCode")}
            label="Training Delivery Type Code"
            onChange={formik.handleChange}
            value={formik.values.step3.training_DeliveryTypeCode}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_DesignationTypeCode")}
            label="Training Designation Type Code"
            onChange={formik.handleChange}
            value={formik.values.step3.training_DesignationTypeCode}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_Credit")}
            label="Training Credit"
            onChange={formik.handleChange}
            value={formik.values.step3.training_Credit}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_CreditTypeCode")}
            label="Training Credit Type Code"
            onChange={formik.handleChange}
            value={formik.values.step3.training_CreditTypeCode}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_AccreditionIndicator")}
            label="Training Accredition Indicator"
            onChange={formik.handleChange}
            value={formik.values.step3.training_AccreditionIndicator}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps(
              "step3.continued_Service_Agreement_ExpirationDate"
            )}
            label="Continued Service Agreement Expiration Date"
            onChange={formik.handleChange}
            value={
              formik.values.step3.continued_Service_Agreement_ExpirationDate
            }
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.training_Source_TypeCode")}
            label="Training Source Type Code"
            onChange={formik.handleChange}
            value={formik.values.step3.training_Source_TypeCode}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.individual_or_Group_Training")}
            label="Individual or Group Training"
            onChange={formik.handleChange}
            value={formik.values.step3.individual_or_Group_Training}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.student_Membership_ID")}
            label="Student Membership ID"
            onChange={formik.handleChange}
            value={formik.values.step3.student_Membership_ID}
            variant="outlined"
            className={classes.textfield}
          />
          <TextField
            {...formik.getFieldProps("step3.skill_Learning_Objective")}
            label="Skill Learning Objective"
            onChange={formik.handleChange}
            value={formik.values.step3.skill_Learning_Objective}
            variant="outlined"
            className={classes.textfield}
          />
        </>
      ),
    },
  ];

  const stepFields = {
    step1: [],
    step2: [],
    step3: ["requestId"],
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
          body: JSON.stringify(formik.values.step2),
        });
        const response3 = await fetch("http://localhost:5201/api/Vendors/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formik.values.step2),
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
          Authorization, Agreement, and Certification of Training(SF-182)
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
    </div>
  );
};
