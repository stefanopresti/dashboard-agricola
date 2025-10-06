/**
 * Componente Calendar
 * 
 * Calendario interattivo per la selezione delle date.
 * Visualizza un mese alla volta con navigazione tra i mesi.
 */

import React, { useState, useEffect, useRef } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';

/**
 * Calendar Component
 * 
 * @param {Date} selectedDate - Data attualmente selezionata
 * @param {Function} onDateSelect - Callback chiamato quando si seleziona una data
 * @param {Function} onClose - Callback per chiudere il calendario
 * @param {boolean} isOpen - Stato di apertura del calendario
 * 
 * Caratteristiche:
 * - Navigazione tra i mesi (avanti/indietro)
 * - Evidenziazione della data selezionata
 * - Chiusura automatica al click fuori dal calendario
 * - Localizzazione italiana
 * - Design responsive e accessibile
 */
const Calendar = ({ selectedDate, onDateSelect, onClose, isOpen }) => {
  // Stato locale per il mese correntemente visualizzato
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  
  // Ref per rilevare click esterni al calendario
  const calendarRef = useRef(null);

  // Calcola inizio e fine del mese corrente
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  
  // Genera array con tutti i giorni del mese
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  /**
   * Naviga al mese successivo
   */
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  
  /**
   * Naviga al mese precedente
   */
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  /**
   * Effect per gestire la chiusura quando si clicca fuori dal calendario
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  /**
   * Effect per aggiornare il mese visualizzato quando cambia la data selezionata
   */
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  // Non renderizzare nulla se il calendario è chiuso
  if (!isOpen) return null;

  return (
    <div className="absolute z-50 mt-2 w-full md:w-80" ref={calendarRef}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
        {/* Header del calendario con navigazione mesi */}
        <div className="flex items-center justify-between px-4 py-3 bg-emerald-600 text-white">
          {/* Pulsante mese precedente */}
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-emerald-700 rounded-lg transition-colors duration-200 text-xl font-bold"
            aria-label="Mese precedente"
          >
            ‹
          </button>
          
          {/* Titolo mese e anno corrente */}
          <h3 className="text-lg font-bold capitalize">
            {format(currentMonth, 'MMMM yyyy', { locale: it })}
          </h3>
          
          {/* Pulsante mese successivo */}
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-emerald-700 rounded-lg transition-colors duration-200 text-xl font-bold"
            aria-label="Mese successivo"
          >
            ›
          </button>
        </div>

        {/* Intestazione giorni della settimana */}
        <div className="grid grid-cols-7 gap-px p-2 bg-gray-50">
          {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Griglia dei giorni del mese */}
        <div className="grid grid-cols-7 gap-1 p-2">
          {days.map(day => (
            <button
              key={day.toString()}
              onClick={() => {
                onDateSelect(format(day, 'yyyy-MM-dd'));
                onClose();
              }}
              className={`p-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isSameDay(day, selectedDate)
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              aria-label={`Seleziona ${format(day, 'dd MMMM yyyy', { locale: it })}`}
            >
              {format(day, 'd')}
            </button>
          ))}
        </div>

        {/* Footer con pulsante chiudi */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;