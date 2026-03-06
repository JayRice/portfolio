import { createBrowserRouter } from "react-router-dom"


import App from "../App.tsx";
import {ThemeProvider} from "../Components/providers/theme-provider.tsx";
import NotFound from "../Components/pages/NotFound.tsx";


const WrappedApp = () => {
    return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
    </ThemeProvider>
    )
}
export const router = createBrowserRouter([
    {
        path: "/",
        element: <WrappedApp />,
    },
    {
        path: "/projects/:projectSlug",
        element: <WrappedApp />,
    },
    {
        path: "*",
        element: <NotFound />,
    },

])