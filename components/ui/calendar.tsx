"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx"; // Asegura que `clsx` esté instalado con `pnpm add clsx`

// Creamos un tipo personalizado que extiende los props de DayPicker para incluir selected
type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selected?: Date | Date[] | undefined;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  selected,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-4",
    month: "w-full",
    month_caption: "relative mx-10 mb-1 flex h-9 items-center justify-center z-20",
    caption_label: "text-sm font-medium",
    nav: "absolute top-0 flex w-full justify-between z-10",
    button_previous: "size-9 text-muted-foreground/80 hover:text-foreground p-0",
    button_next: "size-9 text-muted-foreground/80 hover:text-foreground p-0",
    weekday: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
    day_button:
      "relative flex size-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-foreground group-[[data-selected]:not(.range-middle)]:[transition-property:color,background-color,border-radius,box-shadow] group-[[data-selected]:not(.range-middle)]:duration-150 group-data-disabled:pointer-events-none focus-visible:z-10 hover:not-in-data-selected:bg-accent group-data-selected:border-2 group-data-selected:border-gray-300 hover:not-in-data-selected:text-foreground group-data-disabled:text-foreground/30 group-data-disabled:line-through group-data-outside:text-foreground/30 group-data-selected:group-data-outside:border-gray-200 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] group-[.range-start:not(.range-end)]:rounded-e-none group-[.range-end:not(.range-start)]:rounded-s-none group-[.range-middle]:rounded-none group-[.range-middle]:group-data-selected:bg-accent group-[.range-middle]:group-data-selected:text-foreground",
    day: "group size-9 px-0 py-px text-sm",
    range_start: "range-start",
    range_end: "range-end",
    range_middle: "range-middle",
    selected: "data-selected",
    today:
      "*:after:pointer-events-none *:after:absolute *:after:bottom-1 *:after:start-1/2 *:after:z-10 *:after:size-[3px] *:after:-translate-x-1/2 *:after:rounded-full *:after:bg-primary [&[data-selected]:not(.range-middle)>*]:after:bg-background [&[data-disabled]>*]:after:bg-foreground/30 *:after:transition-colors",
    // Modificado: Hacemos los días de fuera del mes actual mucho más claros
    outside: "text-muted-foreground/50 opacity-50 group-data-selected:bg-accent/50 group-data-selected:text-muted-foreground",
    // Añadido: Aplicar negrita a los días del mes actual
    cell: "font-medium",
    hidden: "invisible",
    week_number: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
  };

  const mergedClassNames: typeof defaultClassNames = Object.keys(defaultClassNames).reduce(
    (acc, key) => ({
      ...acc,
      [key]: classNames?.[key as keyof typeof classNames]
        ? clsx(
            defaultClassNames[key as keyof typeof defaultClassNames],
            classNames[key as keyof typeof classNames],
          )
        : defaultClassNames[key as keyof typeof defaultClassNames],
    }),
    {} as typeof defaultClassNames,
  );

  const defaultComponents = {
    Chevron: (props: any) => {
      if (props.orientation === "left") {
        return <ChevronLeftIcon size={16} {...props} aria-hidden="true" />;
      }
      return <ChevronRightIcon size={16} {...props} aria-hidden="true" />;
    },
  };

  const mergedComponents = {
    ...defaultComponents,
    ...userComponents,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx("w-fit", className)}
      classNames={mergedClassNames}
      components={mergedComponents}
      selected={Array.isArray(selected) ? selected[0] : selected}
      {...props}
      modifiers={{
        selected: selected ? (Array.isArray(selected) ? selected : [selected]) : [],
        today: new Date(),
        ...(props.modifiers || {})
      }}
      modifiersClassNames={{
        selected: "border-2 border-gray-300", // Borde gris en lugar del fondo negro
        today: "today",
        ...(props.modifiersClassNames || {})
      }}
    />
  );
}

export default Calendar;
