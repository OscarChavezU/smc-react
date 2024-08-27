import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQueryClient } from "react-query";
import { updateGasto } from "@/api/apiProductos";
import { useState } from "react";
import { FilePenLine} from "lucide-react";


interface Props {
  idgasto: any,
  fecharegistro: any,
  nombre: any,
  descripcion: any,
  montoSt: any,
  observaciones: any,
}

function DialogUpdGastos({ idgasto, fecharegistro, nombre, descripcion, montoSt, observaciones }: Props) {

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);


  const { mutate, isError, error, reset } = useMutation({
    mutationFn: updateGasto,
    onSuccess: (data, variables, context) => {
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["gastosxproducto"]
      })

    }
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const idgasto = Number(formData.get("idgasto"))
    const fecharegistro = String(formData.get("fecharegistro"))
    const nombre = String(formData.get("nombre"))
    const descripcion = String(formData.get("descripcion"))
    const observaciones = String(formData.get("observaciones"))
    const monto = Number(formData.get("monto"))

    if (!idgasto || !monto || !fecharegistro || !nombre) return

    mutate({ idgasto, fecharegistro, nombre, descripcion, monto , observaciones});

  }


  return (

    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <span
            className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-7 md:w-7"
          >
            <FilePenLine />
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Editar Gasto</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="idgasto"
                  name="idgasto"
                  defaultValue={idgasto}
                  type="hidden"
                />
                <Label htmlFor="fecharegistro" className="text-right">
                  Fecha Registro
                </Label>
                <Input
                  id="fecharegistro"
                  name="fecharegistro"
                  type="text"
                  defaultValue={fecharegistro}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  defaultValue={nombre}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descripcion" className="text-right">
                  Descripcion
                </Label>
                <Input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  defaultValue={descripcion}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="montoSt" className="text-right">
                  Monto
                </Label>
                <Input
                  id="monto"
                  name="monto"
                  type="number"
                  defaultValue={montoSt}
                  className="col-span-3"
                  step={0.01}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="descripcion" className="text-right">
                  Observaciones
                </Label>
                <Input
                  id="observaciones"
                  name="observaciones"
                  type="text"
                  defaultValue={observaciones}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" >Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>

      </Dialog>
    </>
  )
}

export default DialogUpdGastos