import React, { Component } from 'react';
import { Formik } from 'formik';
import { object, ref, string } from 'yup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Spinner from './Spinner';
import Alert from './Alert';
import Sidebar from './Sidebar';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { classExpression } from '@babel/types';


// useEffect(() => {
//        const {
//          match: { params }
//        } = props;
//        console.log(params);
//        fetch(`${Password}`,
//           {method:"GET",
//           headers: setAuthorizationHeader(isAuthenticated)})
//          .then(response => {
//            console.log(response);
//            return response.json();
//          })

 

class PasswordChange extends Component {
    state = {
        passChangeSuccess: false,
    }


    

    

    _handleModalClose = () => {
        this.setState(() => ({
            passChangeSuccess: false,
        }))
    }

    _renderModal = () => {
        const onClick = () => {
            this.setState(() => ({ passChangeSuccess: false }))
        }

        return (
            <Alert
                isOpen={this.state.passChangeSuccess}
                onClose={this._handleClose}
                handleSubmit={onClick}
                title="Password Reset"
                text="Your password was changed successfully"
                submitButtonText="Done"
            />
        )
    }

    _handleSubmit = ({
        currentPass,
        newPass,
        confirmPass,
        setSubmitting,
        resetForm,
    }) => {
        // fake async login
        setTimeout(async () => {
            setSubmitting(false)

            this.setState(() => ({
                passChangeSuccess: true,
            }))

            resetForm()
        }, 1000)
    }

    render() {
       return (
          <div className="Content">
            <Sidebar props={this.props} isDashBoard={"true"} />
            <Formik
              initialValues={{
                currentPass: "",
                newPass: "",
                confirmPass: ""
              }}
              validationSchema={object().shape({
                currentPass: string().required("Current password is required"),
                newPass: string().required("New password is required"),
                confirmPass: string()
                  .oneOf([ref("newPass")], "Passwords do not match")
                  .required("Password is required")
              })}
              onSubmit={(
                { currentPass, newPass, confirmPass },
                { setSubmitting, resetForm }
              ) =>
                this._handleSubmit({
                  currentPass,
                  newPass,
                  confirmPass,
                  setSubmitting,
                  resetForm
                })
              }
              render={props => {
                const {
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                  isSubmitting
                } = props;
                return isSubmitting ? (
                  <Spinner />
                ) : (
                  <Paper variant="outlined" square elevation={10}>
                    <form className="form" onSubmit={handleSubmit}>
                      <FormControl>
                        
                        {/* margin="dense" */}
                        <InputLabel
                          htmlFor="password-current"
                          error={Boolean(
                            touched.currentPass && errors.currentPass
                          )}
                        >
                          {"Current Password"}
                        </InputLabel>
                        <Input
                          id="password-current"
                          name="currentPass"
                          type="password"
                          value={values.currentPass}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.currentPass && errors.currentPass
                          )}
                        />
                        <FormHelperText
                          error={Boolean(
                            touched.currentPass && errors.currentPass
                          )}
                        >
                          {touched.currentPass && errors.currentPass
                            ? errors.currentPass
                            : ""}
                        </FormHelperText>
                      </FormControl>
                      <FormControl
                        //fullWidth
                        margin="dense"
                        error={Boolean(touched.newPass && errors.newPass)}
                      >
                        <InputLabel
                          htmlFor="password-new"
                          error={Boolean(touched.newPass && errors.newPass)}
                        >
                          {"New Password"}
                        </InputLabel>
                        <Input
                          id="password-new"
                          name="newPass"
                          type="password"
                          value={values.newPass}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(touched.newPass && errors.newPass)}
                        />
                        <FormHelperText
                          error={Boolean(touched.newPass && errors.newPass)}
                        >
                          {touched.newPass && errors.newPass
                            ? errors.newPass
                            : ""}
                        </FormHelperText>
                      </FormControl>
                      <FormControl
                        //fullWidth
                        //margin="dense"
                        error={Boolean(
                          touched.confirmPass && errors.confirmPass
                        )}
                      >
                        <InputLabel
                          htmlFor="password-confirm"
                          error={Boolean(
                            touched.confirmPass && errors.confirmPass
                          )}
                        >
                          {"Confirm Password"}
                        </InputLabel>
                        <Input
                          id="password-confirm"
                          name="confirmPass"
                          type="password"
                          value={values.confirmPass}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(
                            touched.confirmPass && errors.confirmPass
                          )}
                        />
                        <FormHelperText
                          error={Boolean(
                            touched.confirmPass && errors.confirmPass
                          )}
                        >
                          {touched.confirmPass && errors.confirmPass
                            ? errors.confirmPass
                            : ""}
                        </FormHelperText>
                      </FormControl>
                      <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                        disabled={Boolean(!isValid || isSubmitting)}
                        style={{ margin: "16px" }}
                      >
                        {"Reset Password"}
                      </Button>
                    </form>
                    {this._renderModal()}
                  </Paper>
                );
              }}
            />
          </div>
        );
    }
}

PasswordChange.propTypes = {
  logout: PropTypes.func
};

 function mapStateToProps(state) {
  return { isAuthenticated: state.user.token };
}

export default connect(mapStateToProps, {logout})(PasswordChange);

