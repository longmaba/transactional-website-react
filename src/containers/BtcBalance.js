import { connect } from 'react-redux';
import Balance from 'components/wallet/Balance';

const mapStateToProps = state => ({
  balance: state.wallet.btcBalance,
  name: 'Bitcoin',
  symbol: 'BTC'
});

export default connect(mapStateToProps)(Balance);
