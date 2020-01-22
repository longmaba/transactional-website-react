import { connect } from 'react-redux';
import Deposit from 'components/wallet/Deposit';

const mapStateToProps = state => ({
  address: state.wallet.btcAddress,
  hidden: !state.wallet.btcAddress
});

export default connect(mapStateToProps)(Deposit);
