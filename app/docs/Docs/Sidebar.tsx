'use client'
import React, { useEffect, useState } from 'react'

interface NavItem {
  href: string
  label: string
  icon: JSX.Element
}

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState<string>('#get-started')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const navItems: NavItem[] = [
    {
      href: '#get-started',
      label: 'Get Started',
      icon: (
        <svg
          height={18}
          width={18}
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 shrink-0"
        >
          <g fill="currentColor">
            <rect
              height="12.5"
              width="12.5"
              fill="none"
              rx={2}
              ry={2}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x="2.75"
              y="2.75"
            />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="5.75"
              x2="9.25"
              y1="12.25"
              y2="12.25"
            />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="5.75"
              x2="12.25"
              y1="9.25"
              y2="9.25"
            />
            <circle cx={6} cy={6} fill="currentColor" r={1} strokeWidth="1.5" />
          </g>
        </svg>
      ),
    },
    {
      href: '#folder-structure',
      label: 'Folder Structure',
      icon: (
        <svg
          height={18}
          width={18}
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 shrink-0"
        >
          <g fill="currentColor">
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="2.25"
              x2="15.75"
              y1={9}
              y2={9}
            />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="9.75"
              x2="15.75"
              y1="3.75"
              y2="3.75"
            />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="2.25"
              x2="8.25"
              y1="14.25"
              y2="14.25"
            />
          </g>
        </svg>
      ),
    },
    {
      href: '#design-file',
      label: 'Design File',
      icon: (
        <svg
          height={18}
          width={18}
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 shrink-0"
        >
          <g fill="currentColor">
            <path
              d="M12.606,7.655c-.044-.136-.161-.235-.302-.255l-2.051-.298-.917-1.858c-.127-.256-.546-.256-.673,0l-.917,1.858-2.051,.298c-.141,.021-.258,.12-.302,.255-.044,.136-.007,.285,.095,.384l1.484,1.446-.351,2.042c-.024,.141,.034,.283,.149,.367s.269,.094,.395,.029l1.834-.964,1.834,.964c.055,.029,.115,.043,.174,.043,.078,0,.155-.024,.221-.072,.115-.084,.173-.226,.149-.367l-.351-2.042,1.484-1.446c.102-.1,.139-.249,.095-.384Z"
              fill="currentColor"
              stroke="none"
            />
            <path
              d="M15.718,8.293l-1.468-1.468v-2.075c0-.552-.448-1-1-1h-2.075l-1.468-1.468c-.391-.39-1.024-.39-1.414,0l-1.468,1.468h-2.075c-.552,0-1,.448-1,1v2.075l-1.468,1.468c-.391,.39-.391,1.024,0,1.414l1.468,1.468v2.075c0,.552,.448,1,1,1h2.075l1.468,1.468c.391,.39,1.024,.39,1.414,0l1.468-1.468h2.075c.552,0,1-.448,1-1v-2.075l1.468-1.468c.391-.39,.391-1.024,0-1.414Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      ),
    },
   
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { threshold: 0.5 }
    )

    navItems.forEach((item) => {
      const section = document.querySelector(item.href)
      if (section) observer.observe(section)
    })

    return () => {
      navItems.forEach((item) => {
        const section = document.querySelector(item.href)
        if (section) observer.unobserve(section)
      })
    }
  }, [navItems])

  const handleClick = (href: string) => {
    const section = document.querySelector(href)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(href)
      setIsMobileMenuOpen(false) // Close mobile menu after selection
    }
  }

  const getCurrentSectionLabel = () => {
    const currentItem = navItems.find(item => item.href === activeSection)
    return currentItem ? currentItem.label : 'Navigate'
  }

  const ChevronDownIcon = () => (
    <svg
      className={`ml-2 h-4 w-4 transition-transform duration-200 ${
        isMobileMenuOpen ? 'rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )

  return (
    <>
      {/* Mobile Menu - Shows on small screens */}
      <div className="lg:hidden border-b border-grid-border dark:border-zinc-700">
        <div className="relative">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-left bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <span className="text-sm font-medium text-neutral-900 dark:text-zinc-100">
              {getCurrentSectionLabel()}
            </span>
            <ChevronDownIcon />
          </button>
          
          {/* Mobile Dropdown Menu */}
          <div 
            className={`absolute top-full left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-grid-border dark:border-zinc-700 shadow-sm transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen 
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="py-2">
              {navItems.map((item, index) => (
                <li 
                  key={item.href}
                  className={`transform transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen 
                      ? 'translate-y-0 opacity-100' 
                      : '-translate-y-2 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' 
                  }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleClick(item.href)
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800 ${
                      activeSection === item.href
                        ? 'text-neutral-900 bg-gray-50 dark:text-zinc-100 dark:bg-zinc-800'
                        : 'text-neutral-900 opacity-70 dark:text-zinc-400'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar - Shows on large screens */}
      <div className="hidden border-r border-grid-border lg:block dark:border-zinc-700">
        <ul className="sticky top-10 flex flex-col gap-3 px-10 py-12">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleClick(item.href)
                }}
                className={`flex items-center gap-2.5 py-1 text-sm font-medium transition-opacity ${
                  activeSection === item.href
                    ? 'text-neutral-900 opacity-100 dark:text-zinc-100'
                    : 'text-neutral-900 opacity-40 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Sidebar