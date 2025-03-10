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
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon, ExternalLinkIcon, SearchIcon } from "lucide-react"

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

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select"
  }
}

type Item = {
  id: string
  keyword: string
  provider: "cs" | "ne" | "nge" | "nv" | "re" | "spe" | "wg"
  volume: number
  cpc: number
  traffic: number
  link: string
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
    accessorKey: "keyword",
    cell: ({ row }) => <div className="font-medium">{row.getValue("keyword")}</div>,
  },
  {
    header: "SPL",
    accessorKey: "provider",
    cell: ({ row }) => {
      const provider = row.getValue("provider") as string
      const providerNames = {
        cs: "Clean Sky",
        ne: "North Eastern",
        nge: "National Gas & Electric",
        nv: "Next Volt",
        re: "Rushmore",
        spe: "Spark Energy",
        wg: "WG&L",
      }

      // Colores específicos para fondo y texto basados en logos de cada proveedor
      const providerStyles = {
        cs: "bg-sky-50 text-blue-600 border-sky-200",
        ne: "bg-emerald-50 text-emerald-700 border-emerald-200",
        nge: "bg-amber-50 text-amber-600 border-amber-200",
        nv: "bg-indigo-50 text-indigo-600 border-indigo-200",
        re: "bg-rose-50 text-rose-600 border-rose-200",
        spe: "bg-blue-50 text-blue-700 border-blue-200",
        wg: "bg-orange-50 text-orange-600 border-orange-200",
      }

      return (
        <div className="flex items-center">
          <div
            className={`px-3 py-1.5 rounded-md text-xs font-normal border ${providerStyles[provider as keyof typeof providerStyles]}`}
          >
            {providerNames[provider as keyof typeof providerNames]}
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
    accessorKey: "volume",
    cell: ({ row }) => {
      const volume = Number.parseInt(row.getValue("volume"))
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(volume)
    },
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "Rate-ID",
    accessorKey: "cpc",
    cell: ({ row }) => <div>${row.getValue("cpc")}</div>,
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "Last_Updated",
    accessorKey: "traffic",
    cell: ({ row }) => {
      const traffic = Number.parseInt(row.getValue("traffic"))
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
      }).format(traffic)
    },
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "ETF",
    accessorKey: "link",
    cell: ({ row }) => (
      <a className="inline-flex items-center gap-1 hover:underline" href="#">
        {row.getValue("link")} <ExternalLinkIcon size={12} aria-hidden="true" />
      </a>
    ),
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
        const response = await fetch("http://nwfg.net:3002/api/rates")
        const data = await response.json()
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
      id: "traffic",
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
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 w-full  ml-5 ">
        {/* Search input */}
        <div className="w-44">
          <Filter column={table.getColumn("keyword")!} />
        </div>
        {/* Provider select */}
        <div className="w-36">
          <Filter column={table.getColumn("provider")!} />
        </div>
        {/* Volume inputs */}
        <div className="w-36">
          <Filter column={table.getColumn("volume")!} />
        </div>
        {/* CPC inputs */}
        <div className="w-36">
          <Filter column={table.getColumn("cpc")!} />
        </div>
        {/* Traffic inputs */}
        <div className="w-40">
          <Filter column={table.getColumn("traffic")!} />
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

function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId()
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnHeader = typeof column.columnDef.header === "string" ? column.columnDef.header : ""
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>()

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

  // Special case for the Last_Updated column (traffic)
  if (column.id === "traffic") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <div className="relative">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button type="button" className="w-full" onClick={() => setOpen(true)}>
                <div className="relative">
                  <Input
                    id={`${id}-date`}
                    className={cn(
                      "peer ps-9 w-full cursor-pointer",
                      date && "pr-8" // Añadir padding derecho cuando hay una fecha
                    )}
                    value={date ? formatDate(date, "MMM dd, yyyy") : ""}
                    placeholder="Select date"
                    readOnly
                  />
                  <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                    <CalendarIcon size={16} />
                  </div>
                  
                  {/* Botón X dentro del input usando el componente Button */}
                  {date && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation(); // Detener la propagación para evitar abrir el calendario
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
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate: Date | undefined) => {
                  setDate(newDate);
                  column.setFilterValue(newDate ? newDate.getTime() : undefined);
                  setOpen(false);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  }

  if (filterVariant === "range") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <div className="flex">
          <Input
            id={`${id}-range-1`}
            className="flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value ? Number(e.target.value) : undefined,
                old?.[1],
              ])
            }
            placeholder="Min"
            type="number"
            aria-label={`${columnHeader} min`}
          />
          <Input
            id={`${id}-range-2`}
            className="-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value ? Number(e.target.value) : undefined,
              ])
            }
            placeholder="Max"
            type="number"
            aria-label={`${columnHeader} max`}
          />
        </div>
      </div>
    )
  }

  if (filterVariant === "select" && column.id === "provider") {
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
            <SelectItem value="cs">Clean Sky</SelectItem>
            <SelectItem value="ne">North Eastern</SelectItem>
            <SelectItem value="nge">National Gas & Electric</SelectItem>
            <SelectItem value="nv">Next Volt</SelectItem>
            <SelectItem value="re">Rushmore</SelectItem>
            <SelectItem value="spe">Spark Energy</SelectItem>
            <SelectItem value="wg">WG&L</SelectItem>
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