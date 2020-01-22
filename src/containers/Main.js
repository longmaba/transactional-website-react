import { connect } from 'react-redux';
import Layout from 'components/layout';

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  checkingToken: state.auth.checkingToken
});

export default connect(mapStateToProps)(Layout);
