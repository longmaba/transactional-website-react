import { connect } from 'react-redux';
import ReferralUrl from 'components/common/ReferralUrl';

const mapStateToProps = state => ({
  referralCode: state.auth.myReferralCode
});

export default connect(mapStateToProps)(ReferralUrl);
