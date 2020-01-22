import { connect } from 'react-redux';
import KYCStatus from 'components/presale/KYCStatus';

const mapStateToProps = state => ({
  email: state.auth.email,
  kycStatus: state.auth.kycStatus
});

export default connect(mapStateToProps)(KYCStatus);
