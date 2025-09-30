import React, { useState, useEffect, useRef } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import styles from './DateRangeFilter.module.css';

const Calendar = ({ selectedDate, onDateSelect, onClose, isOpen }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  const calendarRef = useRef(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Gestisce la chiusura quando si clicca fuori
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

  // Aggiorna il mese corrente quando cambia la data selezionata
  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(selectedDate);
    }
  }, [selectedDate]);

  if (!isOpen) return null;

  return (
    <div className={styles.calendarContainer} ref={calendarRef}>
      <div className={styles.calendarCard}>
        {/* Header del calendario */}
        <div className={styles.calendarHeader}>
          <button
            onClick={prevMonth}
            className={styles.calendarNavBtn}
            aria-label="Mese precedente"
          >
            ‹
          </button>
          <h3 className={styles.calendarTitle}>
            {format(currentMonth, 'MMMM yyyy', { locale: it })}
          </h3>
          <button
            onClick={nextMonth}
            className={styles.calendarNavBtn}
            aria-label="Mese successivo"
          >
            ›
          </button>
        </div>

        {/* Giorni della settimana */}
        <div className={styles.calendarWeekdays}>
          {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
            <div key={day} className={styles.calendarWeekday}>
              {day}
            </div>
          ))}
        </div>

        {/* Giorni del mese */}
        <div className={styles.calendarDays}>
          {days.map(day => (
            <button
              key={day.toString()}
              onClick={() => {
                onDateSelect(format(day, 'yyyy-MM-dd'));
                onClose();
              }}
              className={`${styles.calendarDay} ${isSameDay(day, selectedDate) ? styles.calendarDaySelected : ''}`}
              aria-label={`Seleziona ${format(day, 'dd MMMM yyyy', { locale: it })}`}
            >
              {format(day, 'd')}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.calendarFooter}>
          <button
            onClick={onClose}
            className={styles.calendarCloseBtn}
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;