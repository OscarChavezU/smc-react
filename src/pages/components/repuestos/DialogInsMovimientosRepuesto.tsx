import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { parse, format } from 'date-fns';
import { insMovRepuesto, insRepuesto, updRepuesto } from "@/api/apiRepuestos";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import InputCalendario from "../InputCalendario";
import { Button } from "@/components/ui/button";


interface Props {
    movRepuesto?: movRepuesto,
    funcion?: string,
    children: React.ReactNode,
    idrepuesto: number,

}


interface movRepuesto {
    idmovrep?: number,
    fecha?: string,
    tipo?: string,
    descripcion?: string,
    idrepuesto?: number,
    cantidad?: number,
    estado?: string,
}


function DialogInsMovimientosRepuesto({ idrepuesto, movRepuesto, funcion, children }: Props) {

    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<movRepuesto>({
        idmovrep: movRepuesto?.idmovrep || 0,
        fecha: movRepuesto?.fecha || "",
        tipo: movRepuesto?.tipo || "",
        descripcion: movRepuesto?.descripcion || "",
        idrepuesto: idrepuesto || 0,
        cantidad: movRepuesto?.cantidad || 0,
        estado: "1",
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [fecha, setFecha] = useState<Date | null>(() => {
        return movRepuesto?.fecha ? parse(movRepuesto.fecha, 'yyyy-MM-dd', new Date()) : null;
    });

    const updateFecha = (nuevaFecha: Date | null) => {
        setFecha(nuevaFecha);
        setFormData({ ...formData, fecha: nuevaFecha ? format(nuevaFecha, 'yyyy-MM-dd') : "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? Number(value) : value
        });
    };

    const handleSelectChange = (name: keyof movRepuesto) => (value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const { mutate: mutateIns, isError: isErrorIns, error: errorIns, reset: resetIns } = useMutation({
        mutationFn: insMovRepuesto,
        onSuccess: () => {
            queryClient.invalidateQueries([funcion]);
            setOpen(false);
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutateIns(formData);

    };


    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Registrar Movimiento Repuesto</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Fecha" className="text-right">
                                    Fecha
                                </Label>
                                <InputCalendario esModal={true} updateState={updateFecha} date={fecha} openDialog={openDialog} />
                            </div>


                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Tipo" className="text-right">
                                    Tipo
                                </Label>
                                <Select value={formData.tipo} onValueChange={handleSelectChange('tipo')}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Seleccione Tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="I">Ingreso</SelectItem>
                                        <SelectItem value="S">Salida</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>




                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Descripcion" className="text-right">
                                    Descripcion
                                </Label>
                                <Input
                                    type="text"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Cantidad" className="text-right">
                                    Cantidad
                                </Label>
                                <Input
                                    type="number"
                                    name="cantidad"
                                    value={formData.cantidad}
                                    onChange={handleChange}
                                    className="col-span-3"
                                />
                            </div>





                        </div>
                        <DialogFooter>
                            <Button type="submit">Guardar Cambios</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogInsMovimientosRepuesto