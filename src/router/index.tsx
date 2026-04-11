import { createBrowserRouter } from "react-router-dom"


import App from "../App.tsx";
import {ThemeProvider} from "../Components/providers/theme-provider.tsx";
import NotFound from "../Components/pages/NotFound.tsx";
import ScholarsPage from "../Components/pages/ScholarsPage.tsx";


const WrappedApp = () => {
    return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
    </ThemeProvider>
    )
}

const WrappedScholars = () => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ScholarsPage />
    </ThemeProvider>
)
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
        path: "/projects",
        element: <WrappedApp />,
    },
    {
        path: "/scholars",
        element: <WrappedScholars />,
    },
    {
        path: "*",
        element: <NotFound />,
    },

])