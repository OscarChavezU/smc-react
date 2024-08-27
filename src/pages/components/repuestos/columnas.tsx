import { ColumnDef } from "@tanstack/react-table"

interface repuesto {
    idrepuesto: number;
    nombre: string;
    nroparte: string;
    compatible: string;
    estado: string;
    urlfoto: string;
    fechacreacion: string;
    stock: string;
}

export const columns: ColumnDef<repuesto>[] = [
    {
        accessorKey: "urlfoto",
        header: "Foto",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "nroparte",
        header: "Nro Parte",
    },
    {
        accessorKey: "compatible",
        header: "Compatible",
    },
    {
        accessorKey: "fechacreacion",
        header: "Fecha Creacion",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
]