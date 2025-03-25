"use client"

import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/rates-table-interno"
import { useId, useMemo, useState, useEffect } from "react"

import { Checkbox } from "@/components/ui/checkbox-rates-table"
import { Input } from "@/components/ui/input-rates-table"
import { Label } from "@/components/ui/label-rates-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select-rates-table"
import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type RowData,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

// Añadir la importación al inicio del archivo
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

// Añade estos imports si no están ya
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover-rates"

// Añadir la importación al inicio del archivo
import { Switch } from "@/components/ui/switch"; // Ajusta la ruta según tu estructura de archivos

// Añade esta función de filtrado personalizada al inicio del archivo
const filterFunctions = {
  // Filtro de fecha mejorado
  dateFilter: (row: any, columnId: string, filterValue: Date | undefined) => {
    if (!filterValue) return true; // Si no hay filtro, mostrar todas las filas

    const rowValue = row.getValue(columnId);
    console.log("Valor en la fila antes de conversión:", rowValue); // 🔍 Verifica qué valor tiene realmente

    if (!rowValue) return false; // Si no hay valor en la celda, no mostrar la fila

    let rowDate: Date;
    if (typeof rowValue === "string") {
        rowDate = new Date(rowValue + "T00:00:00Z"); // Asegura formato ISO sin errores de zona horaria
    } else if (rowValue instanceof Date) {
        rowDate = rowValue;
    } else {
        console.warn("Formato de fecha inválido en la fila:", rowValue);
        return false;
    }

    if (isNaN(rowDate.getTime())) {
        console.warn("Fecha inválida después de conversión:", rowDate);
        return false;
    }

    // Normalizar ambas fechas a formato YYYY-MM-DD para comparación sin hora
    const rowFormatted = rowDate.toISOString().split("T")[0];
    const filterFormatted = filterValue.toISOString().split("T")[0];

    console.log(`Comparando ${rowFormatted} con ${filterFormatted}`); // 🔍 Verifica si las fechas coinciden

    return rowFormatted === filterFormatted;
},
 
  // Resto de funciones de filtro...
  numericFilter: (row: any, columnId: string, filterValue: string) => {
    if (!filterValue || filterValue === '') return true;
    const rowValue = row.getValue(columnId);
    if (rowValue === null || rowValue === undefined) return false;
    return String(rowValue).toLowerCase().includes(filterValue.toLowerCase());
  },
  textFilter: (row: any, columnId: string, filterValue: string) => {
    if (!filterValue || filterValue === '') return true;
    const rowValue = row.getValue(columnId);
    if (rowValue === null || rowValue === undefined) return false;
    return String(rowValue).toLowerCase().includes(filterValue.toLowerCase());
  },
};


declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "date"
  }
}

// Actualiza la interfaz para incluir solo los campos que quieres mostrar
type Item = {
  Rate_ID: string
  SPL_Utility_Name: string
  Rate: number
  ETF: number | string
  MSF: number | string
  SPL: string
}

const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    header: "Utilidad",
    accessorKey: "SPL_Utility_Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("SPL_Utility_Name")}</div>,
    meta: {
      filterVariant: "text",
    },
  },
  {
    header: "SPL",
    accessorKey: "SPL",
    cell: ({ row }) => {
      const spl = row.getValue("SPL") as string
      // Mapeo de SPL a nombres y estilos específicos
      const providerNames: Record<string, string> = {
        "CS": "Clean Sky",
        "NE": "North Eastern",
        "NGE": "National Gas & Electric",
        "NV": "Next Volt",
        "RE": "Rushmore",
        "SPE": "Spark Energy",
        "WG": "WG&L",
      }

      const providerStyles: Record<string, string> = {
        "CS": "bg-sky-50 text-blue-600 border-sky-200",
        "NE": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "NGE": "bg-amber-50 text-amber-600 border-amber-200",
        "NV": "bg-indigo-50 text-indigo-600 border-indigo-200",
        "RE": "bg-rose-50 text-rose-600 border-rose-200",
        "SPE": "bg-blue-50 text-blue-700 border-blue-200",
        "WG": "bg-orange-50 text-orange-600 border-orange-200",
      }

      const providerName = providerNames[spl] || spl
      const style = providerStyles[spl] || "bg-gray-100 text-gray-800 border-gray-300"

      return (
        <div className="flex items-center">
          <div className={`px-3 py-1.5 rounded-md text-xs font-medium border ${style}`}>
            {providerName}
          </div>
        </div>
      )
    },
    enableSorting: false,
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Última Actualización",
    accessorKey: "Last_Updated",
    cell: ({ row }) => {
      const rawDate: unknown = row.getValue("Last_Updated");
    
      if (!rawDate || typeof rawDate !== "string") return "N/A"; // ✅ Validación segura
    
      const parsedDate = new Date(rawDate);
      if (isNaN(parsedDate.getTime())) return "N/A"; // Evitar fechas inválidas
    
      // 🔹 Ajuste de zona horaria para que no muestre el día anterior
      const adjustedDate = new Date(parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60000);
    
      return adjustedDate.toLocaleDateString("es-ES"); // 📌 Ahora mostrará la fecha correcta
    },    
    meta: {
      filterVariant: "date",
    },
  }
  ,  
  {
    header: "Rate",
    accessorKey: "Rate",
    cell: ({ row }) => {
      const rate = parseFloat(row.getValue("Rate"))
      return isNaN(rate) ? "N/A" : `$${rate.toFixed(4)}`
    },
    meta: {
      filterVariant: "range",
    },
    filterFn: filterFunctions.numericFilter, // Añade la función de filtro personalizada
  },
  {
    header: "Rate-ID",
    accessorKey: "Rate_ID",
    cell: ({ row }) => <div>{row.getValue("Rate_ID")}</div>,
    meta: {
      filterVariant: "text",
    },
    filterFn: filterFunctions.textFilter, // Añade la función de filtro personalizada
  },
  {
    header: "ETF",
    accessorKey: "ETF",
    cell: ({ row }) => {
      const etf = row.getValue("ETF")
      return etf ? `$${etf}` : "N/A"
    },
    enableSorting: false,
  },
]

export default function Component() {
  
  // ✅ Movido dentro del componente
  const [items, setItems] = useState<Item[]>([])

  // ✅ useEffect ahora está correctamente dentro del componente
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://nwfg.net:3002/api/rates");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Datos recibidos de la API:", data);
  
        // Procesamiento de fechas con validación
        const processedData = data.map((item: { Last_Updated?: string }) => {
          if (!item.Last_Updated) return { ...item, Last_Updated: null };
        
          return { ...item, Last_Updated: item.Last_Updated }; // Mantener la fecha como string YYYY-MM-DD
        });        
        setItems(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "Rate",  // Cambiado de "traffic" a "Rate"
      desc: false,
    },
  ])

  const table = useReactTable({
    data: items,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    filterFns: {
      numericFilter: filterFunctions.numericFilter,
      textFilter: filterFunctions.textFilter,
      dateFilter: filterFunctions.dateFilter, // Añadir la función de filtro de fecha
    }
  });
  

  // Añadir este estado para manejar la fecha
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Añadir este estado para manejar el toggle
  const [isSwitchOn, setIsSwitchOn] = useState(false); // Estado para el toggle

  // Añadir este useEffect para aplicar el filtro de fechas
  useEffect(() => {
    const column = table.getColumn("Last_Updated");
    if (column) {
      if (date) {
        const formattedDate = date.toISOString().split("T")[0]; // Convertir a formato YYYY-MM-DD
        console.log("Fecha seleccionada (Date Picker):", date);
        console.log("Fecha formateada para el filtro:", formattedDate);
        column.setFilterValue(formattedDate);
      } else {
        console.log("Eliminando filtro de fecha");
        column.setFilterValue(undefined);
      }
    }
  }, [date, table]);
  
  return (
    <div className="relative space-y-6">
      {/* Contenedor de filtros */}
      <div className="flex flex-wrap gap-3 w-full ml-5">
        {/* Filtro de utilidad */}
        <div className="w-44">
          <Filter column={table.getColumn("SPL_Utility_Name")!} />
        </div>
        {/* Filtro de proveedor (SPL) */}
        <div className="w-36">
          <Filter column={table.getColumn("SPL")!} />
        </div>
        {/* Filtro de tarifa */}
        <div className="w-36">
          <Filter column={table.getColumn("Rate")!} />
        </div>
        {/* Filtro de Rate-ID */}
        <div className="w-36">
          <Filter column={table.getColumn("Rate_ID")!} />
        </div>
        <div className="w-44">
          <Label htmlFor="date-filter">Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
                id="date-filter"
              >
                {date ? format(date, "dd MMM, yyyy", { locale: es }) : "Seleccione una fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            checked={isSwitchOn}
            onCheckedChange={(checked) => setIsSwitchOn(checked)}
            className="mt-1" // Añadido para centrar verticalmente
          />
          <span className="text-sm text-gray-700">
            {isSwitchOn ? "Modo editor" : "Solo lectura"}
          </span>
        </div>
      </div>

      {/* Contenedor de la tabla */}
      <div className="overflow-y-auto max-h-[500px] border border-gray-200 rounded-md shadow-sm">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10 shadow">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-10 select-none text-left font-medium text-gray-700"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-sm text-gray-600">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Para el filtro de fechas, reemplazar la implementación actual:
function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader = typeof column.columnDef.header === "string" ? column.columnDef.header : "";

  // Filtros de Rate y Rate_ID como campos de texto
  if (column.id === "Rate" || column.id === "Rate_ID") {
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
        <div className="relative">
          <Input
            id={`${id}-input`}
            className="peer ps-9"
            value={(columnFilterValue ?? "") as string}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Buscar ${columnHeader.toLowerCase()}`}
            type="text"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
      </div>
    );
  }

  // Filtro para SPL con colores coincidentes
  if (filterVariant === "select" && column.id === "SPL") {
    // Define los mismos estilos que en la tabla para mantener consistencia
    const providerStyles: Record<string, string> = {
      "CS": "bg-sky-50 text-blue-600 border-sky-200",
      "NE": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "NGE": "bg-amber-50 text-amber-600 border-amber-200",
      "NV": "bg-indigo-50 text-indigo-600 border-indigo-200",
      "RE": "bg-rose-50 text-rose-600 border-rose-200",
      "SPE": "bg-blue-50 text-blue-700 border-blue-200",
      "WG": "bg-orange-50 text-orange-600 border-orange-200",
    }

    const providerNames: Record<string, string> = {
      "CS": "Clean Sky",
      "NE": "North Eastern",
      "NGE": "National Gas & Electric",
      "NV": "Next Volt",
      "RE": "Rushmore",
      "SPE": "Spark Energy",
      "WG": "WG&L",
    }

    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-select`}>{columnHeader || "Proveedor"}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value)
          }}
        >
          <SelectTrigger id={`${id}-select`} className="min-h-9">
            <SelectValue placeholder="Seleccionar proveedor">
              {(() => {
                const selectedValue = columnFilterValue as string;
                
                if (!selectedValue) return "Todos";
                
                const name = providerNames[selectedValue] || selectedValue;
                const style = providerStyles[selectedValue] || "";
                
                return (
                  <div className={`px-2 py-0.5 rounded-md text-xs font-medium border ${style}`}>
                    {name}
                  </div>
                );
              })()}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {Object.entries(providerNames).map(([code, name]) => (
              <SelectItem 
                key={code} 
                value={code}
              >
                <div className={`px-2 py-0.5 rounded-md text-xs font-medium border ${providerStyles[code]}`}>
                  {name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  } else if (filterVariant === "select") {
    // AGREGAR ESTA LÍNEA:
    const sortedUniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort();
    
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value)
          }}
        >
          <SelectTrigger id={`${id}-select`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem key={String(value)} value={String(value)}>
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  // Filtro por defecto para el resto de campos
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer ps-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Buscar ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  )
}