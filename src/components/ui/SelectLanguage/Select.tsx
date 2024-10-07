import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  name: string;
  id: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  name,
  id,
  className = '',
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      >
        <option value="">Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface Language {
  code: string;
  name: string;
}

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const languages: Language[] = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ value, onChange, className }) => {
  return (
    <Select
      options={languages.map(lang => ({ value: lang.code, label: lang.name }))}
      value={value}
      onChange={onChange}
      label="Seleccionar idioma"
      name="language"
      id="language-select"
      className={className}
    />
  );
};

import { useState } from 'react';

const LanguageSettingsPage: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    console.log(`Idioma cambiado a: ${langCode}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Configuración de Idioma</h1>
      <LanguageSelector
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="max-w-xs"
      />
      <p className="mt-4">
        Idioma seleccionado: {selectedLanguage === 'es' ? 'Español' : 'English'}
      </p>
    </div>
  );
};

export default LanguageSettingsPage;