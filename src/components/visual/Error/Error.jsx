import { useHistory } from 'react-router-dom';

import css from './Error.module.scss';

const Error = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={css.Error}>
      <p className={css.message}>You can edit only your own articles</p>
      <button className={css.btn} onClick={goBack}>
        Go back
      </button>
    </div>
  );
};

export default Error;
