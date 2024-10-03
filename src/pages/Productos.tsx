import { Link, Navigate, useNavigate } from "react-router-dom";

import {
    Copy,
    MoreVertical,
    Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"


import { productosRequest } from "@/api/apiProductos";
import { useQuery, useQueryClient } from 'react-query';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UpdInsProducto from "./components/productos/UpdInsProducto";
import { useAuthStore } from "@/store/auth";
import { formatNumber } from "@/funciones/funciones";


function Productos() {

    const navigate = useNavigate();
    const areaacceso = useAuthStore.getState().profile.areaacceso;

    interface Product {
        idproducto: number;
        pais: string;
        estadoTexto: string;
        nombre: string;
        marca: string;
        codigo: string;
        modelo: string;
        fechaingreso: string;
        foto: string;
        costoSt: number;
        manoobra: number;
        materiales: number;
        repuestos: number;
        otros: number;
        gastoFinal: number;
        precioventa: number;
    }

    // Estados para los filtros
    const [filtroPais, setFiltroPais] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroCodigo, setFiltroCodigo] = useState('');
    const [filtroMarca, setFiltroMarca] = useState('');
    const [filtroTexto, setFiltroTexto] = useState('');

    const { isLoading, isError, data: productosData, error } = useQuery({
        queryKey: ["productos"],
        queryFn: productosRequest,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return 'Cargando productos...'
    if (isError) return `Error: ${error}`


    // Función de filtrado
    const filtrarProductos = (productos: Product[]) => {
        let filteredProducts = productos;

        if (filtroPais) {
            filteredProducts = filteredProducts.filter(item => item.pais === filtroPais);
        }
        if (filtroEstado) {
            filteredProducts = filteredProducts.filter(item => item.estadoTexto === filtroEstado);
        }
        if (filtroCodigo) {
            filteredProducts = filteredProducts.filter(item => item.codigo.toLowerCase().includes(filtroCodigo.toLowerCase()));
        }
        if (filtroMarca) {
            filteredProducts = filteredProducts.filter(item => item.marca.toLowerCase().includes(filtroMarca.toLowerCase()));
        }
        if (filtroTexto) {
            filteredProducts = filteredProducts.filter(item => item.codigo.toLowerCase().includes(filtroTexto.toLowerCase())
                || item.marca.toLowerCase().includes(filtroTexto.toLowerCase())
                || item.modelo.toLowerCase().includes(filtroTexto.toLowerCase())
            );
        }

        return filteredProducts;
    };

    // Productos filtrados
    const productosFiltrados = filtrarProductos(productosData?.listaProductos || []);

    // Resetea los filtros
    const resetFilters = () => {
        setFiltroPais('');
        setFiltroEstado('');
        setFiltroCodigo('');
        setFiltroMarca('');
        setFiltroTexto('');
    };

    const getClassByEstado = (estado: any) => {

        switch (estado) {
            case "1"://mantenimiento
                return 'bg-yellow-500';
            case "2"://exposicion
                return 'bg-green-500 ';
            case "3"://vendido
                return 'bg-red-500';
            case "4"://exportacion
                return 'bg-blue-500';
            default:
                return '';
        }
    };


    return (

        <>

            <div className="grid grid-cols-3 gap-4 p-8">

                <Select
                    name="filtropais"
                    value={filtroPais}
                    onValueChange={(value) => value !== " " ? setFiltroPais(value) : setFiltroPais("")}
                >
                    <SelectTrigger className="">
                        <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value=" ">Todos</SelectItem>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="Peru">PERU</SelectItem>
                    </SelectContent>

                </Select>

                <Select
                    name="filtroestado"
                    value={filtroEstado}
                    onValueChange={(value) => value !== " " ? setFiltroEstado(value) : setFiltroEstado("")}
                >
                    <SelectTrigger className="">
                        <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value=" ">Todos</SelectItem>
                        <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                        <SelectItem value="Exposicion">Exposicion</SelectItem>
                        <SelectItem value="Vendido">Vendido</SelectItem>
                        <SelectItem value="Exportacion">Exportacion</SelectItem>
                    </SelectContent>

                    {/* Opciones del estado */}
                </Select>

                <Input
                    type="text"
                    id="filtrocodigo"
                    value={filtroCodigo}
                    onChange={(e) => setFiltroCodigo(e.target.value)}
                    placeholder="Filtra por codigo"
                    className="mr-2"
                />

                <Select
                    name="filtromarca"
                    value={filtroMarca}
                    onValueChange={(value) => value !== " " ? setFiltroMarca(value) : setFiltroMarca("")}
                >
                    <SelectTrigger className="">
                        <SelectValue placeholder="Selecciona un marca" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value=" ">Todas</SelectItem>
                        {productosData?.listaMarcas.map((producto: any) => (
                            <SelectItem value={producto.marcalower}>{producto.marca}</SelectItem>
                        ))}
                    </SelectContent>

                </Select>

                <Input
                    type="text"
                    id="filtrotexto"
                    value={filtroTexto}
                    onChange={(e) => setFiltroTexto(e.target.value)}
                    placeholder="Filtra por texto"
                    className="mr-2"
                />
                <button onClick={resetFilters} className="btn btn-primary">
                    Resetear Filtros
                </button>


                {
                    areaacceso === "admin" ? (
                        <><div className="col-span-3 m-auto">
                            <UpdInsProducto Producto={{ idproducto: 0 }} Marcas={productosData?.listaMarcas} funcion={"productos"}>
                                <Button>Registrar Producto</Button>
                            </UpdInsProducto>
                        </div></>
                    ) : (
                        <>

                        </>
                    )
                }

            </div>

            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                {
                    productosFiltrados.map((producto: any) => (

                        <div >
                            <Card
                                className="overflow-hidden" x-chunk="dashboard-05-chunk-4" key={producto.idproducto}
                            >
                                <CardHeader className={`flex flex-row items-start ${getClassByEstado(producto.estado)}`}  >
                                    <div className="grid gap-0.5">
                                        <CardTitle className="group flex items-center gap-2 text-lg text-slate-100" >
                                            {producto.codigo}
                                        </CardTitle>
                                        <CardTitle className="group flex items-center gap-2 text-lg text-slate-100" >
                                            {producto.marca} {producto.modelo}
                                        </CardTitle>
                                        <CardDescription className="text-slate-100">Fecha Ingreso: {producto.fechaingreso}</CardDescription>
                                    </div>
                                    <div className="ml-auto flex items-center gap-1">
                                        <Button size="sm" variant="outline" className="h-8 gap-1">
                                            <Truck className="h-3.5 w-3.5" />
                                            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                                Ver Repuestos
                                            </span>
                                        </Button>

                                        {
                                            areaacceso === "admin" && (
                                                <><DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button size="icon" variant="outline" className="h-8 w-8">
                                                            <MoreVertical className="h-3.5 w-3.5" />
                                                            <span className="sr-only">More</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">

                                                        {/* <UpdInsProducto Producto={producto} Marcas={productosData?.listaMarcas} funcion={"productos"}>
                                                            <DropdownMenuItem >Editar</DropdownMenuItem>
                                                        </UpdInsProducto>

                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>Anular</DropdownMenuItem> */}
                                                    </DropdownMenuContent>
                                                </DropdownMenu></>
                                            )
                                        }

                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 text-sm">
                                    <div className="grid gap-3 h-52 mb-8">
                                        <img
                                            src={producto.urlimagen}
                                            className="mx-auto h-52"
                                            alt="Descripción de la imagen"
                                            loading="lazy"
                                        />
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="grid gap-3">
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Costo Inicial
                                                </span>
                                                <span>{formatNumber(producto.costoSt)}</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Gastos Mano de Obra
                                                </span>
                                                <span>{formatNumber(producto.manoobra)}</span>
                                            </li>

                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Gastos Materiales
                                                </span>
                                                <span>{formatNumber(producto.materiales)}</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Gastos Repuestos
                                                </span>
                                                <span>{formatNumber(producto.repuestos)}</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Gastos Otros
                                                </span>
                                                <span>{formatNumber(producto.otros)}</span>
                                            </li>
                                        </ul>
                                        <Separator className="my-2" />
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between font-semibold">
                                                <span className="text-muted-foreground">Gasto Total</span>
                                                <span>{formatNumber(producto.gastoFinal)}</span>
                                            </li>
                                        </ul>

                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Estado</span>
                                                <span className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full ${getClassByEstado(producto.estado)}`}>
                                                    {producto.estadoTexto}
                                                </span>
                                            </li>
                                        </ul>

                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Precio Venta</span>
                                                <span>{formatNumber(producto.precioventa)}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Separator className="my-4" />

                                    <div className="grid gap-3">

                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span >
                                                    <Link
                                                        to={`${producto.idproducto}#notas`}>
                                                        <Button variant="outline" >Notas</Button>
                                                    </Link>
                                                </span>
                                                <span>
                                                    <Link
                                                        to={`${producto.idproducto}#gastos`}>
                                                        <Button variant="outline" >Gastos</Button>
                                                    </Link>
                                                </span>
                                            </li>
                                        </ul>

                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                    ))}
            </main>
        </>
    )
}

export default Productos