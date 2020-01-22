import { connect } from 'react-redux';
import ReferralTree from 'components/common/ReferralTree';

const mapStateToProps = state => ({
  refs: state.user.refs
});

export default connect(mapStateToProps)(ReferralTree);
