import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { PerfilxRepuesto } from '@/api/apiRepuestos';
import { formatNumber } from "@/funciones/funciones";
import { Button } from '@/components/ui/button';
import UpdInsRepuesto from './components/repuestos/UpdInsRepuesto';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import DialogInsMovimientosRepuesto from './components/repuestos/DialogInsMovimientosRepuesto';
import TablaMovimientosRepuesto from './components/repuestos/TablaMovimientosRepuesto';

function Repuesto() {

    const areaacceso = useAuthStore.getState().profile.areaacceso;
    const { idrepuesto } = useParams();

    // Convertir idproducto a número
    const idRepuestoNumber = Number(idrepuesto);

    // Verificar si la conversión fue exitosa
    if (isNaN(idRepuestoNumber)) return "Id debe ser número"


    const {
        isLoading,
        isError,
        data: dataPerfilRepuesto,
        error,
    } = useQuery({
        queryKey: ["perfilrepuesto"],
        queryFn: () => PerfilxRepuesto(idRepuestoNumber),
        refetchOnWindowFocus: false,
    });

    if (isLoading) return "loading...";
    if (isError) return `Error: ${error}`;

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
                                            <UpdInsRepuesto Repuesto={dataPerfilRepuesto?.repuesto} funcion={"perfilrepuesto"}>
                                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                                    <span
                                                        className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-7 md:w-7"
                                                    >Editar
                                                    </span>
                                                </Button>
                                            </UpdInsRepuesto>
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
                                            <TableCell className="text-right" colSpan={2}>
                                                <img
                                                    src={dataPerfilRepuesto?.repuesto.urlfoto}
                                                    className="mx-auto h-52"
                                                    alt={dataPerfilRepuesto?.repuesto.nombre}
                                                    loading="lazy"
                                                />


                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Nombre</TableCell>
                                            <TableCell className="text-right">{dataPerfilRepuesto?.repuesto.nombre}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Nro Parte</TableCell>
                                            <TableCell className="text-right">{dataPerfilRepuesto?.repuesto.nroparte}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Compatible</TableCell>
                                            <TableCell className="text-right">{dataPerfilRepuesto?.repuesto.compatible}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Fecha Creacion</TableCell>
                                            <TableCell className="text-right">{dataPerfilRepuesto?.repuesto.fechacreacion}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Estado</TableCell>
                                            <TableCell className="text-right">{dataPerfilRepuesto?.repuesto.estadoTexto}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4">
                    <div className="mt-4">



                        <div className="lg:m-auto ">
                            <div className="mt-6 mb-6">
                                {
                                    areaacceso === "admin" && (
                                        <>
                                            <DialogInsMovimientosRepuesto idrepuesto={idRepuestoNumber} funcion='perfilrepuesto'  >

                                                <Button>
                                                        Registrar Movimiento
                                                </Button>
                                            </DialogInsMovimientosRepuesto>
                                        </>
                                    )
                                }
                            </div>
                        </div>

                        <div className="space-y-3 ">


                            <div className="grid xl:grid-cols-2 gap-4 ">
                                <TablaMovimientosRepuesto titulo="Movimientos" data={dataPerfilRepuesto?.listaMovimientos} idrepuesto={idRepuestoNumber} stock={dataPerfilRepuesto?.repuesto.stock} />
                            </div>



                        </div>

                    </div>


                </div>

            </main>
        </>
    )
}

export default Repuesto