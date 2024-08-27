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
import DialogDelMovimientosRepuesto from "./DialogDelMovimientosRepuesto";
import { formatNumber } from "@/funciones/funciones";


interface Props {
    titulo: string,
    idrepuesto: any,
    data?: any[]
    stock: any,
}



function TablaMovimientosRepuesto({ titulo, data, idrepuesto, stock }: Props) {

    const areaacceso = useAuthStore.getState().profile.areaacceso;


    return (
        <>
            <Card className="m-auto lg:min-w-[80%]">
                <CardHeader>
                    <CardTitle>{titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3">
                        <Table><TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Descripcion</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                            <TableBody>
                                {data?.map((movimientoRepuesto: any) => (
                                    <TableRow>
                                        <TableCell >{movimientoRepuesto.fecha}</TableCell>
                                        <TableCell >{movimientoRepuesto.tipo}</TableCell>
                                        <TableCell >{movimientoRepuesto.descripcion}</TableCell>
                                        <TableCell className="text-right">{formatNumber(movimientoRepuesto.cantidad)}</TableCell>
                                        {
                                            areaacceso === "admin" ? (
                                                <>
                                                    <TableCell >
                                                        <DialogDelMovimientosRepuesto idmovrep={movimientoRepuesto.idmovrep} />
                                                    </TableCell>
                                                </>
                                            ) : (
                                                <>
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
                                    <TableCell className="text-right">{formatNumber(stock)}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </>
    )
}

export default TablaMovimientosRepuesto