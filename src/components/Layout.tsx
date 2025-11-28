import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { FloatingCTA } from './FloatingCTA'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <ScrollRestoration />
      <Header />
      <main className="flex-grow pt-[72px] lg:pt-[88px]">
        <Outlet />
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  )
}
