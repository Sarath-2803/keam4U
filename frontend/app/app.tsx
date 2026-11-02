import { Outlet } from "react-router";
import { SiteHeader } from "./components/SiteHeader";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";

export default function App() {
    return (
        <div className="flex min-h-screen flex-col bg-surface">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-10 lg:px-8 lg:pt-10">
                <Outlet />
            </main>
            <Footer />
            <Navigation />
        </div>
    );
}
