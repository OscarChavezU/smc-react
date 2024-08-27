import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { anularGasto } from "@/api/apiProductos";
import { anularMovRepuesto } from "@/api/apiRepuestos";


interface Props {
    idmovrep: any
}

function DialogDelGastos({ idmovrep }: Props) {

    const queryClient = useQueryClient();

    const { mutate, isError, error, reset } = useMutation({
        mutationFn: anularMovRepuesto,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ["perfilrepuesto"]
            })

        }
    })

    const anular = () => {
        mutate(Number(idmovrep));
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>

                <span
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-7 md:w-7"
                >
                    <Trash2 />
                </span>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Desea anular el movimiento?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => anular()}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DialogDelGastos