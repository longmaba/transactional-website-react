import { connect } from 'react-redux';
import ChangePassword from 'components/security/ChangePassword';
import { changePassword } from 'ducks/auth';

const mapStateToProps = state => ({
  changeError: state.auth.changeError,
  message: state.auth.message,
  changingPassword: state.auth.changingPassword
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (oldPassword, newPassword) =>
    dispatch(changePassword(oldPassword, newPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
