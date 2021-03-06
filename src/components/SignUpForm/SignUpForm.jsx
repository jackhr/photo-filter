import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = {...this.state};
      delete formData.error;
      delete formData.confirm;
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      // baby step
      this.props.setUser(user);
    } catch {
      // An error occurred
      this.setState({ error: 'Sign Up Failed - Try Again'});
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" className="auth-form" onSubmit={this.handleSubmit}>
            <div>
              <label>Name</label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div>
              <label>Password</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div>
              <label>Confirm</label>
              <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
            <div>
              <button type="submit" disabled={disable}>SIGN UP</button>
            </div>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}