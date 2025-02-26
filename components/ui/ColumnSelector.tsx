import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

interface ColumnSelectorProps {
  options: string[]; // 📌 Array de columnas recibidas del backend
  onSelectionChange: (selected: string[]) => void; // 📌 Callback para actualizar las columnas seleccionadas
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ options, onSelectionChange }) => {
  const handleChange = (value: string[]) => {
    console.log(`📌 Columnas seleccionadas: ${value}`);
    onSelectionChange(value); // 📌 Se actualiza el estado en `RatesDbPage.tsx`
  };

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Seleccione las columnas"
        onChange={handleChange}
        options={options.map(col => ({ label: col, value: col }))} // 📌 Se genera el listado dinámico
      />
    </Space>
  );
};

export default ColumnSelector;
