import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSigninStart, emailSigninStart } from '../../redux/user/user.actions';

import { SignInContainer, Title, ButtonsContainer } from './sign-in.styles';

class SignIn extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { emailSigninStart } = this.props;
    const { email, password } = this.state;

    emailSigninStart(email, password);
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { googleSigninStart } = this.props;
    return (
      <SignInContainer>
        <Title>I already have an account</Title>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <ButtonsContainer>
            <CustomButton type="submit"> Sign in </CustomButton>
            <CustomButton type="button" onClick={googleSigninStart} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    );
  }
}



export default connect(
  null,
  { googleSigninStart, 
    emailSigninStart: (email, password) => emailSigninStart({ email, password })}
  
)(SignIn);
