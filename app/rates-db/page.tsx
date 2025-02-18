"use client";

import React, { useState, useRef } from 'react';
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
import Stepper, { Step } from "../../components/ui/stepper"; // Importamos el Stepper

interface CardWithFormProps {
  onCancel: () => void;
  onContinue: () => void;
}

export function CardWithForm({ onCancel, onContinue }: CardWithFormProps) {
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
              <FileUpload supplier={selectedSupplier} onChange={(files) => console.log(files)} resetRef={resetFileUploadRef} />
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
  const [showStepper, setShowStepper] = useState(false); // Nuevo estado para controlar el Stepper
  const [name, setName] = useState(''); // Estado para el nombre
  const stepperRef = useRef<HTMLDivElement>(null); // Ref para el contenedor del Stepper

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

  const handleContinue = () => {
    setShowStepper(true);
    setTimeout(() => {
      stepperRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Hacer scroll después de un pequeño retraso
  };

  return (
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
              <CardWithForm onCancel={() => { setShowCard(false); setShowStepper(false); }} onContinue={handleContinue} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stepper debajo de la carta */}
        <AnimatePresence>
          {showStepper && (
            <motion.div
              key="stepper"
              ref={stepperRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{ marginTop: '100px', textAlign: 'left' }} // Ajustar el espacio entre la tarjeta y el Stepper y alinear el texto a la izquierda
            >
              <Stepper initialStep={1} onStepChange={(step) => console.log(step)} onFinalStepCompleted={() => console.log("All steps completed!")}>
                <Step>
                  <h2>Welcome to the React Bits stepper!</h2>
                  <p>Check out the next step!</p>
                </Step>
                <Step>
                  <h2>Step 2</h2>
                  <img
                    style={{
                      height: "100px",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "center -70px",
                      borderRadius: "15px",
                      marginTop: "1em",
                    }}
                    src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
                    alt="Funny Cat"
                  />
                  <p>Custom step content!</p>
                </Step>
                <Step>
                  <h2>How about an input?</h2>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name?"
                  />
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
  );
};

export default RatesDbPage;