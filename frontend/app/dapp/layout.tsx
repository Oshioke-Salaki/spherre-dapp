'use client'
import { ReactNode } from 'react'

import { useState, useEffect } from 'react'
import Sidebar from '../dapp/Sidebar'
import Navbar from './Navbar'
import Dashboard from '@/public/Images/Dash.png'
import Trade from '@/public/Images/Trade.png'
import Members from '@/public/Images/Members.png'
import Transactions from '@/public/Images/Transactions.png'
import Stake from '@/public/Images/Stake.png'
import Treasury from '@/public/Images/Treasury.png'
import Payments from '@/public/Images/Payments.png'
import Apps from '@/public/Images/Apps.png'
import Settings from '@/public/Images/Settings.png'
import Support from '@/public/Images/Support.png'
import SmartLock from '@/public/Images/Smart-lock.png'
import { getSelectedPage, NavItem } from '@/app/dapp/navigation'
import { usePathname } from 'next/navigation'

interface DappLayoutProps {
  children: ReactNode
}

export default function DappLayout({ children }: DappLayoutProps) {
  // State to track sidebar expansion
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Define navigation items
  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: Dashboard, route: '/dapp/' },
    { name: 'Trade', icon: Trade, route: '/dapp/trade', comingSoon: true },
    { name: 'Members', icon: Members, route: '/dapp/members' },
    {
      name: 'Transactions',
      icon: Transactions,
      route: '/dapp/transactions',
    },
    { name: 'Stake', icon: Stake, comingSoon: true, route: '/dapp/stake' },
    {
      name: 'Smart Will',
      icon: Stake,
      comingSoon: true,
      route: '/dapp/smart-will',
    },
    {
      name: 'Treasury',
      icon: Treasury,
      route: '/dapp/treasury',
      comingSoon: true,
    },
    {
      name: 'Smart Lock',
      icon: SmartLock,
      route: '/dapp/smart',
      comingSoon: true,
    },
    {
      name: 'Payments',
      icon: Payments,
      comingSoon: true,
      route: '/dapp/payments',
    },
    { name: 'Apps', icon: Apps, comingSoon: true, route: '/dapp/apps' },
    { name: 'Settings', icon: Settings, route: '/dapp/settings' },
    {
      name: 'Support',
      icon: Support,
      comingSoon: true,
      route: '/dapp/support',
    },
  ]

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Listen for sidebar expansion state changes
  useEffect(() => {
    const sidebar = document.getElementById('sidebar')

    const handleSidebarHover = () => {
      if (!isMobile) {
        setSidebarExpanded(true)
      }
    }
    const handleSidebarLeave = () => {
      if (!isMobile) {
        setSidebarExpanded(false)
      }
    }

    if (sidebar && !isMobile) {
      sidebar.addEventListener('mouseenter', handleSidebarHover)
      sidebar.addEventListener('mouseleave', handleSidebarLeave)
    }

    return () => {
      if (sidebar && !isMobile) {
        sidebar.removeEventListener('mouseenter', handleSidebarHover)
        sidebar.removeEventListener('mouseleave', handleSidebarLeave)
      }
    }
  }, [isMobile])

  const pathname = usePathname()
  const selectedPage = getSelectedPage(pathname)

  return (
    <div className="bg-theme min-h-screen overflow-x-hidden transition-colors duration-300">
      <Sidebar
        navItems={navItems}
        selectedPage={selectedPage}
        isMobile={isMobile}
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
      />
      <div
        className={`transition-all duration-300 ${
          isMobile ? 'ml-0' : sidebarExpanded ? 'ml-64' : 'ml-16'
        }`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar
            title={selectedPage}
            isMobile={isMobile}
            setSidebarExpanded={setSidebarExpanded}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden bg-theme transition-colors duration-300">
            <div className="max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
