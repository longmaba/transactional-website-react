import { connect } from 'react-redux';
import Deposit from 'components/wallet/Deposit';

const mapStateToProps = state => ({
  address: state.wallet.address,
  hidden: !state.wallet.address
});

export default connect(mapStateToProps)(Deposit);
