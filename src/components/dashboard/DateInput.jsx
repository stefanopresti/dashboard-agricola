/**
 * Componente DateInput
 * 
 * Input personalizzato per la selezione delle date.
 * Visualizza una data formattata e apre un calendario al click.
 */

import React from 'react';

/**
 * DateInput Component
 * 
 * @param {string} label - Etichetta dell'input (es. "Data Inizio")
 * @param {string} value - Valore della data in formato YYYY-MM-DD
 * @param {Function} onInputClick - Callback eseguito al click sull'input
 * @param {Function} onCalendarToggle - Callback per aprire/chiudere il calendario
 * @param {boolean} isCalendarOpen - Stato di apertura del calendario
 * @param {ReactNode} children - Componente Calendar da renderizzare
 * 
 * Caratteristiche:
 * - Input readonly con data formattata in italiano
 * - Icona calendario cliccabile
 * - Effetti hover e focus
 * - Container relativo per posizionare il calendario
 */
const DateInput = ({ 
  label, 
  value, 
  onInputClick, 
  onCalendarToggle, 
  isCalendarOpen, 
  children 
}) => {
  return (
    <div className="relative">
      {/* Label dell'input */}
      <label className="block text-xl font-bold text-gray-900 mb-5">
        {label}
      </label>
      
      {/* Container dell'input con icona */}
      <div className="relative">
        {/* Input readonly - apre il calendario al click */}
        <input
          type="text"
          value={new Date(value).toLocaleDateString('it-IT')}
          readOnly
          className="w-full px-6 py-5 pr-16 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer transition-all duration-200 hover:border-emerald-400 hover:shadow-lg"
          onClick={onInputClick}
          aria-label={`Seleziona ${label.toLowerCase()}`}
        />
        
        {/* Icona calendario */}
        <button
          onClick={onCalendarToggle}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-3xl hover:scale-125 transition-transform duration-200"
          aria-label={`Apri calendario ${label.toLowerCase()}`}
        >
          📅
        </button>
      </div>
      
      {/* Componente Calendar (passato come children) */}
      {children}
    </div>
  );
};

export default DateInput;