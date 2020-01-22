import React from 'react';
import Fragment from 'components/common/RouterFragment';

import Dialog, { DialogContent, withMobileDialog } from 'material-ui/Dialog';

import Login from 'containers/forms/Login';
import Signup from 'containers/forms/Signup';
import NotFound from 'components/pages/404';
import SignupSuccess from 'components/pages/SignupSuccess';
import AccountActivated from 'components/pages/AccountActivated';
import TokenExpired from 'components/pages/TokenExpired';
import ResetPasswordSuccess from 'components/pages/ResetPasswordSuccess';
import ResetPassword from 'containers/forms/ResetPassword';

const Unauthenticated = ({ fullScreen }) => (
  <Dialog
    fullScreen={fullScreen}
    open={true}
    aria-labelledby="responsive-dialog-title">
    <DialogContent>
      <Fragment forRoute="/login">
        <Login fullScreen={fullScreen} />
      </Fragment>
      <Fragment forRoute="/signup*">
        <Signup fullScreen={fullScreen} />
      </Fragment>
      <Fragment forRoute="/404"><NotFound /></Fragment>
      <Fragment forRoute="/resetPassword/request"><ResetPassword /></Fragment>
      <Fragment forRoute="/registrationSuccess"><SignupSuccess /></Fragment>
      <Fragment forRoute="/activationSuccess"><AccountActivated /></Fragment>
      <Fragment forRoute="/tokenExpired"><TokenExpired /></Fragment>
      <Fragment forRoute="/resendActivationEmailSuccess">
        <SignupSuccess />
      </Fragment>
      <Fragment forRoute="/resetPassword/success">
        <ResetPasswordSuccess />
      </Fragment>
    </DialogContent>
  </Dialog>
);

export default withMobileDialog()(Unauthenticated);
