import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CostosxProducto } from "@/api/apiProductos";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TablaGastos from "./components/gastos/TablaGastos";
import { Button } from "@/components/ui/button";
import UpdInsProducto from "./components/productos/UpdInsProducto";
import DialogInsGastos from "./components/gastos/DialogInsGastos";
import DialogInsNotas from "./components/notas/DialogInsNotas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLocation } from 'react-router-dom';
import TablaNotas from "./components/notas/TablaNotas";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { formatNumber } from "@/funciones/funciones";

function Producto() {

    const navigate = useNavigate();

    const location = useLocation();
    const hash = location.hash.slice(1);

    const areaacceso = useAuthStore.getState().profile.areaacceso;

    const { idproducto } = useParams();

    // Convertir idproducto a número
    const idProductoNumber = Number(idproducto);

    // Verificar si la conversión fue exitosa
    if (isNaN(idProductoNumber)) return "Id debe ser número"

    const {
        isLoading,
        isError,
        data: dataGastos,
        error,
    } = useQuery({
        queryKey: ["gastosxproducto"],
        queryFn: () => CostosxProducto(idProductoNumber),
        refetchOnWindowFocus: false,
    });

    if (isLoading) return "loading...";
    if (isError) return `Error: ${error}`;

    const totalGastos = dataGastos?.listaGastos?.reduce((acc, gasto) => acc + gasto.monto, 0);
    const totalGastosRounded = totalGastos.toFixed(2);
    const sumatotal = (totalGastos + dataGastos?.producto.costo).toFixed(2);
    console.log(dataGastos);

    return (
        <>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">


                <div className="md:col-span-2 mt-8">
                    <Card className=" lg:w-[100%]">
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 ">
                                    Detalles
                                </CardTitle>
                            </div>
                            <div className="ml-auto flex items-center gap-1">

                                {
                                    areaacceso === "admin" ? (
                                        <>
                                            <UpdInsProducto Producto={dataGastos?.producto} Marcas={dataGastos?.listaMarcas} funcion={"gastosxproducto"}>
                                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                                    <span
                                                        className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-7 md:w-7"
                                                    >Editar
                                                    </span>
                                                </Button>
                                            </UpdInsProducto>
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )
                                }



                            </div>
                        </CardHeader> 
                        <CardContent>
                            <div className="grid gap-3">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium">País</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.pais}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Codigo</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.codigo}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Nombre</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.nombre}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Modelo</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.modelo}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Marca</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.marca}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Proveedor</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.proveedor}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Fecha Ingreso</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.fechaingreso}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Origen</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.origen}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Año</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.anio}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Modelo</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.modelo}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Costo</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.costo}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Estado</TableCell>
                                            <TableCell className="text-right">{dataGastos?.producto.estadoTexto}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>




                <div className="md:col-span-2">

                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 border border-gray-300 p-4 rounded-lg">
                            <div><h2 className="font-semibold text-lg">Costo Inicial</h2></div>
                            <div><h2 className="font-semibold text-lg text-right">{formatNumber(parseFloat(dataGastos?.producto.costoSt))}</h2></div>
                        </div>

                        <div className="grid grid-cols-2 border border-gray-300 p-4 rounded-lg">
                            <div><h2 className="font-semibold text-lg">Total Gastos</h2></div>
                            <div><h2 className="font-semibold text-lg text-right">{formatNumber(parseFloat(totalGastosRounded))}</h2></div>
                        </div>

                        <div className="grid grid-cols-2 border border-gray-300 p-4 rounded-lg">
                            <div><h2 className="font-semibold text-lg">Costo Total Producto</h2></div>
                            <div><h2 className="font-semibold text-lg text-right">{formatNumber(parseFloat(sumatotal))}</h2></div>
                        </div>
                    </div>
                </div>



                <div className="lg:col-span-4">
                    <div className="mt-4">
                        

                            
                                <div className="lg:m-auto ">
                                    <div className="mt-6 mb-6">
                                        {
                                            areaacceso === "admin" && (
                                                <>
                                                    <DialogInsGastos idproducto={idproducto} />
                                                </>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="space-y-3 ">

                                    <Tabs defaultValue="general" className="">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="general">Vista General</TabsTrigger>
                                            <TabsTrigger value="detallada">Vista Detallada</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="general" className="mt-4">
                                            <div className="grid xl:grid-cols-2 gap-4 ">
                                                <TablaGastos titulo="Gastos Mano de Obra" data={dataGastos?.listaManoObra} idproducto={idproducto} />
                                                <TablaGastos titulo="Gastos Repuestos" data={dataGastos?.listaRepuestos} idproducto={idproducto} />
                                                <TablaGastos titulo="Gastos Materiales" data={dataGastos?.listaMateriales} idproducto={idproducto} />
                                                <TablaGastos titulo="Gastos Otros" data={dataGastos?.listaOtros} idproducto={idproducto} />
                                            </div>

                                        </TabsContent>

                                        <TabsContent value="detallada">
                                            <TablaGastos titulo="Gastos Detallados" data={dataGastos?.listaGastos} idproducto={idproducto} />
                                        </TabsContent>
                                    </Tabs>

                                </div>

                            

                                <div className="lg:m-auto ">
                                    <div className="mt-6 mb-6">
                                        <DialogInsNotas idproducto={idproducto} />
                                    </div>
                                </div>

                                <TablaNotas titulo="Notas" data={dataGastos?.listaNotas} idproducto={idproducto} />
                            

                    </div>


                </div>

            </main>
        </>

    )
}

export default Producto