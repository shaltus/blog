import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../../store/blog';
import UserForm from '../visual/UserForm';

const UserRegister = ({ authorized, register, disabled, error }) => {
  if (authorized) return <Redirect to="/profile" />;

  return <UserForm.Signup onFinish={register} disabled={disabled} error={error} />;
};
UserRegister.defaultProps = {
  authorized: false,
  register: () => {},
  disabled: false,
  error: null,
};
UserRegister.propTypes = {
  authorized: propTypes.bool,
  register: propTypes.func,
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

export default connect(mapStateToProps, { register })(UserRegister);
