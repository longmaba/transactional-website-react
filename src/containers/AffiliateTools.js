import { connect } from 'react-redux';
import AffiliateTools from 'components/affiliate/AffiliateTools';

const mapStateToProps = state => ({
  refCode: state.auth.myReferralCode
});

export default connect(mapStateToProps)(AffiliateTools);
