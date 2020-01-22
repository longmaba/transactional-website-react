import { connect } from 'react-redux';
import Balance from 'components/wallet/Balance';

const mapStateToProps = state => ({
  balance: state.wallet.cfxBalance,
  name: 'CoinFX',
  symbol: 'CFX'
});

export default connect(mapStateToProps)(Balance);
