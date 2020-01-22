import { connect } from 'react-redux';
import Price from 'components/presale/Price';

const mapStateToProps = state => ({
  price: state.price.btcRate,
  symbol: 'BTC '
});

export default connect(mapStateToProps)(Price);
