"use client";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/rates-table-interno";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { useId, useMemo, useState, useEffect } from "react";

import { Checkbox } from "@/components/ui/checkbox-rates-table";
import { Input } from "@/components/ui/input-rates-table";
import { Label } from "@/components/ui/label-rates-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-rates-table";
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
} from "@tanstack/react-table";
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

// Importaciones adicionales
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover-rates";
import { Switch } from "@/components/ui/switch"; // Ajusta la ruta según tu estructura de archivos

// Funciones de filtrado personalizadas
const filterFunctions = {
  numericFilter: (row: any, columnId: string, filterValue: string) => {
    if (!filterValue || filterValue === "") return true;
    const rowValue = row.getValue(columnId);
    if (rowValue === null || rowValue === undefined) return false;
    return String(rowValue).toLowerCase().includes(filterValue.toLowerCase());
  },
  textFilter: (row: any, columnId: string, filterValue: string) => {
    if (!filterValue || filterValue === "") return true;
    const rowValue = row.getValue(columnId);
    if (rowValue === null || rowValue === undefined) return false;
    return String(rowValue).toLowerCase().includes(filterValue.toLowerCase());
  },
};

// Declaración de tipos para columnas
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select" | "date";
  }
}

// Tipo de datos para las filas
type Item = {
  Rate_ID: string;
  SPL_Utility_Name: string;
  Rate: number;
  ETF: number | string;
  MSF: number | string;
  SPL: string;
  [key: string]: any; // Permite acceso dinámico a propiedades
};

export default function Component() {
  const [items, setItems] = useState<Item[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "Rate",
      desc: false,
    },
  ]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isSwitchOn, setIsSwitchOn] = useState(false); // Estado para alternar entre edición y solo lectura
  const [showApplyButton, setShowApplyButton] = useState(false);
  const [showChangesDialog, setShowChangesDialog] = useState(false);
  const [changedRows, setChangedRows] = useState<{ original: Item; updated: Item }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://nwfg.net:3002/api/rates");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (row: any, columnId: string, newValue: any) => {
    const updatedRow = { ...row.original, [columnId]: newValue };
    setChangedRows((prev) => {
      const existingChange = prev.find((change) => change.original.Rate_ID === row.original.Rate_ID);
      if (existingChange) {
        return prev.map((change) =>
          change.original.Rate_ID === row.original.Rate_ID
            ? { ...change, updated: updatedRow }
            : change
        );
      }
      return [...prev, { original: row.original, updated: updatedRow }];
    });
    setShowApplyButton(true);
  };

  const applyChanges = () => {
    console.log("Cambios aplicados:", changedRows);
    // Aquí puedes enviar los cambios al servidor o actualizar el estado local
    setChangedRows([]);
    setShowChangesDialog(false);
  };

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
      cell: ({ row }) =>
        isSwitchOn ? (
          <input
            type="number"
            defaultValue={row.getValue("Rate")}
            className="border rounded px-2 py-1 text-sm"
            onChange={(e) => {
              const newValue = parseFloat(e.target.value);
              if (!isNaN(newValue) && row.original.Rate !== newValue) {
                handleInputChange(row, "Rate", newValue);
              }
            }}
          />
        ) : (
          `$${parseFloat(row.getValue("Rate")).toFixed(4)}`
        ),
      meta: {
        filterVariant: "range",
      },
      filterFn: filterFunctions.numericFilter,
    },
    {
      header: "Rate-ID",
      accessorKey: "Rate_ID",
      cell: ({ row }) =>
        isSwitchOn ? (
          <input
            type="text"
            defaultValue={row.getValue("Rate_ID")}
            className="border rounded px-2 py-1 text-sm"
            onChange={(e) => {
              const newValue = e.target.value;
              if (row.original.Rate_ID !== newValue) {
                handleInputChange(row, "Rate_ID", newValue);
              }
            }}
          />
        ) : (
          <div>{row.getValue("Rate_ID")}</div>
        ),
      meta: {
        filterVariant: "text",
      },
      filterFn: filterFunctions.textFilter,
    },
    {
      header: "ETF",
      accessorKey: "ETF",
      cell: ({ row }) =>
        isSwitchOn ? (
          <input
            type="text"
            defaultValue={row.getValue("ETF")}
            className="border rounded px-2 py-1 text-sm"
            onChange={(e) => {
              const newValue = e.target.value;
              if (row.original.ETF !== newValue) {
                handleInputChange(row, "ETF", newValue);
              }
            }}
          />
        ) : (
          row.getValue("ETF") ? `$${row.getValue("ETF")}` : "N/A"
        ),
    },
  ];

  const table = useReactTable({
    data: items,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    filterFns: {
      numericFilter: filterFunctions.numericFilter,
      textFilter: filterFunctions.textFilter,
    },
  });

  return (
    <div className="relative space-y-6">
      <div className="flex flex-wrap gap-3 w-full ml-5">
        <div className="w-44">
          <Filter column={table.getColumn("SPL_Utility_Name")!} />
        </div>
        <div className="w-36">
          <Filter column={table.getColumn("SPL")!} />
        </div>
        <div className="w-36">
          <Filter column={table.getColumn("Rate")!} />
        </div>
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

        <div className="flex items-center space-x-2 mt-4">
          <Switch
            checked={isSwitchOn}
            onCheckedChange={(checked) => setIsSwitchOn(checked)}
            className="mt-1"
          />
          <span className="text-sm text-gray-700">
            {isSwitchOn ? "Modo editor🖋️" : "Solo lectura📖"}
          </span>
          {showApplyButton && (
            <Button
              onClick={() => setShowChangesDialog(true)}
              className="bg-blue-500 text-white hover:bg-blue-600 ml-4"
            >
              Aplicar Cambios
            </Button>
          )}
        </div>
      </div>

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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                    <TableCell
                      key={cell.id}
                      className="text-sm text-gray-600"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={showChangesDialog} onOpenChange={setShowChangesDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar Cambios</AlertDialogTitle>
      <AlertDialogDescription>
        A continuación se muestran los cambios realizados. ¿Deseas aplicarlos?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <div className="space-y-6">
      {/* Títulos en negrita */}
      <div className="flex justify-between items-center font-bold text-gray-700">
        <span className="w-1/2 text-left">Valor actual</span>
        <span className="w-8 text-center">→</span>
        <span className="w-1/2 text-right">Nuevo valor</span>
      </div>
      {/* Mostrar cambios */}
      {changedRows.map(({ original, updated }) => (
        <div key={original.Rate_ID} className="flex justify-between items-center">
          {/* Mostrar SPL y Utilidad juntos en el lado de "Valor actual" */}
          <div className="w-1/2 text-left">
            <p className="text-gray-500 text-sm">
              {original.SPL} - {original.SPL_Utility_Name}
            </p>
          </div>
          <div className="w-1/2 text-right">
            {/* Mostrar los valores actualizados */}
            {Object.entries(updated).map(([key, value]) => {
              if (original[key] !== value) {
                return (
                  <div key={key} className="mb-2">
                    <p className="text-gray-500 text-sm">
                      {key}: <span className="text-green-500">{value}</span>
                    </p>
                    <p className="text-gray-400 text-xs">
                      (Actual: {original[key]})
                    </p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
    <AlertDialogFooter className="flex justify-between">
      <AlertDialogCancel onClick={() => setShowChangesDialog(false)}>
        Cancelar
      </AlertDialogCancel>
      <AlertDialogAction
        onClick={() => {
          applyChanges();
          setShowChangesDialog(false);
        }}
      >
        Confirmar
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
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