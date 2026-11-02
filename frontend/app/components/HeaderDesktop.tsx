export const HeaderDesktop = ()=>{

    return (
        <header className="hidden items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex">       
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">App Name</h1>
            <nav className="flex items-center space-x-4">
                <a href="/dashboard" className="text-sm font-medium text-slate-700 hover:text-slate-900">Dashboard</a>
                <a href="/profile" className="text-sm font-medium text-slate-700 hover:text-slate-900">Profile</a>
                <a href="/settings" className="text-sm font-medium text-slate-700 hover:text-slate-900">Settings</a>
            </nav>
        </header>
    )
}