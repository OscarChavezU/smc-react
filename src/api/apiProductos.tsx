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

    const response = await fetch(apiUrl + `gastos/getCostos/${idproducto}`, {
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
    const response = await fetch(apiUrl + `gastos/updGasto`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        },
        body: new URLSearchParams({
            idgasto: gasto.idgasto?.toString() || '',
            fecharegistro: gasto.fecharegistro,
            nombre: gasto.nombre,
            descripcion: gasto.descripcion,
            monto: gasto.monto.toString(),
            observaciones: gasto.observaciones
        })
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}


export const insertGasto = async (gasto: gasto) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `gastos/insGasto`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        },
        body: new URLSearchParams({
            fecharegistro: gasto.fecharegistro,
            nombre: gasto.nombre,
            descripcion: gasto.descripcion,
            monto: gasto.monto.toString(),
            tipogasto: gasto.tipogasto || '',
            observaciones: gasto.observaciones,
            idproducto: gasto.idproducto?.toString() || ''
        })
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}


export const anularGasto = async (idgasto: number) => {
    const token = useAuthStore.getState().token;
    const response = await fetch(apiUrl + `gastos/anularGasto`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        },
        body: new URLSearchParams({
            idgasto: idgasto.toString()
        })
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
    const response = await fetch(apiUrl + `notas/insNota`, {
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
    const response = await fetch(apiUrl + `notas/updNota`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
        },
        body: new URLSearchParams({
            idnota: nota.idnota?.toString() || '',  // Asegura que sea un string
            estado: nota.estado || ''  
        })
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

    

    const response = await fetch(apiUrl + `productos/ins`, {
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

    const formData2 = new FormData();
    formData2.append("idproducto", producto.idproducto.toString());
    formData2.append("nombre", producto.nombre);
    formData2.append("pais", producto.pais);
    formData2.append("proveedor", producto.proveedor);
    formData2.append("fechaingreso", producto.fechaingreso);
    formData2.append("origen", producto.origen);
    formData2.append("anio", producto.anio);
    formData2.append("codigo", producto.codigo);
    formData2.append("modelo", producto.modelo);
    formData2.append("marca", producto.marca);
    formData2.append("estado", producto.estado);
    formData2.append("costo", producto.costo.toString());
    formData2.append("precioventa", producto.precioventa.toString());
    formData2.append("quiereFoto", producto.quiereFoto);

    if (producto.foto) {
        formData2.append("foto", producto.foto);
    }

    const response = await fetch(apiUrl + `productos/actualizar`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData2
    });

    if (!response.ok) {
        throw new Error('Error al obtener la data');
    }

    return response;
}