import { useAuthStore } from "@/store/auth";

interface productosResponse {
    listaProductos: any[]; // Ajusta esto según la estructura de tu respuesta
    listaMarcas: any[]; // Ajusta esto según la estructura de tu respuesta
}

const apiUrl = import.meta.env.VITE_API_URL;

export const productosRequest = async (): Promise<productosResponse> => {
    const token = useAuthStore.getState().token;

    const response = await fetch(apiUrl + 'productos/listaProductosRes', {
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



interface gastosResponse {
    listaNotas: any[],
    listaGastos: any[],
    listaManoObra: any[],
    listaRepuestos: any[],
    listaMateriales: any[],
    listaOtros: any[],
    producto: any,
    totalManoObra: any,
    totalRepuestos: any,
    totalMateriales: any,
    totalOtros: any,
    listaMarcas: any[],
}

export const CostosxProducto = async (idproducto: number): Promise<gastosResponse> => {
    const token = useAuthStore.getState().token;

    const response = await fetch(apiUrl + `productos/getCostos/${idproducto}`, {
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


interface gasto {
    idgasto?: number,
    fecharegistro: string,
    nombre: string,
    descripcion: string,
    monto: number,
    tipogasto?: string,
    observaciones: string,
    idproducto?: any,
}

export const updateGasto = async (gasto: gasto) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `productos/updGasto`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(gasto)
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}


export const insertGasto = async (gasto: gasto) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `productos/insGasto`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(gasto)
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


interface nota {
    idnota?: number,
    idproducto?: number,
    fecha?: string,
    descripcion?: string,
    estado?: string,
}

export const insertNota = async (nota: nota) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `productos/insNota`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(nota)
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}


export const actualizarNota = async (nota: nota) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `productos/updNota`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(nota)
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}



interface Producto {
    idproducto: any,
    nombre?: any,
    proveedor?: any,
    fechaingreso?: any,
    origen?: any,
    anio?: any,
    codigo?: any,
    modelo?: any,
    marca?: any,
    pais?: any,
    estado?: any,
    costo?: any,
    precioventa?: any,
    quiereFoto?: any,
    foto?: any,
}


export const insertProducto = async (producto: Producto) => {
    const token = useAuthStore.getState().token;

    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("pais", producto.pais);
    formData.append("proveedor", producto.proveedor);
    formData.append("fechaingreso", producto.fechaingreso);
    formData.append("origen", producto.origen);
    formData.append("anio", producto.anio);
    formData.append("codigo", producto.codigo);
    formData.append("modelo", producto.modelo);
    formData.append("marca", producto.marca);
    formData.append("estado", producto.estado);
    formData.append("costo", producto.costo);
    formData.append("precioventa", producto.precioventa);
    formData.append("quiereFoto", producto.quiereFoto);

    if (producto.foto) {
        formData.append("foto", producto.foto);
    }

    console.log(formData)

    const response = await fetch(apiUrl + `productosInsUpd/ins`, {
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

export const updProducto = async (producto: Producto) => {
    const token = useAuthStore.getState().token;

    const formData = new FormData();
    formData.append("idproducto", producto.idproducto);
    formData.append("nombre", producto.nombre);
    formData.append("pais", producto.pais);
    formData.append("proveedor", producto.proveedor);
    formData.append("fechaingreso", producto.fechaingreso);
    formData.append("origen", producto.origen);
    formData.append("anio", producto.anio);
    formData.append("codigo", producto.codigo);
    formData.append("modelo", producto.modelo);
    formData.append("marca", producto.marca);
    formData.append("estado", producto.estado);
    formData.append("costo", producto.costo);
    formData.append("precioventa", producto.precioventa);
    formData.append("quiereFoto", producto.quiereFoto);

    if (producto.foto) {
        formData.append("foto", producto.foto);
    }


    const response = await fetch(apiUrl + `productosInsUpd/upd`, {
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