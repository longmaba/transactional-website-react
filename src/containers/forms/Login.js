import { connect } from 'react-redux';
import Login from 'components/pages/Login';
import { login, resendActivationEmail } from 'ducks/auth';

const mapStateToProps = state => ({
  loginError: state.auth.loginError,
  unactivated: state.auth.unactivated,
  loggingIn: state.auth.loggingIn
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password, tfa) => dispatch(login(email, password, tfa)),
  onResendActivation: email => dispatch(resendActivationEmail(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
