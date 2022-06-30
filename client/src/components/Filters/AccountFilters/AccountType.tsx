// @ts-nocheck
import { useAppDispatch } from 'hooks/useTypedRedux';

import Radio from 'components/Radio';

import c from './index.module.css';
import useTracker from 'hooks/useTracker';
import { INSTITUTION } from 'util/filterData';

const AccountTypes = (props) => {
  const { institutions } = props;
  const dispatch = useAppDispatch();
  const { trackEvent } = useTracker();

  function onRadioClick(id) {
    dispatch({ type: 'accounts/institutions/set', payload: id });
    trackEvent({ category: 'Filter', action: 'Set Account Type', name: id });
  }

  return (
    <div className={c.AccountFilter}>
      <h4>Type of account</h4>
      {Object.keys(INSTITUTION).map((id) => (
        <Radio
          key={id}
          id={id}
          name={INSTITUTION[id]}
          selected={institutions}
          onClick={onRadioClick}
        />
      ))}
    </div>
  );
};

export default AccountTypes;
