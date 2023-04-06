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
    width: "300px", // set a fixed pixel width for the stepper
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

// Define the steps of the form
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
    employeeId: null,
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
    employeeId: Yup.string()
      .max(7, "ID must be at most 7 characters")
      .required("Employee ID is required"),
    first_Name: Yup.string().required("First Name is required"),
    last_Name: Yup.string().required("Last Name is required"),
    work_Email_Address: Yup.string()
      .email("Invalid email address")
      .required("Work Email Address is required"),
  }),
  step3: Yup.object().shape({
    requestId: Yup.string()
      .max(7, "ID must be at most 7 characters")
      .required("Request ID is required"),
    courseId: Yup.string()
      .max(7, "ID must be at most 7 characters")
      .required("Course ID is required"),
    vendorId: Yup.string()
      .max(7, "ID must be at most 7 characters")
      .required("Vendor ID is required"),
    courseName: Yup.string().required("Course Name is required"),
    vendor_Name: Yup.string().required("Vendor Name is required"),
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

  // EmployeeId state variable used to pass step1 employeeId to step3 employeeId
  const [employeeId, setEmployeeId] = useState("");

  // Define the steps of the form
  const steps = [
    {
      label: "Step 1",
      content: (
        <>
          {/* Step 1 text fields go here */}
          <label className={classes.label}>Employee Information</label>
          <TextField
            {...formik.getFieldProps("step1.employeeId")}
            onChange={(e) => {
              formik.getFieldProps("step1.employeeId").onChange(e);
              setEmployeeId(e.target.value);
            }}
            key="step1.employeeId"
            label="Employee ID"
            variant="outlined"
            className={classes.textfield}
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
            error={
              formik.touched.step1?.first_Name &&
              Boolean(formik.errors.step1?.first_Name)
            }
            helperText={
              formik.touched.step1?.first_Name &&
              formik.errors.step1?.first_Name
            }
          />
          <TextField
            {...formik.getFieldProps("step1.last_Name")}
            key="step1.last_Name"
            label="Last Name"
            variant="outlined"
            className={classes.textfield}
            error={
              formik.touched.step1?.last_Name &&
              Boolean(formik.errors.step1?.last_Name)
            }
            helperText={
              formik.touched.step1?.last_Name && formik.errors.step1?.last_Name
            }
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
            error={
              formik.touched.step1?.work_Email_Address &&
              Boolean(formik.errors.step1?.work_Email_Address)
            }
            helperText={
              formik.touched.step1?.work_Email_Address &&
              formik.errors.step1?.work_Email_Address
            }
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
            helperText={"Enter a four digit integer."}
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
            helperText={"Enter an integer between 1 and 15."}
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
            helperText={"Enter an integer between 1 and 10."}
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
            error={
              formik.touched.step3?.courseName &&
              Boolean(formik.errors.step3?.courseName)
            }
            helperText={
              formik.touched.step3?.courseName &&
              formik.errors.step3?.courseName
            }
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
            error={
              formik.touched.step3?.vendor_Name &&
              Boolean(formik.errors.step3?.vendor_Name)
            }
            helperText={
              formik.touched.step3?.vendor_Name &&
              formik.errors.step3?.vendor_Name
            }
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
            value={employeeId}
            key="step3.employeeId"
            label="Employee ID"
            variant="outlined"
            className={classes.textfield}
            disabled
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
            error={
              formik.touched.step3?.courseName &&
              Boolean(formik.errors.step3?.courseName)
            }
            helperText={
              formik.touched.step3?.courseName &&
              formik.errors.step3?.courseName
            }
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
            error={
              formik.touched.step3?.vendor_Name &&
              Boolean(formik.errors.step3?.vendor_Name)
            }
            helperText={
              formik.touched.step3?.vendor_Name &&
              formik.errors.step3?.vendor_Name
            }
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
              title: "Enter date in this format: yyyy-mm-ddT00:00:00.000Z",
            }}
            helperText={
              "Enter date and time in this format: 2023-04-23T18:25:43.511Z"
            }
          />
          <TextField
            {...formik.getFieldProps("step3.training_EndDate")}
            key="step3.training_EndDate"
            label="Training End Date"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title: "Enter date in this format: yyyy-mm-ddT00:00:00.000Z",
            }}
            helperText={
              "Enter date and time in this format: 2023-04-23T18:25:43.511Z"
            }
          />
          <TextField
            {...formik.getFieldProps("step3.training_DutyHours")}
            key="step3.training_DutyHours"
            label="Training Duty Hours"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the number of the applicant’s duty hours required to successfully complete the training.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.training_NonDutyHours")}
            key="step3.training_NonDutyHours"
            label="Training Non Duty Hours"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Number of employee’s non-duty hours required to successfully complete the training.",
            }}
          />
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step3.training_PurposeType">
              Training Purpose Type
            </InputLabel>
            <Select
              label="Training Purpose Type"
              {...formik.getFieldProps("step3.training_PurposeType")}
              inputProps={{
                name: "step3.training_PurposeType",
                id: "step3.training_PurposeType",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Program/Mission">Program/Mission</MenuItem>
              <MenuItem value="New Work Assignment">
                New Work Assignment
              </MenuItem>
              <MenuItem value="Improve/Maintain Present Performance">
                Improve/Maintain Present Performance
              </MenuItem>
              <MenuItem value="Future Staffing Needs">
                Future Staffing Needs
              </MenuItem>
              <MenuItem value="Develop Unavailable Skills">
                Develop Unavailable Skills
              </MenuItem>
              <MenuItem value="Retention">Retention</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step3.training_TypeCode">
              Training Type Code
            </InputLabel>
            <Select
              label="Training Type Code"
              {...formik.getFieldProps("step3.training_TypeCode")}
              inputProps={{
                name: "step3.training_TypeCode",
                id: "step3.training_TypeCode",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1 - Training Program Area</MenuItem>
              <MenuItem value={2}>2 - Developmental Training</MenuItem>
              <MenuItem value={3}>3 - Basic Training Area</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step3.training_SubTypeCode">
              Training Sub Type Code
            </InputLabel>
            <Select
              label="Training Sub Type Code"
              {...formik.getFieldProps("step3.training_SubTypeCode")}
              inputProps={{
                name: "step3.training_SubTypeCode",
                id: "step3.training_SubTypeCode",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1a - Medical and Health</MenuItem>
              <MenuItem value={2}>1b - Human Resources</MenuItem>
              <MenuItem value={3}>2a - Management Program</MenuItem>
              <MenuItem value={4}>2b - Mentoring Program</MenuItem>
              <MenuItem value={5}>3a - Employee Orientation</MenuItem>
              <MenuItem value={6}>3b - Federally Mandated Training</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step3.training_DeliveryTypeCode">
              Training Delivery Type Code
            </InputLabel>
            <Select
              label="Training Delivery Type Code"
              {...formik.getFieldProps("step3.training_DeliveryTypeCode")}
              inputProps={{
                name: "step3.training_DeliveryTypeCode",
                id: "step3.training_DeliveryTypeCode",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>
                1 - Traditional Classroom(no technology)
              </MenuItem>
              <MenuItem value={2}>2 - On the Job</MenuItem>
              <MenuItem value={3}>3 - Technology Based</MenuItem>
              <MenuItem value={4}>4 - Conference/Workshop</MenuItem>
              <MenuItem value={5}>5 - Blended</MenuItem>
              <MenuItem value={6}>6 - Correspondence</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step3.training_DesignationTypeCode">
              Training Designation Type Code
            </InputLabel>
            <Select
              label="Training Designation Type Code"
              {...formik.getFieldProps("step3.training_DesignationTypeCode")}
              inputProps={{
                name: "step3.training_DesignationTypeCode",
                id: "step3.training_DesignationTypeCode",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1 - Undergraduate Credit</MenuItem>
              <MenuItem value={2}>2 - Graduate Credit</MenuItem>
              <MenuItem value={3}>3 - Continuing Education Unit</MenuItem>
              <MenuItem value={4}>4 - Post Graduate Credit</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...formik.getFieldProps("step3.training_Credit")}
            key="step3.training_Credit"
            label="Training Credit"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the number of academic credit hours or continued education units (1, 1.5, or .75) earned by the applicant for the completed training.",
            }}
          />
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
            title="Select the appropriate training credit type code from the drop-down menu, only if \'training credit\' is greater than zero."
          >
            <InputLabel htmlFor="step3.training_CreditTypeCode">
              Training Credit Type Code
            </InputLabel>
            <Select
              label="Training Credit Type Code"
              {...formik.getFieldProps("step3.training_CreditTypeCode")}
              inputProps={{
                name: "step3.training_CreditTypeCode",
                id: "step3.training_CreditTypeCode",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1 - Semester Hours</MenuItem>
              <MenuItem value={2}>2 - Quarter Hours</MenuItem>
              <MenuItem value={3}>3 - Continuing Education Unit</MenuItem>
              <MenuItem value={4}>4 - Professional Development Unit</MenuItem>
              <MenuItem value={5}>
                5 - Continuing Professional Education
              </MenuItem>
              <MenuItem value={6}>6 - Continuous Learning Points</MenuItem>
              <MenuItem value={7}>7 - Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
            title="Select Yes in the drop-down menu if the vendor offering the course is recognized by an accrediting body (e.g. Department of Education). Select No if they are not."
          >
            <InputLabel htmlFor="step3.training_AccreditionIndicator">
              Training Accredition Indicator
            </InputLabel>
            <Select
              label="Training Accredition Indicator"
              {...formik.getFieldProps("step3.training_AccreditionIndicator")}
              inputProps={{
                name: "step3.training_AccreditionIndicator",
                id: "step3.training_AccreditionIndicator",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1 - Yes</MenuItem>
              <MenuItem value={0}>0 - No</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...formik.getFieldProps(
              "step3.continued_Service_Agreement_ExpirationDate"
            )}
            key="step3.continued_Service_Agreement_ExpirationDate"
            label="Continued Service Agreement Expiration Date"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Enter the date on which the Continued Service Agreement expires. Enter date and time in the following format: yyyy-mm-ddT00:00:00.000Z.",
            }}
            helperText={
              "Enter date and time in this format: 2023-04-23T18:25:43.511Z"
            }
          />
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step3.training_Source_TypeCode">
              Training Source Type Code
            </InputLabel>
            <Select
              label="Training Source Type Code"
              {...formik.getFieldProps("step3.training_Source_TypeCode")}
              inputProps={{
                name: "step3.training_Source_TypeCode",
                id: "step3.training_Source_TypeCode",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1 - Government Internal</MenuItem>
              <MenuItem value={2}>2 - Government External</MenuItem>
              <MenuItem value={3}>3 - Non-government</MenuItem>
              <MenuItem value={4}>4 - Government State/Local</MenuItem>
              <MenuItem value={5}>
                5 - Foreign Governments and Organizations
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.textfield}
            fullWidth
          >
            <InputLabel htmlFor="step3.individual_or_Group_Training">
              Individual or Group Training
            </InputLabel>
            <Select
              label="Individual or Group Training"
              {...formik.getFieldProps("step3.individual_or_Group_Training")}
              inputProps={{
                name: "step3.individual_or_Group_Training",
                id: "step3.individual_or_Group_Training",
              }}
            >
              <MenuItem value="null">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Individual">Individual</MenuItem>
              <MenuItem value="Group">Group</MenuItem>
            </Select>
          </FormControl>
          <TextField
            {...formik.getFieldProps("step3.student_Membership_ID")}
            key="step3.student_Membership_ID"
            label="Student Membership ID"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "If applicable, enter applicant’s Student ID/Membership ID assigned by the Training Vendor.",
            }}
          />
          <TextField
            {...formik.getFieldProps("step3.skill_Learning_Objective")}
            key="step3.skill_Learning_Objective"
            label="Skill Learning Objective"
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              title:
                "Explain how the training event meets agency objective(s) and purpose type.",
            }}
          />
        </>
      ),
    },
  ];

  // Function handles next button
  const handleNext = async () => {
    // Proceed to the next step
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  // Function handles back button
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  // Function handles create requests
  const handleCreateRequest = async () => {
    // Run validation on the entire form
    await formik.validateForm();

    // Check if there are any errors in the form
    if (Object.keys(formik.errors).length === 0) {
      try {
        // Send a POST request to the backend API to create a new row in the database
        const response1 = await fetch(
          "https://training-form.herokuapp.com/api/Employees/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formik.values.step1),
          }
        );
        const response2 = await fetch(
          "https://training-form.herokuapp.com/api/Requests/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formik.values.step3,
              employeeId: employeeId,
            }),
          }
        );

        if (!response1.ok && !response2.ok) {
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
          Federal Employee Training Request Form (SF-182 Based)
        </h1>
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
