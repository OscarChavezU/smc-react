import { Navigate } from "react-router-dom"
import { useAuthStore } from "@/store/auth";
import { ReactElement } from "react";

interface Props {
    element: ReactElement
}

export const ProtectedRoute = ({ element }: Props) => {

    const isAuth =  useAuthStore(state => state.isAuth)

    if(!isAuth ) return <Navigate to="/login" />
    return element
}