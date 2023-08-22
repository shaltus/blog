import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signin } from '../../store/blog';
import UserForm from '../visual/UserForm';

const UserLogin = ({ authorized, signin, disabled, error }) => {
  if (authorized) return <Redirect to="/profile" />;

  return <UserForm.Login onFinish={signin} disabled={disabled} error={error} />;
};
UserLogin.defaultProps = {
  authorized: false,
  signin: () => {},
  disabled: false,
  error: null,
};
UserLogin.propTypes = {
  authorized: propTypes.bool,
  signin: propTypes.func,
  disabled: propTypes.bool,
  error: propTypes.string,
};

const mapStateToProps = (state) => {
  return {
    authorized: state.authorized,
    disabled: state.disabled,
    error: state.error,
  };
};

export default connect(mapStateToProps, { signin })(UserLogin);
