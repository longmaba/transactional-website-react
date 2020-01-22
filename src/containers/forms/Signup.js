import { connect } from 'react-redux';
import Signup from 'components/pages/Signup';
import { signup } from 'ducks/auth';

const mapStateToProps = state => ({
  referralCode: state.auth.referralCode,
  registrationError: state.auth.registrationError,
  sendingRegistration: state.auth.sendingRegistration
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password, username, referralCode) =>
    dispatch(signup(email, password, username, referralCode))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
