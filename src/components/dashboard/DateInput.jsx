import React, { useState } from 'react';
import styles from './DateRangeFilter.module.css';

const DateInput = ({ 
  label, 
  value, 
  onInputClick, 
  onCalendarToggle, 
  isCalendarOpen, 
  children 
}) => {
  return (
    <div className={styles.dateInputContainer}>
      <label className={styles.dateInputLabel}>
        {label}
      </label>
      <div className={styles.dateInputWrapper}>
        <input
          type="text"
          value={new Date(value).toLocaleDateString('it-IT')}
          readOnly
          className={`brutal-input ${styles.dateInput}`}
          onClick={onInputClick}
          aria-label={`Seleziona ${label.toLowerCase()}`}
        />
        <button
          onClick={onCalendarToggle}
          className={styles.dateInputCalendarBtn}
          aria-label={`Apri calendario ${label.toLowerCase()}`}
        >
          📅
        </button>
      </div>
      {children}
    </div>
  );
};

export default DateInput;