import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { useQuery } from "react-query";
import { repuestosRequest } from "@/api/apiRepuestos";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import UpdInsRepuesto from "./components/repuestos/UpdInsRepuesto";

interface Repuesto {
    idrepuesto: number;
    nombre: string;
    nroparte: string;
    compatible: string;
    estado: string;
    estadoTexto: string;
    urlfoto: string;
    fechacreacion: string;
    stock: string;
}

function Repuestos() {
    const navigate = useNavigate();
    const areaacceso = useAuthStore.getState().profile.areaacceso;

    const { isLoading, isError, data: repuestosData, error } = useQuery({
        queryKey: ["repuestos"],
        queryFn: repuestosRequest,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return 'Cargando repuestos...';
    if (isError) return `Error: ${error}`;



    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
            <Card>


                <div className=" gap-4 p-8">


                    {
                        areaacceso === "admin" ? (
                            <><div className="col-span-3 m-auto">
                                <UpdInsRepuesto funcion='repuestos'>
                                    <Button >
                                        Registrar Repuesto
                                    </Button>
                                </UpdInsRepuesto>
                            </div></>
                        ) : (
                            <>

                            </>
                        )
                    }



                </div>




                <Table>
                    <TableHeader>

                        <TableRow >

                            <TableHead></TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Nro. Parte</TableHead>
                            <TableHead>Compatible</TableHead>
                            <TableHead>Fecha Creacion</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead></TableHead>

                        </TableRow>

                    </TableHeader>
                    <TableBody>
                        {repuestosData?.listaRepuestos.map(repuesto => (
                            <TableRow key={repuesto.idrepuesto}>

                                <TableCell>
                                    <img
                                        src={repuesto.urlfoto}
                                        className="mx-auto h-20"
                                        alt="Descripción de la imagen"
                                        loading="lazy"
                                    />
                                </TableCell>
                                <TableCell>{repuesto.nombre}</TableCell>
                                <TableCell>{repuesto.nroparte}</TableCell>
                                <TableCell>{repuesto.compatible}</TableCell>
                                <TableCell>{repuesto.fechacreacion}</TableCell>
                                <TableCell>{repuesto.stock}</TableCell>
                                <TableCell><Link
                                    to={`${repuesto.idrepuesto}`}>
                                    <Button variant="outline" >Ver Datos</Button>
                                </Link></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </main>
    );
}

export default Repuestos;
