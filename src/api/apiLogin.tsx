import { useAuthStore } from "@/store/auth";
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;


interface LoginData {
    username: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
}

export const loginRequest = async (loginData: LoginData): Promise<LoginResponse> => {

    const response = await fetch(apiUrl + 'autentica/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        throw new Error('Error al iniciar sesión');
    }

    return response.json();
}




interface profileResponse {
    usuario: string;
    idusuario: string;
    area: string;
}

export const profileRequest = async (): Promise<profileResponse> => {

    const token = useAuthStore.getState().token;

    try {

        const response = await axios.post(apiUrl + 'autentica/profile', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data as profileResponse;

    } catch (error) {
        // Manejo de errores
        if (axios.isAxiosError(error)) {
            throw new Error('Error de red o problema con el token');
        } else {
            throw new Error('Error al procesar la respuesta del servidor');
        }
    }
}

