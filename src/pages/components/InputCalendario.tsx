

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { es } from "date-fns/locale";
import {useState } from "react"

interface Props {
    esModal: boolean,
    updateState:any,
    date?:any,
    openDialog?:any,

}

function InputCalendario(props: Props) {

    const [open,setOpen] = useState(false);

    console.log(props.date,"fecha llega")

    const handleChange = (e:any) => {
        console.log(e);
        props.updateState(e);
        setOpen(false)
      };


    return (
        <Popover modal={props.esModal} open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !props.date && "text-muted-foreground"
                    )}
                    onClick={() => setOpen(!open)}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {props.date ? format(props.date, "PPP", { locale: es }) : <span>Elija una fecha</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 ">
                <Calendar
                    mode="single"
                    selected={props.date}
                    onSelect={handleChange}
                    initialFocus

                />
            </PopoverContent>
        </Popover>
    )
}

export default InputCalendario