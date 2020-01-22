import { connect } from 'react-redux';
import ResetPassword from 'components/pages/ResetPassword';
import { resetPassword } from 'ducks/auth';

const mapStateToProps = state => ({
  resetMessage: state.auth.resetMessage
});

const mapDispatchToProps = dispatch => ({
  onSubmit(email) {
    dispatch(resetPassword(email));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
