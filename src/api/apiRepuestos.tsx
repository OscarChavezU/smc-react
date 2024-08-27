import { useAuthStore } from "@/store/auth";

const apiUrl = import.meta.env.VITE_API_URL;


interface repuestosResponse {
    listaRepuestos: any[]; // Ajusta esto según la estructura de tu respuesta
}

export const repuestosRequest = async (): Promise<repuestosResponse> => {
    const token = useAuthStore.getState().token;

    const response = await fetch(apiUrl + 'repuestos/listaRepuestos', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }
    console.log(response);
    return response.json();
}



interface Repuesto {
    idrepuesto: any,
    nombre?: any,
    nroparte?: any,
    compatible?: any,
    estado?: any,
    estadoTexto?: any,
    urlfoto?: any,
    fechacreacion?: any,
    stock?: any,
    foto?: File | null,
    quiereFoto?: any,
}


interface perfilRepuesto {
    repuesto: Repuesto;
    listaMovimientos: any[],
}


export const PerfilxRepuesto = async (idrepuesto: number): Promise<perfilRepuesto> => {
    const token = useAuthStore.getState().token;

    const response = await fetch(apiUrl + `repuestos/getRepuesto/${idrepuesto}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response.json();
}



export const insRepuesto = async (repuesto: Repuesto) => {
    const token = useAuthStore.getState().token;


    const formData = new FormData();
    formData.append("idrepuesto", "0");
    formData.append("nombre", repuesto.nombre);
    formData.append("nroparte", repuesto.nroparte);
    formData.append("compatible", repuesto.compatible);
    formData.append("estado", repuesto.estado);
    formData.append("fechacreacion", repuesto.fechacreacion);
    formData.append("quiereFoto", repuesto.quiereFoto);

    if (repuesto.foto) {
        formData.append("foto", repuesto.foto);
    }

    console.log(formData)

    const response = await fetch(apiUrl + `repuestosInsUpd/ins`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}

export const updRepuesto = async (repuesto: Repuesto) => {
    const token = useAuthStore.getState().token;

    const formData = new FormData();
    formData.append("idrepuesto", repuesto.idrepuesto);
    formData.append("nombre", repuesto.nombre);
    formData.append("nroparte", repuesto.nroparte);
    formData.append("compatible", repuesto.compatible);
    formData.append("estado", repuesto.estado);
    formData.append("fechacreacion", repuesto.fechacreacion);
    formData.append("quiereFoto", repuesto.quiereFoto);

    if (repuesto.foto) {
        formData.append("foto", repuesto.foto);
    }

    const response = await fetch(apiUrl + `repuestosInsUpd/upd`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}



export const anularMovRepuesto = async (idmovrep: number) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `repuestos/anularMovrep`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ "idmovrep": idmovrep })
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}


interface movRepuesto {
    idmovrep?: number,
    fecha?: string,
    tipo?: string,
    descripcion?: string,
    idrepuesto?: number,
    cantidad?: number,
    estado?: string,
}

export const insMovRepuesto = async (movRepuesto: movRepuesto) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `repuestos/movRepuestoIns`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(movRepuesto)
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}



export const anularGasto = async (idgasto: number) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `productos/anularGasto`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ "idgasto": idgasto })
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}