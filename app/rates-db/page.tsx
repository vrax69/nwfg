"use client";

import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import Squares from '../../components/ui/Squares';
import { FloatingDock } from '../../components/ui/floating-dock';
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "../../components/ui/file-upload";
import Stepper, { Step } from "../../components/ui/stepper";
import ColumnSelector from '../../components/ui/ColumnSelector';

interface CardWithFormProps {
  onCancel: () => void;
  onContinue: () => void;
  onColumnsReceived: (columns: string[], samples: { [key: string]: string }) => void;
}

export function CardWithForm({ onCancel, onContinue, onColumnsReceived }: CardWithFormProps) {
  const resetFileUploadRef = useRef<(() => void) | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const handleCancel = () => {
    resetFileUploadRef.current?.();
    onCancel();
  };

  const handleSupplierChange = (value: string) => {
    setSelectedSupplier(value);
  };

  return (
    <Card className="mx-auto" style={{ width: '650px' }}>
      <CardHeader>
        <CardTitle>Actualizar tarifas</CardTitle>
        <CardDescription>Sube tu archivo y selecciona el proveedor para empezar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="spl">Supplier</Label>
              <Select onValueChange={handleSupplierChange}>
                <SelectTrigger id="spl">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
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
            <div className="flex flex-col space-y-1.5">
              <FileUpload supplier={selectedSupplier} onChange={(files) => console.log(files)} resetRef={resetFileUploadRef} onColumnsReceived={onColumnsReceived} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
        <Button onClick={onContinue}>Continuar</Button>
      </CardFooter>
    </Card>
  )
}

const RatesDbPage = () => {
  const [showCard, setShowCard] = useState(false);
  const [showStepper, setShowStepper] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);
  const [columnSamples, setColumnSamples] = useState<{ [key: string]: string }>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [columnMapping, setColumnMapping] = useState<{ [key: string]: string }>({});
  const stepperRef = useRef<HTMLDivElement>(null);

  const dbColumns = ["Column1", "Column2", "Column3"];

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/dashboard"
    },
    {
      title: "Rows",
      icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    },
    {
      title: "Subir tarifas",
      icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      onClick: () => {
        setShowCard(!showCard);
      }
    },
    {
      title: "Rates",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-table-export">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
          <path d="M3 10h18" />
          <path d="M10 3v18" />
          <path d="M16 19h6" />
          <path d="M19 16l3 3l-3 3" />
        </svg>
      ),
      href: "/ui"
    },
    {
      title: "Changelog",
      icon: <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/changelog"
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/twitter"
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/github"
    },
  ];

  const handleColumnsReceived = (newColumns: string[], samples: { [key: string]: string }) => {
    if (newColumns.length === 0) {
      alert("❌ Error: No se recibieron columnas del archivo.");
      return;
    }
    setColumns(newColumns);
    setColumnSamples(samples);
  };

  const handleColumnSelection = (selected: string[]) => {
    setSelectedColumns(selected);
  };

  const handleContinue = () => {
    setShowStepper(true);
    setTimeout(() => {
      stepperRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <Head>
        <title>Rates_DB</title>
      </Head>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <Squares />
        <FloatingDock items={links} desktopClassName="absolute bottom-0 left-0 right-0" />

        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <AnimatePresence>
            {showCard && (
              <motion.div
                key="card"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CardWithForm onCancel={() => { setShowCard(false); setShowStepper(false); }} onContinue={handleContinue} onColumnsReceived={handleColumnsReceived} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showStepper && (
              <motion.div
                key="stepper"
                ref={stepperRef}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{ marginTop: '100px', textAlign: 'left' }}
              >
                <Stepper initialStep={1} onStepChange={(step) => console.log(step)} onFinalStepCompleted={() => console.log("All steps completed!")}>
                  <Step>
                    <h2>Bienvenido al stepper para cambiar las tarifas!</h2>
                    <p>recuerda seguir cada paso al pie de la letra!</p>
                  </Step>
                  <Step>
                    <h2>Selecciona tus columnas</h2>
                    {columns.length > 0 ? (
                      <ColumnSelector options={columns} onSelectionChange={handleColumnSelection} />
                    ) : (
                      <p style={{ color: "red" }}>❌ No hay columnas disponibles. Verifica tu archivo.</p>
                    )}
                  </Step>
                  <Step>
                      <h2 className="text-lg font-semibold">Asigna las columnas del Excel a la base de datos</h2>
                      <p className="text-sm text-gray-400 mb-4">
                        Asegúrate de asignar cada columna correctamente. Se ignorarán las columnas no asignadas.
                      </p>
                      {selectedColumns.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {selectedColumns.map((col) => (
                            <div key={col} className="flex flex-col bg-transparent-800 p-4 rounded-md shadow">
                              <span className="text-white font-medium">{col}</span>
                              <span className="text-gray-400 text-sm">{columnSamples[col] || "No disponible"}</span>
                              <Select
                                onValueChange={(value) =>
                                  setColumnMapping((prev) => ({
                                    ...prev,
                                    [col]: value,
                                  }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Elegir columna de la BD" />
                                </SelectTrigger>
                                <SelectContent>
                                  {dbColumns.map((dbCol: string) => (
                                    <SelectItem key={dbCol} value={dbCol}>
                                      {dbCol}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: "red" }}>❌ No hay columnas seleccionadas en el paso 2.</p>
                      )}
                </Step>
                  <Step>
                    <h2>Final Step</h2>
                    <p>You made it!</p>
                  </Step>
                </Stepper>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default RatesDbPage;