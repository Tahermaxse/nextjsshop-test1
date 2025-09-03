'use client'
import React, { useEffect, useState } from 'react'

interface NavItem {
  href: string
  label: string
  icon: JSX.Element
}

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState<string>('#naming')

  const navItems: NavItem[] = [
    {
      href: '#naming',
      label: 'Naming',
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
      href: '#wordmark',
      label: 'Wordmark',
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
      href: '#logo',
      label: 'Logo',
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
    {
      href: '#colors',
      label: 'Colors',
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
              d="M6.591,14.591l6.541-6.541c.391-.391,.391-1.024,0-1.414l-1.768-1.768c-.391-.391-1.024-.391-1.414,0l-.2,.2"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M5,15.25H14.25c.552,0,1-.448,1-1v-2.5c0-.552-.448-1-1-1h-.283"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M5,2.75h0c1.242,0,2.25,1.008,2.25,2.25V14.25c0,.552-.448,1-1,1H3.75c-.552,0-1-.448-1-1V5c0-1.242,1.008-2.25,2.25-2.25Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              transform="translate(10 18) rotate(180)"
            />
            <circle cx={5} cy={13} fill="currentColor" r=".75" stroke="none" />
          </g>
        </svg>
      ),
    },
    {
      href: '#screenshots',
      label: 'Screenshots',
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
              width="14.5"
              fill="none"
              rx={2}
              ry={2}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              transform="translate(18 18) rotate(180)"
              x="1.75"
              y="2.75"
            />
            <circle
              cx="4.25"
              cy="5.25"
              fill="currentColor"
              r=".75"
              stroke="none"
            />
            <circle
              cx="6.75"
              cy="5.25"
              fill="currentColor"
              r=".75"
              stroke="none"
            />
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              x1="1.75"
              x2="16.25"
              y1="7.75"
              y2="7.75"
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
    }
  }

  return (
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
  )
}

export default Sidebar