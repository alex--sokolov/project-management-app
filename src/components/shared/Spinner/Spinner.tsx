import React from 'react';
import './Spinner.scss';

export const Spinner = (props: { isLoading: boolean; isBlurBackground?: boolean }) => {
  const { isLoading, isBlurBackground } = props;
  const clazz = isBlurBackground ? 'non-clickable-bg' : '';
  return (
    <div className={clazz}>
      <div className="spinner">
        <div className={`lds-roller ${isLoading ? '' : 'hidden'}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
