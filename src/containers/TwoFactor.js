import { connect } from 'react-redux';
import TwoFactor from 'components/security/TwoFactor';
import { enableTfa, disableTfa } from 'ducks/auth';

const mapStateToProps = state => ({
  tfaEnabled: state.auth.tfaEnabled,
  tfa: state.auth.tempTfa
});

const mapDispatchToProps = dispatch => ({
  onEnable(base32, token) {
    dispatch(enableTfa(base32, token));
  },
  onDisable() {
    dispatch(disableTfa());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactor);
