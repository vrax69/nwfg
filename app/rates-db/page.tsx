"use client";

import React, { useState, useRef, useEffect } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FileUpload } from "../../components/ui/file-upload";
import Stepper, { Step } from "../../components/ui/stepper";
import ColumnSelector from '../../components/ui/ColumnSelector';

interface CardWithFormProps {
  onCancel: () => void;
  onContinue: () => void;
  onColumnsReceived: (columns: string[], samples: { [key: string]: string[] }) => void;
  selectedSupplier: string | null;
  setSelectedSupplier: (supplier: string) => void;
  selectedColumns: string[];
  formKey: number;
}

export function CardWithForm({ onCancel, onContinue, onColumnsReceived, selectedSupplier, setSelectedSupplier, selectedColumns, formKey }: CardWithFormProps) {
  const resetFileUploadRef = useRef<(() => void) | null>(null);

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
        <form key={formKey}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="spl">Supplier</Label>
              <Select onValueChange={handleSupplierChange} value={selectedSupplier || undefined}>
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
              <FileUpload 
                supplier={selectedSupplier || ""} 
                onChange={(files) => console.log(files)} 
                resetRef={resetFileUploadRef} 
                onColumnsReceived={onColumnsReceived}
                selectedColumns={selectedColumns}
              />
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
  const [columnSamples, setColumnSamples] = useState<{ [key: string]: string[] }>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [columnMapping, setColumnMapping] = useState<{ [key: string]: string }>({});
  const stepperRef = useRef<HTMLDivElement>(null);
  const [rowCount, setRowCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formKey, setFormKey] = useState<number>(Date.now());
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const [dbColumns, setDbColumns] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Estados para el AlertDialog
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">("info");
  const [alertCallback, setAlertCallback] = useState<(() => void) | null>(null);

  // Función para reiniciar completamente todos los estados
  const resetAllState = () => {
    // Temporalmente ocultar el contenido para evitar clicks fantasma
    setIsVisible(false);
    
    // Limpiar todos los estados después de un pequeño delay
    setTimeout(() => {
      setShowCard(false);
      setShowStepper(false);
      setColumns([]);
      setSelectedColumns([]);
      setColumnMapping({});
      setColumnSamples({});
      setSelectedSupplier(null);
      setRowCount(0);
      setUploadedFile(null);
      setIsLoading(false);
      
      // Generar nueva clave para forzar el re-render del formulario
      setFormKey(Date.now());
      
      // Volver a hacer visible el contenido
      setIsVisible(true);
      
      // Forzar un reflow del DOM para asegurarse de que todos los componentes se vuelvan a renderizar
      window.dispatchEvent(new Event('resize'));
    }, 100);
  };

  // Función para mostrar alertas con AlertDialog
  const showAlert = (
    title: string, 
    message: string, 
    type: "success" | "error" | "info" = "info",
    callback?: () => void
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertCallback(() => callback || null);
    setAlertOpen(true);
  };

  // Obtener las columnas desde el backend
  useEffect(() => {
    fetch("https://nwfg.net:3001/columns")
      .then(response => response.json())
      .then(data => {
        if (data.columns) {
          setDbColumns(data.columns); // Guardamos las columnas reales
        }
      })
      .catch(error => console.error("Error obteniendo columnas:", error));
  }, []);

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
        // Si ya está visible la tarjeta, resetea el estado
        if (showCard) {
          resetAllState();
        } else {
          setShowCard(true);
        }
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
      href: "/rates-table"
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

  const handleColumnsReceived = (newColumns: string[], samples: { [key: string]: string[] }, count?: number) => {
    if (!newColumns || newColumns.length === 0) {
      showAlert(
        "Error en el archivo",
        "No se recibieron columnas del archivo. Revisa el formato del archivo.",
        "error"
      );
      return;
    }
  
    console.log("📌 Columnas recibidas del archivo:", newColumns);
    setColumns(newColumns); // Guardamos las columnas correctamente
    setColumnSamples(samples);
    
    // Si recibimos el conteo de filas, lo guardamos
    if (count !== undefined) {
      setRowCount(count);
      console.log(`📌 Total de filas en el archivo: ${count}`);
    }
  };

  const handleColumnSelection = (selected: string[]) => {
    console.log("📌 Columnas seleccionadas en el UI:", selected);
    setSelectedColumns(selected);
    
    // Enviar columnas seleccionadas al backend cuando el usuario las selecciona
    if (selected.length > 0 && selectedSupplier) {
      fetch("https://nwfg.net:3001/save-selected-columns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplier: selectedSupplier,
          selectedColumns: selected
        })
      })
      .then(response => response.json())
      .then(data => console.log("📌 Respuesta del backend:", data))
      .catch(error => console.error("❌ Error enviando columnas seleccionadas:", error));
    }
  };

  const handleContinue = () => {
    setShowStepper(true);
    setTimeout(() => {
      stepperRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleFinalize = async () => {
    if (!selectedSupplier) {
      showAlert(
        "Error de validación",
        "No has seleccionado un proveedor.",
        "error"
      );
      return;
    }
  
    if (selectedColumns.length === 0) {
      showAlert(
        "Error de validación",
        "No has seleccionado ninguna columna.",
        "error"
      );
      return;
    }
  
    if (Object.keys(columnMapping).length === 0) {
      showAlert(
        "Error de validación",
        "No has asignado columnas a la base de datos.",
        "error"
      );
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 📌 Primero, obtener todas las filas del backend
      console.log(`📌 Obteniendo todas las filas del proveedor: ${selectedSupplier}`);
      
      const rowsResponse = await fetch(`https://nwfg.net:3001/get-rows/${selectedSupplier}`);
      
      if (!rowsResponse.ok) {
        throw new Error(`Error al obtener las filas: ${rowsResponse.status} ${rowsResponse.statusText}`);
      }
      
      const rowsData = await rowsResponse.json();
      
      if (!rowsData.success) {
        throw new Error(rowsData.error || "Error al obtener las filas completas");
      }
      
      const allRows = rowsData.rows;
      console.log(`📌 Recibidas ${allRows.length} filas completas del archivo`);
      
      // 📌 Aplicar el mapeo a todas las filas recibidas
      const mappedRows = allRows.map((row: { [key: string]: any }) => {
        let mappedRow: { [key: string]: any } = { SPL: selectedSupplier }; // Asegurar que SPL siempre tenga valor
        
        // Aplicar el mapeo definido por el usuario
        selectedColumns.forEach(selectedCol => {
          if (columnMapping[selectedCol]) {
            mappedRow[columnMapping[selectedCol]] = row[selectedCol];
          }
        });
        
        return mappedRow;
      });
      
      console.log(`📌 Enviando ${mappedRows.length} filas mapeadas al backend`);
      
      // 📌 Enviar los datos mapeados al backend
      const response = await fetch("https://nwfg.net:3001/map-columns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          supplier: selectedSupplier,
          columnMapping: columnMapping,
          rows: mappedRows,
          selectedColumns: selectedColumns,
          headers: columns
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error de HTTP al procesar datos: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        showAlert(
          "Operación exitosa",
          `Datos cargados correctamente: ${mappedRows.length} filas procesadas.`,
          "success",
          () => {
            // Primero resetear todo el estado
            resetAllState();
            // Luego redireccionamos
            window.location.href = "/rates-db";
          }
        );
      } else {
        showAlert(
          "Error al procesar datos",
          result.message || 'Error desconocido',
          "error"
        );
      }
    } catch (error) {
      console.error("❌ Error en la carga de datos:", error);
      showAlert(
        "Error en la carga de datos",
        error instanceof Error ? error.message : String(error),
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Rates_DB</title>
      </Head>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
        <Squares />
        
        {/* FloatingDock con z-index muy alto y solo visible cuando no hay tarjetas o stepper */}
        {!showCard && !showStepper && (
          <FloatingDock 
            items={links} 
            desktopClassName="absolute bottom-0 left-0 right-0 z-[9999]" 
          />
        )}

        {/* Contenedor para tarjetas y stepper con control de visibilidad */}
        {isVisible && (
          <div 
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              textAlign: 'center',
              zIndex: showCard || showStepper ? 50 : -1, // Z-index negativo cuando no hay nada visible
              pointerEvents: showCard || showStepper ? 'auto' : 'none' // No interceptar eventos cuando no hay nada visible
            }}
          >
            {/* Card Component con AnimatePresence */}
            <AnimatePresence mode="wait" onExitComplete={() => {
              if (!showCard) {
                // Forzar reflow y limpiar cualquier residuo invisible
                window.dispatchEvent(new Event('resize'));
                document.body.style.cursor = 'default'; // Reset cursor just in case
              }
            }}>
              {showCard ? (
                <motion.div
                  key={`card-${formKey}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                >
                  <CardWithForm 
                    onCancel={resetAllState}
                    onContinue={handleContinue} 
                    onColumnsReceived={handleColumnsReceived} 
                    setSelectedSupplier={setSelectedSupplier}
                    selectedSupplier={selectedSupplier}
                    selectedColumns={selectedColumns}
                    formKey={formKey}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Stepper Component con AnimatePresence */}
            <AnimatePresence mode="wait" onExitComplete={() => {
              if (!showStepper) {
                // Forzar reflow y limpiar cualquier residuo invisible
                window.dispatchEvent(new Event('resize'));
              }
            }}>
              {showStepper ? (
                <motion.div
                  key={`stepper-${formKey}`} // Usar formKey también aquí para forzar re-render
                  ref={stepperRef}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  style={{ marginTop: '100px', textAlign: 'left' }}
                >
                  <Stepper 
                    initialStep={1} 
                    onStepChange={(step) => console.log("Paso actual:", step)} 
                    onFinalStepCompleted={() => console.log("All steps completed!")}
                  >
                    <Step>
                      <div className="flex flex-col gap-4">
                        <h2>Bienvenido al stepper para cambiar las tarifas!</h2>
                        <p>Recuerda seguir cada paso al pie de la letra!</p>
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline" 
                            onClick={resetAllState}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </Step>
                    <Step>
                      <div className="flex flex-col gap-4">
                        <h2>Selecciona tus columnas</h2>
                        {columns.length > 0 ? (
                          <>
                            <ColumnSelector options={columns} onSelectionChange={handleColumnSelection} />
                            <p className="text-sm text-gray-400 mt-2">
                              Recuerda no escoger nunca State, Service_Type y Unit_of_Measure.
                            </p>
                            {rowCount > 0 && (
                              <p className="text-sm text-blue-500 mt-1">
                                📊 El archivo contiene {rowCount} filas que se procesarán.
                              </p>
                            )}
                          </>
                        ) : (
                          <p style={{ color: "red" }}>❌ No hay columnas disponibles. Verifica tu archivo.</p>
                        )}
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline" 
                            onClick={resetAllState}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </Step>
                    <Step>
                        <div className="flex flex-col gap-4">
                          <h2 className="text-lg font-semibold">Asigna las columnas del Excel a la base de datos</h2>
                          <p className="text-sm text-gray-400 mb-4">
                            Asegúrate de asignar cada columna correctamente con la base de datos. Se ignorarán las columnas no asignadas.
                          </p>
                          {selectedColumns.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4">
                              {selectedColumns.map((col) => (
                                <div key={col} className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded-md shadow">
                                  <span className="text-gray-900 dark:text-white font-medium">{col}</span>
                                  {columnSamples[col] && (
                                    <span className="text-gray-400 text-sm">
                                      Ejemplo: {columnSamples[col].slice(0, 3).join(", ")}
                                      {columnSamples[col].length > 3 ? "..." : ""}
                                    </span>
                                  )}  
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
                          <div className="flex justify-between mt-4">
                            <Button 
                              variant="outline" 
                              onClick={resetAllState}
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                    </Step>
                    <Step>
                      <div className="flex flex-col gap-4">
                        <h2>Final Step</h2>
                        <p>¡Carga completada! Presiona el botón para finalizar y guardar los datos.</p>
                        {rowCount > 0 && (
                          <p className="text-sm text-blue-500 my-2">
                            📊 Se procesarán {rowCount} filas del archivo.
                          </p>
                        )}
                        <div className="flex justify-between mt-4">
                          <Button 
                            variant="outline" 
                            onClick={resetAllState}
                          >
                            Cancelar
                          </Button>
                          <Button 
                            onClick={handleFinalize} 
                            disabled={isLoading}
                            className={isLoading ? "opacity-70 cursor-not-allowed" : ""}
                          >
                            {isLoading ? "Procesando..." : "Finalizar carga"}
                          </Button>
                        </div>
                      </div>
                    </Step>
                  </Stepper>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* AlertDialog para mostrar mensajes */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className={`border-l-4 ${
          alertType === "success" 
            ? "border-green-500 bg-green-50" 
            : alertType === "error" 
            ? "border-red-500 bg-red-50" 
            : "border-blue-500 bg-blue-50"
        }`}>
          <AlertDialogHeader>
            <AlertDialogTitle className={`${
              alertType === "success" 
                ? "text-green-700" 
                : alertType === "error" 
                ? "text-red-700" 
                : "text-blue-700"
            }`}>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => alertCallback && alertCallback()}
              className={`${
                alertType === "success" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : alertType === "error" 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Aceptar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RatesDbPage