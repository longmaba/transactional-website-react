import { connect } from 'react-redux';
import KYCTable from 'components/admin/KYCTable';
import { approveKYC, rejectKYC } from 'ducks/admin';

const mapStateToProps = state => ({
  kycPendingUsers: state.admin.kycPendingUsers
});

const mapDispatchToProps = dispatch => ({
  onApprove(email) {
    dispatch(approveKYC(email));
  },
  onReject(email) {
    dispatch(rejectKYC(email));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(KYCTable);
