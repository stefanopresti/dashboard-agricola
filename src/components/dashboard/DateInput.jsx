import React from 'react';

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
      <label className="block text-xl font-bold text-gray-900 mb-5">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={new Date(value).toLocaleDateString('it-IT')}
          readOnly
          className="w-full px-6 py-5 pr-16 text-lg font-semibold text-gray-900 bg-white border-2 border-gray-300 rounded-2xl focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer transition-all duration-200 hover:border-emerald-400 hover:shadow-lg"
          onClick={onInputClick}
          aria-label={`Seleziona ${label.toLowerCase()}`}
        />
        <button
          onClick={onCalendarToggle}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-3xl hover:scale-125 transition-transform duration-200"
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