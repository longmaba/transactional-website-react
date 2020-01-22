import { connect } from 'react-redux';
import Balance from 'components/wallet/Balance';

const mapStateToProps = state => ({
  balance: state.wallet.ethBalance,
  name: 'Ethereum',
  symbol: 'ETH'
});

export default connect(mapStateToProps)(Balance);
