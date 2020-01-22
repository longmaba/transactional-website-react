import { connect } from 'react-redux';
import QuickBuy from 'components/wallet/QuickBuy';
import { buyCFX } from 'ducks/wallet';

const mapStateToProps = state => ({
  ethToUsd: state.price && state.price.ethToUsd,
  cfxPrice: state.price && state.price.cfxPrice,
  buyError: state.wallet.buyError,
  buyingCFX: state.wallet.buyingCFX,
  message: state.wallet.message
});

const mapDispatchToProps = dispatch => ({
  onSubmit(amount, address) {
    dispatch(buyCFX(amount, address));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickBuy);
