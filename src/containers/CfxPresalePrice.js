import { connect } from 'react-redux';
import Price from 'components/presale/Price';

const mapStateToProps = state => ({
  price: state.price.cfxPrice,
  symbol: 'CFX'
});

export default connect(mapStateToProps)(Price);
