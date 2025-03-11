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
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react"

// Import the Calendar component
import Calendar from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover-rates"

// Añadir la importación al inicio del archivo
import { Button } from "@/components/ui/button"

// Función simple para formatear fechas como alternativa a date-fns
function formatDate(date: Date, formatString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric', 
    year: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
}

// Añade esta función de filtrado personalizada al inicio del archivo
const filterFunctions = {
  // Función para filtrar valores numéricos (Rate)
  numericFilter: (row: any, columnId: string, filterValue: string) => {
    // Si no hay valor de filtro, mostrar todas las filas
    if (!filterValue || filterValue === '') return true;
    
    // Obtener el valor numérico de la fila
    const rowValue = row.getValue(columnId);
    if (rowValue === null || rowValue === undefined) return false;
    
    // Convertir el valor de la fila a string para la búsqueda
    const rowValueStr = String(rowValue).toLowerCase();
    
    // Limpiar el valor del filtro (por si acaso incluye $)
    const cleanFilterValue = filterValue.replace(/[$,]/g, '').toLowerCase();
    
    // Verificar si el valor de la fila contiene el texto de búsqueda
    return rowValueStr.includes(cleanFilterValue);
  },
  
  // Función para filtrar texto (Rate_ID y otros campos de texto)
  textFilter: (row: any, columnId: string, filterValue: string) => {
    // Si no hay valor de filtro, mostrar todas las filas
    if (!filterValue || filterValue === '') return true;
    
    // Obtener el valor de la fila
    const rowValue = row.getValue(columnId);
    if (rowValue === null || rowValue === undefined) return false;
    
    // Convertir el valor de la fila a string para la búsqueda
    const rowValueStr = String(rowValue).toLowerCase();
    
    // Verificar si el valor de la fila contiene el texto de búsqueda
    return rowValueStr.includes(filterValue.toLowerCase());
  },

  dateFilter: (row: any, columnId: string, filterValue: string) => {
    if (!filterValue) return true;

    const rowValue = row.getValue(columnId);
    if (!rowValue) return false;

    // Extraer solo la parte de la fecha (YYYY-MM-DD)
    const rowDate = new Date(rowValue).toISOString().split('T')[0];
    const filterDate = new Date(filterValue).toISOString().split('T')[0];

    return rowDate === filterDate;
  },
};

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "date"
  }
}

// Actualiza la interfaz de Item para que coincida con los campos de la API
type Item = {
  Rate_ID: string
  SPL_Utility_Name: string
  Product_Name: string
  Rate: number
  ETF: number | string
  MSF: number | string
  Term: number | string
  Company_DBA_Name: string
  duracion_rate: string
  Last_Updated: string
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
        // Agrega más mappings según sea necesario
      }

      const providerStyles: Record<string, string> = {
        "CS": "bg-sky-50 text-blue-600 border-sky-200",
        "NE": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "NGE": "bg-amber-50 text-amber-600 border-amber-200",
        "NV": "bg-indigo-50 text-indigo-600 border-indigo-200",
        "RE": "bg-rose-50 text-rose-600 border-rose-200",
        "SPE": "bg-blue-50 text-blue-700 border-blue-200",
        "WG": "bg-orange-50 text-orange-600 border-orange-200",
        // Agrega más estilos según sea necesario
      }

      const providerName = providerNames[spl] || spl
      const style = providerStyles[spl] || "bg-gray-50 text-gray-600 border-gray-200"

      return (
        <div className="flex items-center">
          <div className={`px-3 py-1.5 rounded-md text-xs font-normal border ${style}`}>
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
    header: "Last Updated",
    accessorKey: "Last_Updated",
    cell: ({ row }) => {
      const date = row.getValue("Last_Updated")
      try {
        return date ? new Date(date as string).toLocaleDateString() : "N/A"
      } catch (e) {
        return "Fecha inválida"
      }
    },
    meta: {
      filterVariant: "date",  // Cambiar de "range" a "date" para que utilice el selector de fecha
    },
    filterFn: filterFunctions.dateFilter, // Añade la función de filtro personalizada
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
        const response = await fetch("https://nwfg.net:3002/api/rates")
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }
        
        const data = await response.json()
        console.log("Datos recibidos de la API:", data[0])  // Mostrar el primer elemento para depurar
        
        setItems(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

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
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    filterFns: {
      numericFilter: filterFunctions.numericFilter,
      textFilter: filterFunctions.textFilter,
    }
  })

  return (
    <div className="space-y-6">
      {/* Filtros */}
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
        {/* Filtro de fecha de actualización */}
        <div className="w-40">
          <Filter column={table.getColumn("Last_Updated")!} />
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="relative h-10 border-t select-none"
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                          ? "descending"
                          : "none"
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            "flex h-full cursor-pointer items-center justify-between gap-2 select-none",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          // Enhanced keyboard handling for sorting
                          if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault()
                            header.column.getToggleSortingHandler()?.(e)
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUpIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
                          desc: <ChevronDownIcon className="shrink-0 opacity-60" size={16} aria-hidden="true" />,
                        }[header.column.getIsSorted() as string] ?? <span className="size-4" aria-hidden="true" />}
                      </div>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// Para el filtro de fechas, reemplazar la implementación actual:
function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader = typeof column.columnDef.header === "string" ? column.columnDef.header : "";
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (column.id === "Last_Updated" && columnFilterValue && typeof columnFilterValue === 'string') {
      try {
        setDate(new Date(columnFilterValue));
      } catch (e) {
        console.error("Error al convertir la fecha:", e);
      }
    }
  }, [column.id, columnFilterValue]);

  if (column.id === "Last_Updated") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader || "Fecha"}</Label>
        <div className="relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  id={`${id}-date`}
                  className={cn(
                    "peer ps-9 w-full cursor-pointer",
                    date && "pr-8"
                  )}
                  value={date ? formatDate(date, "MMM dd, yyyy") : ""}
                  placeholder="Seleccionar fecha"
                  readOnly
                  onClick={() => setOpen(true)}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <CalendarIcon size={16} />
                </div>
                
                {date && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDate(undefined);
                      column.setFilterValue(undefined);
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-5 w-5 p-0 rounded-full"
                    aria-label="Clear date"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg" 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </Button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate: Date | undefined) => {
                  setDate(newDate);
                  if (newDate) {
                    const formattedSelectedDate = newDate.toISOString().split('T')[0];
                    column.setFilterValue(formattedSelectedDate);
                  } else {
                    column.setFilterValue(undefined);
                  }
                  setOpen(false);
                }}
                initialFocus
                defaultMonth={date || new Date()}
                className="border rounded-md"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range") return []

    // Get all unique values from the column
    const values = Array.from(column.getFacetedUniqueValues().keys())

    // If the values are arrays, flatten them and get unique items
    const flattenedValues = values.reduce((acc: string[], curr) => {
      if (Array.isArray(curr)) {
        return [...acc, ...curr]
      }
      return [...acc, curr]
    }, [])

    // Get unique values and sort them
    return Array.from(new Set(flattenedValues)).sort()
  }, [column.getFacetedUniqueValues(), filterVariant, column])

  // Special case for the Last_Updated column
  if (column.id === "Last_Updated") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader || "Fecha"}</Label>
        <div className="relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  id={`${id}-date`}
                  className={cn(
                    "peer ps-9 w-full cursor-pointer",
                    date && "pr-8"
                  )}
                  value={date ? formatDate(date, "MMM dd, yyyy") : ""}
                  placeholder="Seleccionar fecha"
                  readOnly
                  onClick={() => setOpen(true)}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <CalendarIcon size={16} />
                </div>
                
                {date && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDate(undefined);
                      column.setFilterValue(undefined);
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-5 w-5 p-0 rounded-full"
                    aria-label="Clear date"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg" 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </Button>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate: Date | undefined) => {
                  setDate(newDate);
                  if (newDate) {
                    // Convertir la fecha seleccionada a formato YYYY-MM-DD
                    const formattedSelectedDate = newDate.toISOString().split('T')[0];
                    
                    column.setFilterValue((rowValue: string) => {
                      if (!rowValue) return false;
                      
                      try {
                        // Extraer solo la parte de fecha (YYYY-MM-DD) de la cadena de la API
                        const rowDateString = new Date(rowValue).toISOString().split('T')[0];
                        
                        // Comparar las fechas en formato YYYY-MM-DD
                        return rowDateString === formattedSelectedDate;
                      } catch (e) {
                        console.error("Error comparando fechas:", e);
                        return false;
                      }
                    });
                  } else {
                    column.setFilterValue(undefined);
                  }
                  setOpen(false);
                }}
                initialFocus
                defaultMonth={date || new Date()}
                className="border rounded-md"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }

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

    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-select`}>{columnHeader || "Proveedor"}</Label>
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
            <SelectItem value="all">Todos</SelectItem>
            {Object.entries({
              "CS": "Clean Sky",
              "NE": "North Eastern",
              "NGE": "National Gas & Electric",
              "NV": "Next Volt",
              "RE": "Rushmore",
              "SPE": "Spark Energy",
              "WG": "WG&L",
            }).map(([code, name]) => (
              <SelectItem 
                key={code} 
                value={code} 
                className={`rounded px-2 my-0.5 ${providerStyles[code]}`}
              >
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  } else if (filterVariant === "select") {
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