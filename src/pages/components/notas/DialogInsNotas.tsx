import { insertNota } from "@/api/apiProductos";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { format } from "date-fns";


interface Props {
    idproducto: any,
}

function DialogInsGastos({ idproducto }: Props) {

    const queryClient = useQueryClient();
    const [openDialog, setOpenDialog] = useState(false);
    const [fechaingreso, setFechaingreso] = useState<Date | any>(new Date())
    const [selectedOption, setSelectedOption] = useState('')



    const updateFechaingreso = (nuevaFecha: any) => {
        setFechaingreso(nuevaFecha);
    };



    const { mutate, isError, error, reset } = useMutation({
        mutationFn: insertNota,
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
        const fecha = format(fechaingreso, 'yyyy-MM-dd');
        const descripcion = String(formData.get("descripcion"))

        if (!descripcion) return

        mutate({ fecha, descripcion,idproducto });

    }

    return (
        <>
            <Dialog open={openDialog} onOpenChange={setOpenDialog} >
                <DialogTrigger asChild>
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-7 md:w-7 m-auto"
                    >
                        <Button>Registrar Nota</Button>
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
                                <Input
                                    id="idnota"
                                    name="idnota"
                                    defaultValue={0}
                                    type="hidden"
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
                        </div>
                        <DialogFooter>
                            <Button type="submit" >Registrar Nota</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default DialogInsGastos