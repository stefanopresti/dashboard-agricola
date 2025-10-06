/**
 * Componente DateRangeFilter
 * 
 * Permette all'utente di selezionare un range di date per filtrare i dati
 * visualizzati nella dashboard. Include due calendari interattivi per
 * data inizio e data fine.
 */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDateRange } from '../../redux/agriculturalSlice';
import Calendar from './Calendar';
import DateInput from './DateInput';

/**
 * DateRangeFilter Component
 * 
 * Gestisce la selezione del periodo temporale per i dati:
 * - Mostra gli input per data inizio e fine
 * - Apre calendari interattivi per la selezione
 * - Aggiorna lo store Redux quando cambia il range
 * - Visualizza informazioni sul periodo selezionato
 * 
 * Utilizza lo stato locale per gestire l'apertura/chiusura dei calendari
 */
const DateRangeFilter = () => {
  const dispatch = useDispatch();
  const { dateRange, data } = useSelector(state => state.agricultural);
  
  // Stati locali per controllare la visibilità dei calendari
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  /**
   * Gestisce il cambiamento di una delle due date
   * @param {string} field - 'start' o 'end'
   * @param {string} value - Nuova data in formato YYYY-MM-DD
   */
  const handleDateRangeChange = (field, value) => {
    dispatch(setDateRange({
      ...dateRange,
      [field]: value
    }));
  };

  /**
   * Apre il calendario per la data di inizio e chiude quello di fine
   */
  const handleStartDateClick = () => {
    setStartCalendarOpen(!startCalendarOpen);
    setEndCalendarOpen(false);
  };

  /**
   * Apre il calendario per la data di fine e chiude quello di inizio
   */
  const handleEndDateClick = () => {
    setEndCalendarOpen(!endCalendarOpen);
    setStartCalendarOpen(false);
  };

  // Calcola il numero di giorni nel periodo selezionato
  const daysSelected = Math.ceil((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-6">
      <h3 className="text-4xl font-bold text-gray-900 mb-10">
        📅 Filtro Temporale
      </h3>
      
      {/* Grid con i due input per le date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Input Data Inizio */}
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

        {/* Input Data Fine */}
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
      
      {/* Informazioni sul periodo selezionato */}
      <div className="mt-10 text-lg text-gray-600 flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-200">
        <span>
          Periodo selezionato: <strong className="text-gray-900">{new Date(dateRange.start).toLocaleDateString('it-IT')} - {new Date(dateRange.end).toLocaleDateString('it-IT')}</strong> ({daysSelected} giorni)
        </span>
        {/* Mostra numero di punti dati generati */}
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