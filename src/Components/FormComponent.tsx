import React from "react";
import {
  TextField,
  Box,
  Button,
  InputLabel,
  Checkbox,
  Typography,
} from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { green } from "@material-ui/core/colors";

interface FormComponentState {
  email: string;
  firstName: string;
  lastName: string;
  cvFile: File | null;
  coverLetterFile: File | null;
  agreementChecked: boolean;
  isEmailValid: boolean;
}

class FormComponent extends React.Component<{}, FormComponentState> {
  state: FormComponentState = {
    email: "",
    firstName: "",
    lastName: "",
    cvFile: null,
    coverLetterFile: null,
    agreementChecked: false,
    isEmailValid: true,
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedState: Pick<FormComponentState, keyof FormComponentState> = {
      ...this.state,
      [name]: value,
    };
    this.setState(updatedState, () => {
      if (name === "email") {
        this.validateEmail(value);
      }
    });
  };

  validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    this.setState({
      isEmailValid: isValid,
    });
  };

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];

      this.setState((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    } else {
      // If no file is selected, clear the value
      this.setState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form Data:", this.state);

    this.setState({
      email: "",
      firstName: "",
      lastName: "",
      cvFile: null,
      coverLetterFile: null,
      agreementChecked: false,
      isEmailValid: true,
    });
  };

  render() {
    const { isEmailValid } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Box
            mb={4}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ marginBottom: "8px" }}
            >
              Email Address*
            </Typography>
            <TextField
              style={{ width: "500px", margin: "5px 0" }}
              type="email"
              variant="outlined"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder="Enter your email address"
              required
              error={!isEmailValid}
              helperText={!isEmailValid ? "Invalid email address" : ""}
            />
          </Box>
          <Box
            mb={4}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ marginBottom: "8px" }}
            >
              First Name*
            </Typography>
            <TextField
              style={{ width: "500px", margin: "5px 0" }}
              type="text"
              variant="outlined"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
              placeholder="Enter your first name here"
              required
            />
          </Box>
          <Box
            mb={4}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ marginBottom: "8px" }}
            >
              Last Name*
            </Typography>
            <TextField
              style={{ width: "500px", margin: "5px 0" }}
              type="text"
              variant="outlined"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
              placeholder="Enter your last name here"
              required
            />
          </Box>
          <Box
            mb={4}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ marginBottom: "8px" }}
            >
              Attach CV*
            </Typography>
            <TextField
              style={{ width: "500px", margin: "5px 0" }}
              type="text"
              variant="outlined"
              name="cvFile"
              value={this.state.cvFile ? this.state.cvFile.name : ""}
              placeholder="Drop here from Desktop and simple click and attach"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Button
                    component="label"
                    color="primary"
                    htmlFor="cvFileInput"
                    style={{ color: green[500] }}
                  >
                    <AttachFileIcon />{" "}

                    <input
                      type="file"
                      id="cvFileInput"
                      style={{ display: "none" }}
                      onChange={this.handleFileChange}
                      accept=".doc,.docx,.pdf,.rtf,.txt"
                      name="cvFile"
                      required
                    />
                  </Button>
                ),
                style: { display: "flex", alignItems: "center" },
              }}
            />
            <InputLabel>.doc,.docx,.pdf,.rtf,.txt</InputLabel>
          </Box>

          <Box
            mb={4}
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ marginBottom: "8px" }}
            >
              Attach Cover Letter (if any)
            </Typography>
            <TextField
              style={{ width: "500px", margin: "5px 0" }}
              type="text"
              variant="outlined"
              name="coverLetterFile"
              value={
                this.state.coverLetterFile
                  ? this.state.coverLetterFile.name
                  : ""
              }
              placeholder="Drop here from Desktop and simple click and attach"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Button
                    component="label"
                    color="primary"
                    htmlFor="coverLetterFileInput"
                    style={{ color: green[500] }} // Change the color of the icon
                  >
                    <AttachFileIcon />{" "}
                    {/* Change the color of the icon */}
                    <input
                      type="file"
                      id="coverLetterFileInput"
                      style={{ display: "none" }}
                      onChange={this.handleFileChange}
                      accept=".doc,.docx,.pdf,.rtf,.txt"
                      name="coverLetterFile"
                    />
                  </Button>
                ),
                style: { display: "flex", alignItems: "center" },
              }}
            />
            <InputLabel>.doc,.docx,.pdf,.rtf,.txt</InputLabel>
          </Box>

          <Box display="flex" alignItems="center">
            <Typography variant="body2">
              <Checkbox
                color="primary"
                checked={this.state.agreementChecked}
                onChange={this.handleCheckboxChange}
                name="agreementChecked"
                style={{ color: green[500] }} // Change the color of the checkbox
                required
              />
              I agree to the <strong>Terms and Conditions</strong> and confirm
              that I've reviewed the <strong>Privacy Policy</strong>.
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ backgroundColor: green[500] }} // Change the background color of the submit button
            >
             Submit
            </Button>
          </Box>
        </Box>
      </form>
    );
  }
}

export default FormComponent;
