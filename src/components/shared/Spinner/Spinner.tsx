import React from 'react';
import './Spinner.scss';

export const Spinner = (props: { isLoading: boolean }) => {
  const { isLoading } = props;
  return (
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
  );
};
