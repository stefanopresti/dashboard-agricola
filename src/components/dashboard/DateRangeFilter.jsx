import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDateRange } from '../../redux/agriculturalSlice';
import Calendar from './Calendar';
import DateInput from './DateInput';
import styles from './DateRangeFilter.module.css';

const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const { dateRange, data } = useSelector(state => state.agricultural);
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  const handleDateRangeChange = (field, value) => {
    dispatch(setDateRange({
      ...dateRange,
      [field]: value
    }));
  };

  const handleStartDateClick = () => {
    setStartCalendarOpen(!startCalendarOpen);
    setEndCalendarOpen(false);
  };

  const handleEndDateClick = () => {
    setEndCalendarOpen(!endCalendarOpen);
    setStartCalendarOpen(false);
  };

  const daysSelected = Math.ceil((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="brutal-card brutal-section brutal-padding">
      <h3 className={styles.dateRangeTitle}>
        Filtro Temporale
      </h3>
      
      <div className={styles.dateRangeGrid}>
        <DateInput
          label="Data Inizio"
          value={dateRange.start}
          onInputClick={handleStartDateClick}
          onCalendarToggle={handleStartDateClick}
          isCalendarOpen={startCalendarOpen}
        >
          <Calendar
            selectedDate={new Date(dateRange.start)}
            onDateSelect={(date) => handleDateRangeChange('start', date)}
            onClose={() => setStartCalendarOpen(false)}
            isOpen={startCalendarOpen}
          />
        </DateInput>

        <DateInput
          label="Data Fine"
          value={dateRange.end}
          onInputClick={handleEndDateClick}
          onCalendarToggle={handleEndDateClick}
          isCalendarOpen={endCalendarOpen}
        >
          <Calendar
            selectedDate={new Date(dateRange.end)}
            onDateSelect={(date) => handleDateRangeChange('end', date)}
            onClose={() => setEndCalendarOpen(false)}
            isOpen={endCalendarOpen}
          />
        </DateInput>
      </div>
      
      <div className={styles.dateRangeInfo}>
        Periodo selezionato: {new Date(dateRange.start).toLocaleDateString('it-IT')} - {new Date(dateRange.end).toLocaleDateString('it-IT')} ({daysSelected} giorni)
        {data.length > 0 && (
          <span className={styles.dateRangeDataStatus}>
            ✓ {data.length} punti dati generati automaticamente
          </span>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter; 