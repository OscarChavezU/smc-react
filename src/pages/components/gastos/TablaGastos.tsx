import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAuthStore } from "@/store/auth";
import DialogUpdGastos from "./DialogUpdGastos";
import DialogDelGastos from "./DialogDelGastos";
import { formatNumber } from "@/funciones/funciones";



interface Props {
    titulo: string,
    idproducto: any,
    data?: any[]
}




function TablaGastos({ titulo, data, idproducto }: Props) {

    const areaacceso = useAuthStore.getState().profile.areaacceso;
    const totalGastos = data?.reduce((sum, gasto) => sum + parseFloat(gasto.montoSt), 0);

    return (

        <Card className="m-auto lg:min-w-[80%]">
            <CardHeader>
                <CardTitle>{titulo}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    <Table><TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Descripcion</TableHead>
                            <TableHead className="text-right">Monto</TableHead>
                            <TableHead>Observaciones</TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                        <TableBody>
                            {data?.map((gasto: any) => (
                                <TableRow>
                                    <TableCell >{gasto.fecharegistro}</TableCell>
                                    <TableCell >{gasto.nombre}</TableCell>
                                    <TableCell >{gasto.descripcion}</TableCell>
                                    <TableCell className="text-right">{formatNumber(gasto.montoSt)}</TableCell>
                                    <TableCell >{gasto.observaciones}</TableCell>


                                    {
                                        areaacceso === "admin" ? (
                                            <>
                                                <TableCell >
                                                    <DialogUpdGastos idgasto={gasto.idgasto} fecharegistro={gasto.fecharegistro} nombre={gasto.nombre}
                                                        descripcion={gasto.descripcion} montoSt={gasto.montoSt} observaciones={gasto.observaciones} />
                                                </TableCell>
                                                <TableCell >
                                                    <DialogDelGastos idgasto={gasto.idgasto} />
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell />
                                                <TableCell />
                                            </>
                                        )
                                    }


                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-right">{formatNumber(totalGastos)}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default TablaGastos