import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "./alert-dialog";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  onColumnsReceived, // Nuevo callback para recibir columnas
  resetRef,
  supplier,
}: {
  onChange?: (files: File[]) => void;
  onColumnsReceived?: (columns: string[], samples: { [key: string]: string }) => void; // Callback para recibir las columnas del backend
  resetRef?: React.RefObject<(() => void) | null>;
  supplier: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Estado para la carga
  const [alertMessage, setAlertMessage] = useState("Debes seleccionar un proveedor antes de subir un archivo.");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Restablecer el valor del input de archivo
    }

    if (!supplier) {
      setShowAlert(true);
      setAlertMessage("Debes seleccionar un proveedor antes de subir un archivo.");
      return;
    }

    const validFileTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];
    const invalidFile = newFiles.find(file => !validFileTypes.includes(file.type));

    if (invalidFile) {
      const fileExtension = invalidFile.name.split('.').pop();
      setShowAlert(true);
      setAlertMessage(`El formato <span style="color: red;">.${fileExtension}</span> no es admitido.`);
      return;
    }

    setFiles(newFiles);
    onChange && onChange(newFiles);
    uploadFiles(newFiles);
  };

  // Asegúrate de que el estado showAlert se restablezca cada vez que se intente subir un archivo
  useEffect(() => {
    if (resetRef) {
      resetRef.current = () => {
        setFiles([]);
        setIsUploading(false); // Resetear estado de carga
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setShowAlert(false); // Resetear estado de alerta
        setAlertMessage("Debes seleccionar un proveedor antes de subir un archivo."); // Resetear mensaje de alerta
      };
    }
  }, [resetRef]);

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true); // Iniciar carga
  
    const formData = new FormData();
    formData.append("supplier", supplier);
    files.forEach((file) => {
      formData.append("file", file);
    });
  
    try {
      const response = await fetch("https://nwfg.net:3001/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      
  
      if (result.columns && result.columns.length > 0 && onColumnsReceived) {
        onColumnsReceived(result.columns, result.samples || {});
      } else {
        console.error("❌ No se recibieron columnas del backend.");
      }
    } catch (error) {
      console.error("❌ Error en la subida del archivo:", error);
    } finally {
      setIsUploading(false);
    }
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (resetRef) {
      resetRef.current = () => {
        setFiles([]);
        setIsUploading(false); // Resetear estado de carga
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
    }
  }, [resetRef]);

  return (
    <div className="w-full" {...getRootProps()}>
      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription dangerouslySetInnerHTML={{ __html: alertMessage }} />
            <AlertDialogAction onClick={() => setShowAlert(false)}>
              Aceptar
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            {isUploading ? "Uploading..." : "Upload file"}
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}