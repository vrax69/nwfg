"use client";
import React, { useState } from 'react';
import Squares from '../../components/ui/Squares';
import { FloatingDock } from '../../components/ui/floating-dock';
import { IconBrandGithub, IconBrandX, IconExchange, IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "../../components/ui/file-upload";
import { motion, AnimatePresence } from 'framer-motion';


interface CardWithFormProps {
  onCancel: () => void;
}

function CardWithForm({ onCancel }: CardWithFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-[650px]">
        <CardHeader>
          <CardTitle>Actualizar tarifas</CardTitle>
          <CardDescription>Sube tu archivo y selecciona el proveedor para empezar.</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload onChange={(files) => console.log(files)} />
          {/* Contenido adicional... */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button>Continuar</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}


const RatesDbPage = () => {
  const [showCard, setShowCard] = useState(false);  // Ahora useState debería ser reconocido correctamente
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/dashboard"
    },
    {
      title: "Rows",
      icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "",
    },
    {
      title: "Subir acrchivos",
      icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "",
      onClick: () => setShowCard(true),
    },
    {
      title: "Aceternity UI",
      icon: <Image src="https://assets.aceternity.com/logo-dark.png" width={20} height={20} alt="Aceternity Logo" />,
      href: ""
    },
    {
      title: "Changelog",
      icon: <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: ""
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: ""
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: ""
    },
  ];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Squares />
      <FloatingDock items={links} desktopClassName="absolute bottom-0 left-0 right-0" />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center' }}>
        <AnimatePresence>
          {showCard && <CardWithForm onCancel={() => setShowCard(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RatesDbPage;

