import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CloudCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { loginRequest, profileRequest } from "@/api/apiLogin";


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const loguinMutation = useMutation({
        mutationFn: loginRequest
    })

    const profileMutation = useMutation({
        mutationFn: profileRequest
    })

    const apiUrl = import.meta.env.VITE_API_URL;


    const setToken = useAuthStore(state => state.setToken)
    const setProfile = useAuthStore(state => state.setProfile)
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        loguinMutation.mutate(
            { username, password },
            {
                onSuccess: (data) => {
                    setToken(data.token)
                    setMessage("");
                    profileMutation.mutate();
                    // Manejar el éxito, como redireccionar al usuario o guardar el token
                },
                onError: (error: any) => {
                    setMessage(error.message);
                },
            }
        );
    }

    useEffect(() => {
        if (profileMutation.isSuccess && profileMutation.data) {
          // Aquí puedes acceder a los datos devueltos por la mutación exitosa
          setProfile(profileMutation.data);
          const profile = useAuthStore.getState().profile;
          navigate("/"+profile.areaacceso);
          
          // Puedes utilizar 'data' para actualizar el estado local, mostrar información al usuario, etc.
        }
      }, [profileMutation.isSuccess, profileMutation.data]);

    return (

        <div className="flex justify-center items-center mt-6">

            <form onSubmit={handleSubmit}>
                <Card className="w-full max-w-sm lg:min-w-[500px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Usuario</Label>
                            <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <h1><Input id="textourl" type="text" value={apiUrl}  /> </h1>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">
                            {loguinMutation.isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </CardFooter>

                    <CardFooter>
                        {message && (
                            < Alert variant="destructive" className="w-full">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {message}
                                </AlertDescription>
                            </Alert>
                        )
                        }
                    </CardFooter>


                </Card>
            </form>

        </div >

    )
}


export default Login