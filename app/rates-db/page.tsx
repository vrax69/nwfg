"use client";

import React, { useState, useRef } from 'react';
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
import Image from "next/image";
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
import '../styles/globals.css'; // Importa el archivo CSS
import { AnimatePresence, motion } from 'framer-motion';

interface CardWithFormProps {
  onCancel: () => void;
}

export function CardWithForm({ onCancel }: CardWithFormProps) {
  const resetFileUploadRef = useRef<(() => void) | null>(null);

  const handleCancel = () => {
    resetFileUploadRef.current?.();
    onCancel();
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
              <Select>
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
              <FileUpload onChange={(files) => console.log(files)} resetRef={resetFileUploadRef} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
        <Button>Continuar</Button>
      </CardFooter>
    </Card>
  )
}

const RatesDbPage = () => {
  const [showCard, setShowCard] = useState(false);

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
      onClick: () => setShowCard(!showCard)
    },
    {
      title: "Aceternity UI",
      icon: <Image src="https://assets.aceternity.com/logo-dark.png" width={20} height={20} alt="Aceternity Logo" />,
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

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Squares />
      <FloatingDock items={links} desktopClassName="absolute bottom-0 left-0 right-0" />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center', pointerEvents: showCard ? 'auto' : 'none' }}>
        <AnimatePresence>
          {showCard && (
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CardWithForm onCancel={() => setShowCard(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RatesDbPage;