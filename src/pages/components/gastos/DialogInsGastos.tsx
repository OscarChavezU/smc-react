import { insertGasto } from "@/api/apiProductos";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import InputCalendario from "../InputCalendario";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Props {
    idproducto: any,
}

function DialogInsGastos({ idproducto }: Props) {

    const queryClient = useQueryClient();
    const [openDialog, setOpenDialog] = useState(false);
    const [fechaingreso, setFechaingreso] = useState<Date | any>()
    const [selectedOption, setSelectedOption] = useState('')



    const updateFechaingreso = (nuevaFecha: any) => {
        setFechaingreso(nuevaFecha);
    };



    const { mutate, isError, error, reset } = useMutation({
        mutationFn: insertGasto,
        onSuccess: (data, variables, context) => {
            setOpenDialog(false);
            queryClient.invalidateQueries({
                queryKey: ["gastosxproducto"]
            })
        }
    })



    const handleSubmit = (e: any) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const fecharegistro = format(fechaingreso, 'yyyy-MM-dd');
        const nombre = String(formData.get("nombre"))
        const descripcion = String(formData.get("descripcion"))
        const monto = Number(formData.get("monto"))
        const tipogasto = selectedOption
        const observaciones = String(formData.get("observaciones"))

        if (!monto || !fecharegistro || !nombre || !tipogasto || selectedOption == "") return

        mutate({ fecharegistro, nombre, descripcion, monto, tipogasto, observaciones, idproducto });

    }

    return (
        <>
            <Dialog open={openDialog} onOpenChange={setOpenDialog} >
                <DialogTrigger asChild>
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-7 md:w-7 m-auto"
                    >
                        <Button>Registrar Gasto</Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => {
                    e.preventDefault();
                }}>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Editar Gasto</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">

                            <div className="grid grid-cols-4 items-center gap-4">

                                <Label htmlFor="tipogasto" className="text-right">
                                    Tipo Gasto
                                </Label>
                                <Select name="tipogasto" value={selectedOption}
                                    onValueChange={(value) => {
                                        setSelectedOption(value)
                                    }}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Tipo gasto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Mano de Obra">Mano de Obra</SelectItem>
                                        <SelectItem value="Materiales">Materiales</SelectItem>
                                        <SelectItem value="Repuestos">Repuestos</SelectItem>
                                        <SelectItem value="Otros">Otros</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Input
                                    id="idgasto"
                                    name="idgasto"
                                    defaultValue={0}
                                    type="hidden"
                                />
                                <Label htmlFor="fecharegistro" className="text-right">
                                    Fecha Registro
                                </Label>
                                <InputCalendario esModal={true} updateState={updateFechaingreso} date={fechaingreso} openDialog={openDialog}>

                                </InputCalendario>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nombre" className="text-right">
                                    Nombre
                                </Label>
                                <Input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    defaultValue={''}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="descripcion" className="text-right">
                                    Descripcion
                                </Label>
                                <Input
                                    id="descripcion"
                                    name="descripcion"
                                    type="text"
                                    defaultValue={''}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="montoSt" className="text-right">
                                    Monto
                                </Label>
                                <Input
                                    id="monto"
                                    name="monto"
                                    type="number"
                                    defaultValue={0.00}
                                    className="col-span-3"
                                    step={0.01}
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="montoSt" className="text-right">
                                    Observaciones
                                </Label>
                                <Input
                                    id="observaciones"
                                    name="observaciones"
                                    type="text"
                                    defaultValue={""}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" >Guardar Cambios</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default DialogInsGastos