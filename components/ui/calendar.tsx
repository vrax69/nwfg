"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import clsx from "clsx";

// ✅ Definimos los tipos correctamente
type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, "selected" | "mode" | "onSelect"> & {
  selected?: Date | undefined;
  onSelect?: SelectSingleEventHandler; // ✅ Define correctamente el tipo de `onSelect`
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-4",
    month: "w-full",
    caption: "relative mx-10 mb-1 flex h-9 items-center justify-center z-20",
    caption_label: "text-sm font-medium",
    nav: "absolute top-0 flex w-full justify-between z-10",
    button_previous: "size-9 text-muted-foreground/80 hover:text-foreground p-0",
    button_next: "size-9 text-muted-foreground/80 hover:text-foreground p-0",
    weekday: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
    day_button: "relative flex size-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-foreground",
    day: "group size-9 px-0 py-px text-sm",
    selected: "border-2 border-gray-300",
    today: "today",
    outside: "text-muted-foreground/50 opacity-50",
    hidden: "invisible",
  };

  const defaultComponents = {
    Chevron: (props: any) => {
      return props.orientation === "left" ? (
        <ChevronLeftIcon size={16} {...props} aria-hidden="true" />
      ) : (
        <ChevronRightIcon size={16} {...props} aria-hidden="true" />
      );
    },
  };

  return (
    <DayPicker
      mode="single" // ✅ Ahora está bien tipado
      showOutsideDays={showOutsideDays}
      className={clsx("w-fit", className)}
      classNames={defaultClassNames}
      components={{ ...defaultComponents, ...userComponents }}
      selected={selected instanceof Date ? selected : undefined} // ✅ Se asegura que solo sea una fecha única
      onSelect={onSelect} // ✅ Ahora tiene el tipo correcto
      {...props}
    />
  );
}

export default Calendar;
