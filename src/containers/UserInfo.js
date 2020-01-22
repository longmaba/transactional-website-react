import { connect } from 'react-redux';

import UserInfo from 'components/user/UserInfo';

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserInfo);
