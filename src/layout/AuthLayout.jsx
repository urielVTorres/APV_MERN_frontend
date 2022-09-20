import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <main className=" gap-5 p-3 container mx-auto md:grid md:grid-cols-2 min-h-screen">
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout;