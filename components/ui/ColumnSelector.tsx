import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

interface ColumnSelectorProps {
  options: string[]; // 📌 Array de columnas recibidas del backend
  onSelectionChange: (selected: string[]) => void; // 📌 Callback para actualizar las columnas seleccionadas
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ options, onSelectionChange }) => {
  console.log("📌 Columnas recibidas en ColumnSelector:", options); // Debug

  if (!options || options.length === 0) {
    return <p style={{ color: "red" }}>❌ No hay columnas disponibles. Verifica tu archivo.</p>;
  }

  return (
    <Space style={{ width: '100%' }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Seleccione las columnas"
        onChange={onSelectionChange}
        options={options.map(col => ({ label: col, value: col }))} // Genera el listado dinámico
      />
    </Space>
  );
};

export default ColumnSelector;
