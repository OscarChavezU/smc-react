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
import { Check, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { actualizarNota } from "@/api/apiProductos";

interface Props{
    idnota:number,
    texto:string,
    estado:string,
}

function DialogDelNotas({idnota,texto,estado}:Props) {



    const queryClient = useQueryClient();

    const { mutate, isError, error, reset } = useMutation({
        mutationFn: actualizarNota,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ["gastosxproducto"]
            })

        }
    })

    const actualizar = () => {
        mutate({idnota, estado});
    }

    const statusIcono = estado === "1" ? <Check /> : estado === "0" ? <Trash2/> : "";


  return (
    <AlertDialog>
            <AlertDialogTrigger>

                <span
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-7 md:w-7"
                >
                    {statusIcono}
                </span>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Desea {texto} la nota?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => actualizar()}>Confirmar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  )
}

export default DialogDelNotas