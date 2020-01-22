import { connect } from 'react-redux';
import TransactionTable from 'components/transaction/TransactionTable';

const mapStateToProps = state => ({
  transactions: state.wallet.transactions
});

export default connect(mapStateToProps)(TransactionTable);
