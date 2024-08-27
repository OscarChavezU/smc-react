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


import DialogDelNotas from "./DialogDelNotas";

interface Props {
    titulo: string,
    idproducto: any,
    data?: any[]
}


function TablaNotas({ titulo, data, idproducto }: Props) {
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
                            <TableHead>Descripcion</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead></TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                        <TableBody>
                            {data?.map((nota: any) => (
                                <TableRow>
                                    <TableCell >{nota.fecha}</TableCell>
                                    <TableCell >{nota.descripcion}</TableCell>
                                    <TableCell >{nota.estadoTexto}</TableCell>

                                    {
                                        nota.estadoTexto === "Pendiente" && (
                                            <>
                                                <TableCell >
                                                    <DialogDelNotas idnota={nota.idnota} estado={"1"} texto={"confirmar"} />
                                                </TableCell>
                                                <TableCell >
                                                    <DialogDelNotas idnota={nota.idnota} estado={"0"} texto={"anular"} />
                                                </TableCell>
                                            </>
                                        )
                                    }

                                    {
                                        nota.estadoTexto === "Atendido" && (
                                            <>
                                                <TableCell />
                                                <TableCell />
                                            </>
                                        )
                                    }

                                </TableRow>
                            ))}


                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default TablaNotas