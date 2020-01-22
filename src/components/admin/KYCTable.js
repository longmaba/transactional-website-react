import React from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

import Button from 'material-ui/Button';

export default ({ kycPendingUsers, onApprove, onReject }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Date</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Full Name</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Nationality</TableCell>
        <TableCell>Date of Birth</TableCell>
        <TableCell>Type</TableCell>
        <TableCell>Front</TableCell>
        <TableCell>Back</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {kycPendingUsers.map((u, i) => {
        return (
          <TableRow key={i}>
            <TableCell>
              {u.time}
            </TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.fullName}</TableCell>
            <TableCell>{u.address}</TableCell>
            <TableCell>{u.nationality}</TableCell>
            <TableCell>{u.dob}</TableCell>
            <TableCell>{u.documentType}</TableCell>
            <TableCell>
              <Button component="a" href={u.front} target="_blank" raised>
                Front Image
              </Button>
            </TableCell>
            <TableCell>
              <Button component="a" href={u.back} target="_blank" raised>
                Back Image
              </Button>
            </TableCell>
            <TableCell>
              <Button
                color="primary"
                raised
                onClick={() => onApprove && onApprove(u.email)}>
                Approve
              </Button>
              <Button
                color="secondary"
                raised
                onClick={() => onReject && onReject(u.email)}>
                Reject
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
