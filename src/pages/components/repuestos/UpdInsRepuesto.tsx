import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { parse, format } from 'date-fns';
import { insRepuesto, updRepuesto } from "@/api/apiRepuestos";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import InputCalendario from "../InputCalendario";
import { Button } from "@/components/ui/button";


interface Props {
    Repuesto?: Repuesto,
    funcion?: string,
    children: React.ReactNode
}


interface Repuesto {
    idrepuesto: number,
    nombre?: string,
    nroparte?: string,
    compatible?: string,
    estado?: string,
    urlfoto?: string,
    fechacreacion?: string,
    stock?: number,
    foto?: File | null,
    quiereFoto?: string,
}

function UpdInsRepuesto({ Repuesto, funcion, children }: Props) {

    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<Repuesto>({
        idrepuesto: Repuesto?.idrepuesto || 0,
        nombre: Repuesto?.nombre || "",
        nroparte: Repuesto?.nroparte || "",
        compatible: Repuesto?.compatible || "",
        estado: Repuesto?.estado || "",
        urlfoto: Repuesto?.estado || "",
        fechacreacion: Repuesto?.fechacreacion || "",
        stock: Repuesto?.stock || 0,
        foto: null,
        quiereFoto: "NO"
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [fechacreacion, setFechacreacion] = useState<Date | null>(() => {
        return Repuesto?.fechacreacion ? parse(Repuesto.fechacreacion, 'yyyy-MM-dd', new Date()) : null;
    });

    const updateFechacreacion = (nuevaFecha: Date | null) => {
        setFechacreacion(nuevaFecha);
        setFormData({ ...formData, fechacreacion: nuevaFecha ? format(nuevaFecha, 'yyyy-MM-dd') : "" });
    };

    useEffect(() => {
        setDisabled(formData.quiereFoto !== "SI");
    }, [formData.quiereFoto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? Number(value) : value
        });
    };

    const handleSelectChange = (name: keyof Repuesto) => (value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const { mutate: mutateIns, isError: isErrorIns, error: errorIns, reset: resetIns } = useMutation({
        mutationFn: insRepuesto,
        onSuccess: () => {
            queryClient.invalidateQueries([funcion]);
            setOpen(false);
        }
    });

    const { mutate: mutateUpd, isError: isErrorUpd, error: errorUpd, reset: resetUpd } = useMutation({
        mutationFn: updRepuesto,
        onSuccess: () => {
            queryClient.invalidateQueries([funcion]);
            setOpen(false);
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const idrepuestofinal = formData.idrepuesto;

        if (idrepuestofinal === 0) {
            mutateIns(formData);
        } else {
            mutateUpd(formData);
        }
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
                            <DialogTitle>Editar/Registrar Repuesto</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Nombre" className="text-right">
                                    Nombre
                                </Label>
                                <Input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="col-span-3"
                                />
                            </div>


                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Nro Parte" className="text-right">
                                Nro Parte
                                </Label>
                                <Input
                                    type="text"
                                    name="nroparte"
                                    value={formData.nroparte}
                                    onChange={handleChange}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Compatible" className="text-right">
                                Compatible
                                </Label>
                                <Input
                                    type="text"
                                    name="compatible"
                                    value={formData.compatible}
                                    onChange={handleChange}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="FechaCreacion" className="text-right">
                                    Fecha Creacion
                                </Label>
                                <InputCalendario esModal={true} updateState={updateFechacreacion} date={fechacreacion} openDialog={openDialog} />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="TieneImagen" className="text-right">
                                    Desea Agregar Imagen?
                                </Label>
                                <Select value={formData.quiereFoto} onValueChange={handleSelectChange('quiereFoto')}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Desea Imagen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="NO">NO</SelectItem>
                                        <SelectItem value="SI">SI</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Imagen" className="text-right">
                                    Imagen
                                </Label>
                                <Input
                                    type="file"
                                    name="fileFoto"
                                    className="col-span-3"
                                    disabled={disabled}
                                    onChange={(e) => setFormData({ ...formData, foto: e.target.files ? e.target.files[0] : null })}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="Estado" className="text-right">
                                    Estado
                                </Label>
                                <Select value={formData.estado} onValueChange={handleSelectChange('estado')}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Seleccione Estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Activo</SelectItem>
                                        <SelectItem value="0">Anulado</SelectItem>
                                    </SelectContent>
                                </Select>
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

export default UpdInsRepuesto