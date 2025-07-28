import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDateRange } from '../../redux/agriculturalSlice';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from 'date-fns';
import { it } from 'date-fns/locale';

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
    <div className="absolute z-50 mt-2" ref={calendarRef}>
      <div className="brutal-card" style={{ 
        border: '3px solid var(--brutal-black)',
        backgroundColor: 'var(--brutal-white)',
        boxShadow: '8px 8px 0px var(--brutal-black)'
      }}>
        {/* Header del calendario */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '1rem',
          borderBottom: '3px solid var(--brutal-black)',
          backgroundColor: 'var(--brutal-black)',
          color: 'var(--brutal-white)'
        }}>
          <button
            onClick={prevMonth}
            className="brutal-btn"
            style={{ 
              padding: '0.5rem 1rem',
              fontSize: '1.5rem',
              fontWeight: '900'
            }}
            aria-label="Mese precedente"
          >
            ‹
          </button>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '900', 
            textTransform: 'uppercase',
            margin: 0
          }}>
            {format(currentMonth, 'MMMM yyyy', { locale: it })}
          </h3>
          <button
            onClick={nextMonth}
            className="brutal-btn"
            style={{ 
              padding: '0.5rem 1rem',
              fontSize: '1.5rem',
              fontWeight: '900'
            }}
            aria-label="Mese successivo"
          >
            ›
          </button>
        </div>

        {/* Giorni della settimana */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          padding: '1rem',
          borderBottom: '2px solid var(--brutal-black)'
        }}>
          {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
            <div key={day} style={{ 
              textAlign: 'center', 
              fontWeight: '900',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              color: 'var(--brutal-dark-gray)'
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* Giorni del mese */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)',
          padding: '1rem',
          gap: '0.25rem'
        }}>
          {days.map(day => (
            <button
              key={day.toString()}
              onClick={() => {
                onDateSelect(format(day, 'yyyy-MM-dd'));
                onClose();
              }}
              style={{
                padding: '0.75rem',
                border: '2px solid var(--brutal-black)',
                backgroundColor: isSameDay(day, selectedDate) ? 'var(--brutal-black)' : 'var(--brutal-white)',
                color: isSameDay(day, selectedDate) ? 'var(--brutal-white)' : 'var(--brutal-black)',
                fontWeight: '700',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.1s ease',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                if (!isSameDay(day, selectedDate)) {
                  e.target.style.backgroundColor = 'var(--brutal-gray)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSameDay(day, selectedDate)) {
                  e.target.style.backgroundColor = 'var(--brutal-white)';
                }
              }}
              aria-label={`Seleziona ${format(day, 'dd MMMM yyyy', { locale: it })}`}
            >
              {format(day, 'd')}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '1rem',
          borderTop: '2px solid var(--brutal-black)',
          textAlign: 'center'
        }}>
          <button
            onClick={onClose}
            className="brutal-btn"
            style={{ 
              padding: '0.5rem 2rem',
              fontSize: '0.875rem',
              fontWeight: '700',
              textTransform: 'uppercase'
            }}
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

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

  const daysSelected = Math.ceil((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="brutal-card brutal-section brutal-padding">
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '900', 
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
        color: 'var(--brutal-black)'
      }}>
        Filtro Temporale
      </h3>
      <div className="brutal-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'end' }}>
        <div style={{ position: 'relative' }}>
          <label style={{ 
            display: 'block', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            fontSize: '0.875rem'
          }}>
            Data Inizio
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={new Date(dateRange.start).toLocaleDateString('it-IT')}
              readOnly
              className="brutal-input"
              style={{ width: '100%', paddingRight: '3rem' }}
              onClick={() => {
                setStartCalendarOpen(!startCalendarOpen);
                setEndCalendarOpen(false);
              }}
              aria-label="Seleziona data inizio"
            />
            <button
              onClick={() => {
                setStartCalendarOpen(!startCalendarOpen);
                setEndCalendarOpen(false);
              }}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '1.25rem',
                cursor: 'pointer',
                color: 'var(--brutal-black)',
                fontWeight: '900'
              }}
              aria-label="Apri calendario data inizio"
            >
              📅
            </button>
          </div>
          <Calendar
            selectedDate={new Date(dateRange.start)}
            onDateSelect={(date) => handleDateRangeChange('start', date)}
            onClose={() => setStartCalendarOpen(false)}
            isOpen={startCalendarOpen}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <label style={{ 
            display: 'block', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            fontSize: '0.875rem'
          }}>
            Data Fine
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={new Date(dateRange.end).toLocaleDateString('it-IT')}
              readOnly
              className="brutal-input"
              style={{ width: '100%', paddingRight: '3rem' }}
              onClick={() => {
                setEndCalendarOpen(!endCalendarOpen);
                setStartCalendarOpen(false);
              }}
              aria-label="Seleziona data fine"
            />
            <button
              onClick={() => {
                setEndCalendarOpen(!endCalendarOpen);
                setStartCalendarOpen(false);
              }}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '1.25rem',
                cursor: 'pointer',
                color: 'var(--brutal-black)',
                fontWeight: '900'
              }}
              aria-label="Apri calendario data fine"
            >
              📅
            </button>
          </div>
          <Calendar
            selectedDate={new Date(dateRange.end)}
            onDateSelect={(date) => handleDateRangeChange('end', date)}
            onClose={() => setEndCalendarOpen(false)}
            isOpen={endCalendarOpen}
          />
        </div>
      </div>
      
      <div style={{ 
        marginTop: '1rem', 
        fontWeight: '600',
        fontSize: '0.875rem',
        color: 'var(--brutal-dark-gray)'
      }}>
        Periodo selezionato: {new Date(dateRange.start).toLocaleDateString('it-IT')} - {new Date(dateRange.end).toLocaleDateString('it-IT')} ({daysSelected} giorni)
        {data.length > 0 && (
          <span style={{ marginLeft: '1rem', color: 'var(--brutal-green)' }}>
            ✓ {data.length} punti dati generati automaticamente
          </span>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter; 