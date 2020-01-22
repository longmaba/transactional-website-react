import React from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

import Moment from 'react-moment';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

export default ({ transactions }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell numeric>Currency</TableCell>
        <TableCell numeric>Amount</TableCell>
        <TableCell>Reason</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {transactions.map(t => {
        return (
          <TableRow key={t._id}>
            <TableCell>
              <Moment format="YYYY/MM/DD HH:mm:ss">{t.date}</Moment>
            </TableCell>
            <TableCell numeric>{t.currency.toUpperCase()}</TableCell>
            <TableCell numeric>
              <Typography color={t.amount > 0 ? 'primary' : 'error'}>
                {t.amount}
              </Typography>
            </TableCell>
            <TableCell>
              {(() => {
                switch (t.data.type) {
                  case 'depositEth':
                    return (
                      <Typography>
                        Deposit ETH
                        {' '}
                        <br />
                        <Button
                          dense={true}
                          color="primary"
                          component="a"
                          target="_blank"
                          href={`https://etherscan.io/tx/${t.data.txid}`}>
                          {`Txid: ${t.data.txid}`}
                        </Button>
                      </Typography>
                    );
                  case 'depositBtc':
                    return (
                      <Typography>
                        Deposit BTC
                        {' '}
                        <br />
                        <Button
                          dense={true}
                          color="primary"
                          component="a"
                          target="_blank"
                          href={`https://blockchain.info/tx/${t.data.txid}`}>
                          {`Txid: ${t.data.txid}`}
                        </Button>
                      </Typography>
                    );

                  case 'buyCFX':
                    return (
                      <Typography>
                        {(() => {
                          if (t.data.from === t.data.to) {
                            return 'Buy CFX';
                          } else if (t.currency === 'eth') {
                            return `Buy CFX for address ${t.data.to}`;
                          }
                          return `Receive CFX from address: ${t.data.from}`;
                        })()}
                        <br />
                        Txid: {t.data.txid}
                      </Typography>
                    );
                  case 'referralBonus':
                    return (
                      <Typography>
                        {`Referral Bonus from ${t.data.from} (Amount: ${t.data.buyAmount} CFX)`}
                        {' '}
                        <br />
                        Txid:
                        {' '}
                        {t.data.txid}
                      </Typography>
                    );
                  default:
                }
              })()}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
