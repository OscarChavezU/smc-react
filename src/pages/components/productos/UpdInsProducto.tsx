import { insertProducto, updateGasto, updProducto } from "@/api/apiProductos";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import InputCalendario from "../InputCalendario";
import { parse, format } from 'date-fns';

interface Producto {
    idproducto: number,
    nombre?: string,
    proveedor?: string,
    fechaingreso?: string,
    origen?: string,
    anio?: string,
    codigo?: string,
    modelo?: string,
    marca?: string,
    pais?: string,
    estado?: string,
    costo?: number,
    precioventa?: number,
    foto?: File | null,
    quiereFoto?: string,
}

interface Marca {
    idmarca?: number,
    marca: string
}

interface Props {
    Producto: Producto,
    Marcas: Marca[] | undefined,
    funcion?: string,
    children: React.ReactNode
}

function UpdInsProducto({ Producto, Marcas, funcion, children }: Props) {
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<Producto>({
        idproducto: Producto.idproducto,
        nombre: Producto.nombre || "",
        proveedor: Producto.proveedor || "",
        fechaingreso: Producto.fechaingreso || "",
        origen: Producto.origen || "",
        anio: Producto.anio || "",
        codigo: Producto.codigo || "",
        modelo: Producto.modelo || "",
        marca: Producto.marca || "",
        pais: Producto.pais || "",
        estado: Producto.estado || "",
        costo: Producto.costo || 0,
        precioventa: Producto.precioventa || 0,
        foto: null,
        quiereFoto: "NO"
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [fechaingreso, setFechaingreso] = useState<Date | null>(() => {
        return Producto.fechaingreso ? parse(Producto.fechaingreso, 'yyyy-MM-dd', new Date()) : null;
    });

    const updateFechaingreso = (nuevaFecha: Date | null) => {
        setFechaingreso(nuevaFecha);
        setFormData({ ...formData, fechaingreso: nuevaFecha ? format(nuevaFecha, 'yyyy-MM-dd') : "" });
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

    const handleSelectChange = (name: keyof Producto) => (value: string) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const { mutate: mutateIns, isError: isErrorIns, error: errorIns, reset: resetIns } = useMutation({
        mutationFn: insertProducto,
        onSuccess: () => {
            queryClient.invalidateQueries([funcion]);
            setOpen(false);
        }
    });

    const { mutate: mutateUpd, isError: isErrorUpd, error: errorUpd, reset: resetUpd } = useMutation({
        mutationFn: updProducto,
        onSuccess: () => {
            queryClient.invalidateQueries([funcion]);
            setOpen(false);
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const idproductofinal = formData.idproducto;

        if (idproductofinal === 0) {
            mutateIns(formData);
        } else {
            mutateUpd(formData);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Editar/Registrar Producto</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Pais" className="text-right">
                                País
                            </Label>
                            <Select value={formData.pais} onValueChange={handleSelectChange('pais')}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Seleccione País" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="Peru">Peru</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Proveedor" className="text-right">
                                Proveedor
                            </Label>
                            <Input
                                type="text"
                                name="proveedor"
                                value={formData.proveedor}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Marca" className="text-right">
                                Marca
                            </Label>
                            <Select value={formData.marca} onValueChange={handleSelectChange('marca')}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Seleccione Marca" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Marcas?.map((marca) => (
                                        <SelectItem key={marca.idmarca} value={marca.marca}>
                                            {marca.marca}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Modelo" className="text-right">
                                Modelo
                            </Label>
                            <Input
                                type="text"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Codigo" className="text-right">
                                Código
                            </Label>
                            <Input
                                type="text"
                                name="codigo"
                                value={formData.codigo}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

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
                            <Label htmlFor="FechaIngreso" className="text-right">
                                Fecha Ingreso
                            </Label>
                            <InputCalendario esModal={true} updateState={updateFechaingreso} date={fechaingreso} openDialog={openDialog} />
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
                            <Label htmlFor="Origen" className="text-right">
                                Origen
                            </Label>
                            <Input
                                type="text"
                                name="origen"
                                value={formData.origen}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Año" className="text-right">
                                Año
                            </Label>
                            <Input
                                type="text"
                                name="anio"
                                value={formData.anio}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Costo" className="text-right">
                                Costo
                            </Label>
                            <Input
                                type="number"
                                name="costo"
                                value={formData.costo}
                                onChange={handleChange}
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Precio Venta" className="text-right">
                                Precio Venta
                            </Label>
                            <Input
                                type="number"
                                name="precioventa"
                                value={formData.precioventa}
                                onChange={handleChange}
                                className="col-span-3"
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
                                    <SelectItem value="1">Mantenimiento</SelectItem>
                                    <SelectItem value="2">Exposición</SelectItem>
                                    <SelectItem value="3">Vendido</SelectItem>
                                    <SelectItem value="4">Exportación</SelectItem>
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
    );
}

export default UpdInsProducto;
