import React from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';


import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import ReferralUrl from 'containers/ReferralUrl';
// import UpIcon from 'material-ui-icons/ArrowDropUp';
// import DownIcon from 'material-ui-icons/ArrowDropDown';

export default ({ refs }) => (
  <React.Fragment>
    <ReferralUrl />
    <Divider />
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Level</TableCell>
            <TableCell numeric>Number</TableCell>
            <TableCell numeric>Presale Bonus</TableCell>
            <TableCell numeric>Lending Bonus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5].map(level => (
            <TableRow key={level}>
              <TableCell>
                {level}
              </TableCell>
              <TableCell numeric>
                {refs[level] ? refs[level].length : 0}
              </TableCell>
              <TableCell numeric>
                {level === 1 ? 7 : 0}%
              </TableCell>
              <TableCell numeric>
                {[0, 5, 3, 1, 1, 0.5][level]}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </React.Fragment>
);
