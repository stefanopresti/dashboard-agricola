import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDateRange } from '../../redux/agriculturalSlice';
import Calendar from './Calendar';
import DateInput from './DateInput';

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
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-6">
      <h3 className="text-4xl font-bold text-gray-900 mb-10">
        📅 Filtro Temporale
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
      
      <div className="mt-10 text-lg text-gray-600 flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
        <span>
          Periodo selezionato: <strong className="text-gray-900">{new Date(dateRange.start).toLocaleDateString('it-IT')} - {new Date(dateRange.end).toLocaleDateString('it-IT')}</strong> ({daysSelected} giorni)
        </span>
        {data.length > 0 && (
          <span className="text-emerald-700 font-bold">
            ✓ {data.length} punti dati generati automaticamente
          </span>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter; 