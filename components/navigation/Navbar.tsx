"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog copy";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  ChevronDown,
  HelpCircle,
  FileText,
  Users,
  Briefcase,
  Palette,
  Mail,
  PenTool,
  List,
  ChevronUp,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Logout, Profile, ProfileSettings } from "../Svgs";
import ResourcesMegaMenu from "./ResourcesMegaMenu";

// Resources menu items data structure
const resourcesMenuItems = {
  explore: [
    {
      title: "FAQs",
      description: "Frequently asked questions",
      icon: (
        <svg
          width="24"
          height="24"
          className="dark:invert"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 16.5C13.1422 16.5 16.5 13.1422 16.5 9C16.5 4.85775 13.1422 1.5 9 1.5C4.85775 1.5 1.5 4.85775 1.5 9C1.5 13.1422 4.85775 16.5 9 16.5ZM9 12C9.79565 12 10.5587 11.6839 11.1213 11.1213C11.6839 10.5587 12 9.79565 12 9C12 8.20435 11.6839 7.44129 11.1213 6.87868C10.5587 6.31607 9.79565 6 9 6C8.20435 6 7.44129 6.31607 6.87868 6.87868C6.31607 7.44129 6 8.20435 6 9C6 9.79565 6.31607 10.5587 6.87868 11.1213C7.44129 11.6839 8.20435 12 9 12Z"
            fill="black"
          />
          <path
            d="M4.10923 14.6867L7.31323 11.482C7.00049 11.2695 6.73076 10.9997 6.51823 10.687L3.31348 13.8902C3.55898 14.1752 3.82398 14.4402 4.10848 14.6852M3.31348 4.11024L6.51823 7.31424C6.73076 7.00151 7.00049 6.73177 7.31323 6.51924L4.10998 3.31299C3.82498 3.55899 3.55973 3.82424 3.31423 4.10874M10.686 6.51849L13.89 3.31524C14.175 3.56024 14.44 3.82524 14.685 4.11024L11.4825 7.31424C11.2697 7.00144 10.9997 6.7317 10.6867 6.51924M14.6857 13.891L11.481 10.6862C11.2684 10.999 10.9987 11.2687 10.686 11.4812L13.89 14.6867C14.1755 14.4412 14.4407 14.176 14.6857 13.891Z"
            fill="black"
          />
        </svg>
      ),
      href: "/resources/faqs",
    },
    {
      title: "Docs",
      description: "Platform documentation",
      icon: (
        <svg
          width="24"
          height="24"
          className="dark:invert"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.42598 18H20C19.997 18.93 19.978 19.623 19.887 20.17C19.777 20.823 19.577 21.168 19.271 21.414C18.964 21.66 18.534 21.821 17.721 21.908C16.884 21.998 15.775 22 14.185 22H9.75498C8.16498 22 7.05498 21.999 6.21898 21.908C5.40598 21.821 4.97598 21.66 4.66898 21.414C4.36198 21.168 4.16298 20.823 4.05298 20.171L4.03098 20.02C3.99098 19.729 3.97098 19.583 4.09698 19.24C4.22398 18.896 4.27798 18.843 4.38798 18.735C4.74452 18.3955 5.19013 18.1642 5.67298 18.068C5.96298  sexist18.006 6.34298 18 7.42598 18Z"
            fill="black"
          />
          <path
            opacity="0.5"
            d="M4.727 2.733C5.033 2.425 5.461 2.225 6.271 2.115C7.105 2.002 8.209 2 9.793 2H14.207C15.791 2 16.895 2.002 17.729 2.115C18.539 2.225 18.967 2.425 19.273 2.733C19.578 3.041 19.777 3.473 19.886 4.29C19.998 5.13 20 6.245 20 7.842V18H7.426C6.342 18 5.964 18.006 5.673 18.068C5.16 18.178 4.713 18.415 4.388 18.735C4.278 18.843 4.224 18.896 4.097 19.24C4.03698 19.3862 4.00411 19.542 4 19.7V7.842C4 6.245 4.002 5.131 4.114 4.29C4.223 3.474 4.422 3.041 4.727 2.733Z"
            fill="black"
          />
          <path
            d="M7.25 7C7.25 6.80109 7.32902 6.61032 7.46967 6.46967C7.61032 6.32902 7.80109 6.25 8 6.25H16C16.1989 6.25 16.3897 6.32902 16.5303 6.46967C16.671 6.61032 16.75 6.80109 16.75 7C16.75 7.19891 16.671 7.38968 16.5303 7.53033C16.3897 7.67098 16.1989 7.75 16 7.75H8C7.80109 7.75 7.61032 7.67098 7.46967 7.53033C7.32902 7.38968 7.25 7.19891 7.25 7ZM8 9.75C7.80109 9.75 7.61032 9.82902 7.46967 9.96967C7.32902 10.1103 7.25 10.3011 7.25 10.5C7.25 10.6989 7.32902 10.8897 7.46967 11.0303C7.61032 11.171 7.80109 11.25 8 11.25H13C13.1989 11.25 13.3897 11.171 13.5303 11.0303C13.671 10.8897 13.75 10.6989 13.75 10.5C13.75 10.3011 13.671 10.1103 13.5303 9.96967C13.3897 9.82902 13.1989 9.75 13 9.75H8Z"
            fill="black"
          />
        </svg>
      ),
      href: "#",
    },
  ],
  company: [
    {
      title: "About",
      description: "Company, values, and team",
      icon: (
        <svg
          width="18"
          height="18"
          className="dark:invert"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z"
            fill="black"
          />
          <path
            opacity="0.5"
            d="M20 17.5C20 19.985 20 22 12 22C4 22 4 19.985 4 17.5C4 15.015 7.582 13 12 13C16.418 13 20 15.015 20 17.5Z"
            fill="black"
          />
        </svg>
      ),
      href: "/about",
    },
    // {
    //   title: "Careers",
    //   description: "Join our global, remote team",
    //   icon: (
    //     <svg
    //       width="18"
    //       height="18"
    //       className="dark:invert"
    //       viewBox="0 0 18 18"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         opacity="0.5"
    //         d="M14.25 4.5H3.75C3.15326 4.5 2.58097 4.73705 2.15901 5.15901C1.73705 5.58097 1.5 6.15326 1.5 6.75V8.79L6.62775 10.5H11.3723L16.5 8.79V6.75C16.5 6.15326 16.2629 5.58097 15.841 5.15901C15.419 4.73705 14.8467 4.5 14.25 4.5Z"
    //         fill="black"
    //       />
    //       <path
    //         d="M7.5 4.5V3.75H10.5V4.5H12V3.75C12 3.35218 11.842 2.97064 11.5607 2.68934C11.2794 2.40804 10.8978 2.25 10.5 2.25H7.5C7.10218 2.25 6.72064 2.40804 6.43934 2.68934C6.15804 2.97064 6 3.35218 6 3.75V4.5H7.5ZM6.62775 10.5L1.5 8.79V13.5C1.5006 14.0966 1.73784 14.6685 2.15967 15.0903C2.5815 15.5122 3.15345 15.7494 3.75 15.75H14.25C14.8466 15.7494 15.4185 15.5122 15.8403 15.0903C16.2622 14.6685 16.4994 14.0966 16.5 13.5V8.79L11.3723 10.5H6.62775Z"
    //         fill="black"
    //       />
    //     </svg>
    //   ),
    //   href: "/",
    // },
    {
      title: "Brand Guidelines",
      description: "Logos, wordmark, etc.",
      icon: (
        <svg
          width={18}
          height={24}
          className="dark:invert"
          viewBox="0 0 30 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <foreignObject x="-7.98341" y="-15.7481" width="53.9668" height="46.9668">
            <div
              style={{
                backdropFilter: "blur(7.99px)",
                clipPath: "url(#bgblur_0_137_5_clip_path)",
                height: "100%",
                width: "100%"
              }}
            />
          </foreignObject>
          <path
            data-figma-bg-blur-radius="15.9834"
            d="M9.89355 2.62695L9.94824 2.80176H26.3281C27.2388 2.80176 28.111 3.14961 28.752 3.76465C29.3923 4.3793 29.75 5.21069 29.75 6.0752V14.9854H12.748L8.31445 0.810547L9.24219 0.542969L9.89355 2.62695Z"
            fill="#7F7F7F"
            fillOpacity="0.2"
            stroke="black"
            strokeWidth="0.5"
          />
          <mask id="path-2-inside-1_137_5" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.1 17.2354C15.543 17.2354 15.0089 17.4461 14.6151 17.8211C14.2212 18.1962 14 18.7049 14 19.2354C14 19.7658 14.2212 20.2745 14.6151 20.6496C15.0089 21.0246 15.543 21.2354 16.1 21.2354C16.657 21.2354 17.1911 21.0246 17.5849 20.6496C17.9788 20.2745 18.2 19.7658 18.2 19.2354C18.2 18.7049 17.9788 18.1962 17.5849 17.8211C17.1911 17.4461 16.657 17.2354 16.1 17.2354ZM15.4 19.2354C15.4 19.0585 15.4737 18.889 15.605 18.7639C15.7363 18.6389 15.9143 18.5687 16.1 18.5687C16.2857 18.5687 16.4637 18.6389 16.595 18.7639C16.7263 18.889 16.8 19.0585 16.8 19.2354C16.8 19.4122 16.7263 19.5817 16.595 19.7068C16.4637 19.8318 16.2857 19.902 16.1 19.902C15.9143 19.902 15.7363 19.8318 15.605 19.7068C15.4737 19.5817 15.4 19.4122 15.4 19.2354ZM25.9 17.2354C25.343 17.2354 24.8089 17.4461 24.4151 17.8211C24.0212 18.1962 23.8 18.7049 23.8 19.2354C23.8 19.7658 24.0212 20.2745 24.4151 20.6496C24.8089 21.0246 25.343 21.2354 25.9 21.2354C26.457 21.2354 26.9911 21.0246 27.3849 20.6496C27.7788 20.2745 28 19.7658 28 19.2354C28 18.7049 27.7788 18.1962 27.3849 17.8211C26.9911 17.4461 26.457 17.2354 25.9 17.2354ZM25.2 19.2354C25.2 19.0585 25.2737 18.889 25.405 18.7639C25.5363 18.6389 25.7143 18.5687 25.9 18.5687C26.0857 18.5687 26.2637 18.6389 26.395 18.7639C26.5263 18.889 26.6 19.0585 26.6 19.2354C26.6 19.4122 26.5263 19.5817 26.395 19.7068C26.2637 19.8318 26.0857 19.902 25.9 19.902C25.7143 19.902 25.5363 19.8318 25.405 19.7068C25.2737 19.5817 25.2 19.4122 25.2 19.2354Z"
            />
          </mask>
          <g filter="url(#filter1_i_137_5)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.1 17.2354C15.543 17.2354 15.0089 17.4461 14.6151 17.8211C14.2212 18.1962 14 18.7049 14 19.2354C14 19.7658 14.2212 20.2745 14.6151 20.6496C15.0089 21.0246 15.543 21.2354 16.1 21.2354C16.657 21.2354 17.1911 21.0246 17.5849 20.6496C17.9788 20.2745 18.2 19.7658 18.2 19.2354C18.2 18.7049 17.9788 18.1962 17.5849 17.8211C17.1911 17.4461 16.657 17.2354 16.1 17.2354ZM15.4 19.2354C15.4 19.0585 15.4737 18.889 15.605 18.7639C15.7363 18.6389 15.9143 18.5687 16.1 18.5687C16.2857 18.5687 16.4637 18.6389 16.595 18.7639C16.7263 18.889 16.8 19.0585 16.8 19.2354C16.8 19.4122 16.7263 19.5817 16.595 19.7068C16.4637 19.8318 16.2857 19.902 16.1 19.902C15.9143 19.902 15.7363 19.8318 15.605 19.7068C15.4737 19.5817 15.4 19.4122 15.4 19.2354ZM25.9 17.2354C25.343 17.2354 24.8089 17.4461 24.4151 17.8211C24.0212 18.1962 23.8 18.7049 23.8 19.2354C23.8 19.7658 24.0212 20.2745 24.4151 20.6496C24.8089 21.0246 25.343 21.2354 25.9 21.2354C26.457 21.2354 26.9911 21.0246 27.3849 20.6496C27.7788 20.2745 28 19.7658 28 19.2354C28 18.7049 27.7788 18.1962 27.3849 17.8211C26.9911 17.4461 26.457 17.2354 25.9 17.2354ZM25.2 19.2354C25.2 19.0585 25.2737 18.889 25.405 18.7639C25.5363 18.6389 25.7143 18.5687 25.9 18.5687C26.0857 18.5687  Oda26.2637 18.6389 26.395 18.7639C26.5263 18.889 26.6 19.0585 26.6 19.2354C26.6 19.4122 26.5263 19.5817 26.395 19.7068C26.2637 19.8318 26.0857 19.902 25.9 19.902C25.7143 19.902 25.5363 19.8318 25.405 19.7068C25.2737 19.5817 25.2 19.4122 25.2 19.2354Z"
              fill="url(#paint0_linear_137_5)"
            />
          </g>
          <path
            d="M16.1 17.2354L16.1 14.0387L16.1 17.2354ZM16.1 21.2354L16.1 24.432L16.1 21.2354ZM25.9 17.2354L25.9 14.0387L25.9 17.2354ZM23.8 19.2354L20.6033 19.2354L23.8 19.2354ZM25.9 21.2354L25.9 24.432L25.9 21.2354ZM16.1 17.2354L16.1 14.0387C14.7442 14.0387 13.4144 14.5502 12.4105 15.5063L14.6151 17.8211L16.8197 20.136C16.6034 20.342 16.3419 20.432 16.1 20.432L16.1 17.2354ZM14.6151 17.8211L12.4105 15.5063C11.4012 16.4675 10.8033 17.8054 10.8033 19.2354H14H17.1967C17.1967 19.6045 17.0413 19.9249 16.8197 20.136L14.6151 17.8211ZM14 19.2354H10.8033C10.8033 20.6653 11.4012 22.0032 12.4105 22.9644L14.6151 20.6496L16.8197 18.3347C17.0413 18.5458 17.1967 18.8663 17.1967 19.2354H14ZM14.6151 20.6496L12.4105 22.9644C13.4144 23.9205 14.7442 24.432 16.1 24.432V21.2354V18.0387C16.3419 18.0387 16.6034 18.1287 16.8197 18.3347L14.6151 20.6496ZM16.1 21.2354L16.1 24.432C17.4558 24.432 18.7856 23.9205 19.7895 22.9644L17.5849 20.6496L15.3803 18.3347C15.5966 18.1287 15.8581 18.0387 16.1 18.0387L16.1 21.2354ZM17.5849 20.6496L19.7895 22.9644C20.7988 22.0032 21.3967 20.6653 21.3967 19.2354H18.2H15.0033C15.0033 18.8663 15.1587 18.5458 15.3803 18.3347L17.5849 20.6496ZM18.2 19.2354H21.3967C21.3967 17.8054 20.7988 16.4675 19.7895 15.5063L17.5849 17.8211L15.3803 20.136C15.1587 19.9249 15.0033 19.6045 15.0033 19.2354H18.2ZM17.5849 17.8211L19.7895 15.5063C18.7856 14.5502 17.4558 14.0387 16.1 14.0387L16.1 17.2354L16.1 20.432C15.8581 20.432 15.5966 20.342 15.3803 20.136L17.5849 17.8211ZM15.4 19.2354H18.5967C18.5967 19.9581 18.2938 20.6177 17.8096 21.0788L15.605 18.7639L13.4004 16.4491C12.6537 17.1603 12.2033 18.159 12.2033 19.2354H15.4ZM15.605 18.7639L17.8096 21.0788C17.3308 21.5348 16.7132 21.7654 16.1 21.7654V18.5687V15.372C15.1155 15.372 14.1418 15.743 13.4004 16.4491L15.605 18.7639ZM16.1 18.5687V21.7654C15.4868 21.7654 14.8692 21.5348 14.3904 21.0788L16.595 18.7639L18.7996 16.4491C18.0582 15.743 17.0845 15.372 16.1 15.372V18.5687ZM16.595 18.7639L14.3904 21.0788C13.9062 20.6177 13.6033 19.9581 13.6033 19.2354H16.8H19.9967C19.9967 18.159 19.5463 17.1603 18.7996 16.4491L16.595 18.7639ZM16.8 19.2354H13.6033C13.6033 18.5126 13.9062 17.853 14.3904 17.3919L16.595 19.7068L18.7996 22.0216C19.5463 21.3105 19.9967 20.3117 19.9967 19.2354H16.8ZM16.595 19.7068L14.3904 17.3919C14.8692 16.9359 15.4868 16.7053 16.1 16.7053V19.902V23.0987C17.0845 23.0987 18.0582 22.7277 18.7996 22.0216L16.595 19.7068ZM16.1 19.902V16.7053C16.7132 16.7053 17.3308 16.9359 17.8096 17.3919L15.605 19.7068L13.4004 22.0216C14.1418 22.7277 15.1155 23.0987 16.1 23.0987V19.902ZM15.605 19.7068L17.8096 17.3919C18.2938 17.853 18.5967 18.5126 18.5967 19.2354H15.4H12.2033C12.2033 20.3117 12.6537 21.3105 13.4004 22.0216L15.605 19.7068ZM25.9 17.2354L25.9 14.0387L25.9 17.2354ZM24.4151 17.8211L22.2105 15.5063C21.2012 16.4675 20.6033 17.8054 20.6033 19.2354L23.8 19.2354L26.9967 19.2354C26.9967 19.6045 26.8413 19.9249 26.6197 20.136L24.4151 17.8211ZM23.8 19.2354L20.6033 19.2354C20.6033 20.6653 21.2012 22.0032 22.2105 22.9644L24.4151 20.6496L26.6197 18.3347C26.8413 18.5458 26.9967 18.8663 26.9967 19.2354L23.8 19.2354ZM24.4151 20.6496L22.2105 22.9644C23.2144 23.9205 24.5442 24.432 25.9 24.432V21.2354V18.0387C26.1419 18.0387 26.4034 18.1287 26.6197 18.3347L24.4151 20.6496ZM25.9 21.2354L25.9 24.432C27.2558 24.432 28.5856 23.9205 29.5895 22.9644L27.3849 20.6496L25.1803 18.3347C25.3966 18.1287 25.6581 18.0387 25.9 18.0387L25.9 21.2354ZM27.3849 20.6496L29.5895 22.9644C30.5988 22.0032 31.1967 20.6653 31.1967 19.2354H28H24.8033C24.8033 18.8663 24.9587 18.5458 25.1803 18.3347L27.3849 20.6496ZM28 19.2354H31.1967C31.1967 17.8054 30.5988 16.4675 29.5895 15.5063L27.3849 17.8211L25.1803 20.136C24.9587 19.9249 24.8033 19.6044 24.8033 19.2354H28ZM27.3849 17.8211L29.5895 15.5063C28.5856 14.5502 27.2558 14.0387 25.9 14.0387L25.9 17.2354L25.9 20.432C25.6581 20.432 25.3966 20.342 25.1803 20.136L27.3849 17.8211ZM25.2 19.2354H28.3967C28.3967 19.9581 28.0938 20.6177 27.6096 21.0788L25.405 18.7639L23.2004 16.4491C22.4537 17.1603 22.0033 18.159 22.0033 19.2354H25.2ZM25.405 18.7639L27.6096 21.0788C27.1308 21.5348 26.5132 21.7654 25.9 21.7654V18.5687V15.372C24.9155 15.372 23.9418 15.743 23.2004 16.4491L25.405 18.7639ZM25.9 18.5687V21.7654C25.2868 21.7654 24.6692 21.5348 24.1904 21.0788L26.395 18.7639L28.5996 16.4491C27.8582 15.743 26.8845 15.372 25.9 15.372V18.5687ZM26.395 18.7639L24.1904 21.0788C23.7062 20.6177 23.4033 19.9581 23.4033 19.2354H26.6H29.7967C29.7967 18.159 29.3463 17.1603 28.5996 16.4491L26.395 18.7639ZM26.6 19.2354H23.4033C23.4033 18.5126 23.7062 17.853 24.1904 17.3919L26.395 19.7068L28.5996 22.0216C29.3463 21.3104 29.7967 20.3117 29.7967 19.2354H26.6ZM26.395 19.7068L24.1904 17.3919C24.6692 16.9359 25.2868 16.7053 25.9 16.7053V19.902V23.0987C26.8845 23.0987 27.8582 22.7277 28.5996 22.0216L26.395 19.7068ZM25.9 19.902V16.7053C26.5132 16.7053 27.1308 16.9359 27.6096 17.3919L25.405 19.7068L23.2004 22.0216C23.9418 22.7277 24.9155 23.0987 25.9 23.0987V19.902ZM25.405 19.7068L27.6096 17.3919C28.0938 17.853 28.3967 18.5126 28.3967 19.2354H25.2H22.0033C22.0033 20.3117 22.4537 21.3104 23.2004 22.0216L25.405 19.7068Z"
            fill="white"
            fillOpacity="0.1"
            mask="url(#path-2-inside-1_137_5)"
          />
          <line
            x1="2.49316"
            y1="9.12744"
            x2="7.58972"
            y2="9.12744"
            stroke="black"
            strokeLinecap="round"
          />
          <line
            x1="0.5"
            y1="12.0586"
            x2="7.58965"
            y2="12.0586"
            stroke="black"
            strokeLinecap="round"
          />
          <line
            x1="6.01038"
            y1="15.2241"
            x2="10.169"
            y2="15.2241"
            stroke="black"
            strokeLinecap="round"
          />
          <path d="M4 6L7 6" stroke="black" strokeLinecap="round" />
          <defs>
            <clipPath
              id="bgblur_0_137_5_clip_path"
              transform="translate(7.98341 15.7481)"
            >
              <path d="M9.89355 2.62695L9.94824 2.80176H26.3281C27.2388 2.80176 28.111 3.14961 28.752 3.76465C29.3923 4.3793 29.75 5.21069 29.75 6.0752V14.9854H12.748L8.31445 0.810547L9.24219 0.542969L9.89355 2.62695Z" />
            </clipPath>
            <filter
              id="filter1_i_137_5"
              x={14}
              y="17.2354"
              width={14}
              height={4}
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity={0} result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="9.59004" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend mode="multiply" in2="shape" result="effect1_innerShadow_137_5" />
            </filter>
            <linearGradient
              id="paint0_linear_137_5"
              x1="14.3207"
              y1="19.8983"
              x2="5.6416"
              y2="14.4158"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="0.5" stopColor="#7F7F7F" />
              <stop offset={1} stopColor="#999999" />
            </linearGradient>
          </defs>
        </svg>

      ),
      href: "/brand",
    },
    {
      title: "Contact Support",
      description: "Reach out to support",
      icon: (
        <svg
          width="20"
          height="20"
          className="dark:invert"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12.0002V7.68243C2.9999 7.66321 3.00472 7.64428 3.01401 7.62746C3.02331 7.61063 3.03675 7.59647 3.05307 7.58631C3.06939 7.57616 3.08804 7.57036 3.10724 7.56946C3.12644 7.56856 3.14555 7.5726 3.16275 7.58118L7.9935 9.99693C8.306 10.1532 8.6506 10.2346 9 10.2346C9.3494 10.2346 9.69401 10.1532 10.0065 9.99693L14.8365 7.58193C14.8537 7.5732 14.8728 7.56902 14.892 7.5698C14.9113 7.57058 14.93 7.57628 14.9464 7.58637C14.9628 7.59645 14.9764 7.61058 14.9857 7.6274C14.9951 7.64422 15 7.66317 15 7.68243V12.0002C15 12.398 14.842 12.7795 14.5607 13.0608C14.2794 13.3421 13.8978 13.5002 13.5 13.5002H4.5C4.10218 13.5002 3.72065 13.3421 3.43934 13.0608C3.15804 12.7795 3 12.398 3 12.0002Z"
            fill="black"
          />
          <path
            d="M3 6V6.68025C3.00003 6.70113 3.00587 6.72159 3.01686 6.73934C3.02785 6.75708 3.04357 6.77142 3.06225 6.78075L7.9935 9.24675C8.30599 9.40305 8.6506 9.48442 9 9.48442C9.3494 9.48442 9.69401 9.40305 10.0065 9.24675L14.9377 6.78075C14.9564 6.77142 14.9721 6.75708 14.9831 6.73934C14.9941 6.72159 15 6.70113 15 6.68025V6C15 5.60218 14.842 5.22064 14.5607 4.93934C14.2794 4.65804 13.8978 4.5 13.5 4.5H4.5C4.10218 4.5 3.72064 4.65804 3.43934 4.93934C3.15804 5.22064 3 5.60218 3 6Z"
            fill="black"
            fillOpacity="0.25"
          />
        </svg>
      ),
      href: "/contact/support",
    },
  ],
  updates: [
    {
      title: "Blog",
      description: "Insights and stories",
      icon: (
        <svg
          height="18"
          width="18"
          className="dark:text-white"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="currentColor">
            <path
              d="M12.259,10.858c-.36,0-.755-.023-1.192-.069-.412-.043-.71-.413-.667-.825,.043-.412,.409-.711,.825-.667,1.405,.149,2.158,.017,2.695-.311,.502-.418,.899-.998,1.116-1.831,.139-.612,.228-1.204,.313-1.776,.135-.901,.262-1.751,.551-2.256,.139-.242,.132-.542-.019-.777-.15-.235-.417-.373-.697-.343C3.521,3.023,2.019,15.044,2.005,15.165c-.047,.411,.248,.782,.659,.83,.029,.003,.058,.005,.087,.005,.375,0,.7-.282,.744-.664,.017-.143,.174-1.323,.711-2.88,.81,.363,1.612,.523,1.659,.531,.854,.156,1.643,.234,2.367,.234,1.507,0,2.73-.338,3.65-1.01,.506-.37,.898-.847,1.198-1.406-.254,.031-.522,.052-.822,.052Z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      ),
      href: "/resources/blog",
    },
    {
      title: "Changelog",
      description: "Releases and updates",
      icon: (
        <svg
          width="18"
          height="18"
          className="dark:invert"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.75 10.5H8.25C7.836 10.5 7.5 10.836 7.5 11.25C7.5 11.664 7.836 12 8.25 12H15.75C16.164 12 16.5 11.664 16.5 11.25C16.5 10.836 16.164 10.5 15.75 10.5Z"
            fill="#7F7F7F"
          />
          <path
            d="M15.75 14H8.25C7.836 14 7.5 14.336 7.5 14.75C7.5 15.164 7.836 15.5 8.25 15.5H15.75C16.164 15.5 16.5 15.164 16.5 14.75C16.5 14.336 16.164 14 15.75 14Z"
            fill="black"
          />
          <path
            d="M15.75 3.5H8.25C7.836 3.5 7.5 3.836 7.5 4.25C7.5 4.664 7.836 5 8.25 5H15.75C16.164 5 16.5 4.664 16.5 4.25C16.5 3.836 16.164 3.5 15.75 3.5Z"
            fill="black"
          />
          <path
            d="M15.75 7H8.25C7.836 7 7.5 7.336 7.5 7.75C7.5 8.164 7.836 8.5 8.25 8.5H15.75C16.164 8.5 16.5 8.164 16.5 7.75C16.5 7.336 16.164 7 15.75 7Z"
            fill="black"
          />
          <path
            d="M3.75 6.5C4.99264 6.5 6 5.49264 6 4.25C6 3.00736 4.99264 2 3.75 2C2.50736 2 1.5 3.00736 1.5 4.25C1.5 5.49264 2.50736 6.5 3.75 6.5Z"
            fill="#7F7F7F"
          />
          <path
            d="M3.75 13.5C4.99264 13.5 6 12.4926 6 11.25C6 10.0074 4.99264 9 3.75 9C2.50736 9 1.5 10.0074 1.5 11.25C1.5 12.4926 2.50736 13.5 3.75 13.5Z"
            fill="black"
          />
        </svg>
      ),
      href: "/resources/changelog",
    },
  ],
};

const Logo = () => (
  <div className="flex items-center gap-2">
    <Link href="/">
      <Image
        src="/images/logo.svg"
        alt="Mintlify Logo"
        width={32}
        height={32}
        className="md:w-8 md:h-8 w-6 h-6"
      />
    </Link>
    <span className="font-semibold font-mono text-sm md:text-lg text-black dark:text-white">
      Nextjsshop
    </span>
  </div>
);

// Create a separate ResourcesMenu component
const ResourcesMenu = memo(({ onClose }: { onClose: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-2">
      <button
        className="flex items-center justify-between w-full text-xl font-medium hover:text-green-600 dark:hover:text-green-400"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <p className="font-medium text-xl">Resources</p>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-neutral-500 transition-all dark:text-white/50" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-4 py-4">
              {resourcesMenuItems.explore.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex w-full items-center gap-3"
                  onClick={onClose}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg border dark:border-zinc-700 border-neutral-200 dark:bg-zinc-800">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-medium text-neutral-900 dark:text-white">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
              {resourcesMenuItems.company.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex w-full items-center gap-3"
                  onClick={onClose}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg border dark:border-zinc-700 border-neutral-200 dark:bg-zinc-800">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-medium text-neutral-900 dark:text-white">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
              {resourcesMenuItems.updates.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex w-full items-center gap-3"
                  onClick={onClose}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg border dark:border-zinc-700 border-neutral-200 dark:bg-zinc-800">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-medium text-neutral-900 dark:text-white">
                        {item.title}
                      </h2>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ResourcesMenu.displayName = "ResourcesMenu";

// Update the MobileMenu component to use the new ResourcesMenu component
const MobileMenu = memo(
  ({
    isOpen,
    setIsOpen,
    status,
  }: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    status: string;
  }) => (
    <>
      <div className="flex items-center gap-2">
        {status !== "authenticated" && (
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button
              size="sm"
              variant="fancy"
              className="bg-green-500 text-white hover:bg-green-400 dark:bg-green-600 dark:text-white dark:hover:bg-green-500"
              asChild
            >
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white dark:bg-black md:hidden h-[calc(100vh)]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-8">
                <nav className="space-y-6">
                  <Link
                    href="/components"
                    className="block text-xl font-medium hover:text-green-600 dark:hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Components
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/templates"
                      className="block text-xl font-medium hover:text-green-600 dark:hover:text-green-400"
                      onClick={() => setIsOpen(false)}
                    >
                      Templates
                    </Link>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-600">
                      New
                    </span>
                  </div>

                  <ResourcesMenu onClose={() => setIsOpen(false)} />
                  <Link
                    href="/components/free"
                    className="block text-xl font-medium hover:text-green-600 dark:hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Free Blocks
                  </Link>
                  <Link
                    href="/pricing"
                    className="block text-xl font-medium hover:text-green-600 dark:hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </Link>
                  {status === "authenticated" ? (
                    <>
                      <Link
                        href="/profile"
                        className="block text-xl font-medium hover:text-green-600 dark:hover:text-green-400"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="block text-xl font-medium hover:text-green-600 dark:hover:text-green-400"
                        onClick={() => {
                          setIsOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/signup"
                      className="block text-xl font-medium hover:text-green-600 dark:hover:text-green-400"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign up
                    </Link>
                  )}
                </nav>
              </div>

              {status !== "authenticated" && (
                <div className="p-4 mt-auto border-t">
                  <Link href="/signup" className="block w-full">
                    <Button
                      size="lg"
                      variant="fancy"
                      className="w-full hover:bg-green-500"
                    >
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
);

MobileMenu.displayName = "MobileMenu";

export default function Navbar() {
  const { data: session, status, update: updateSession } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(session?.user?.image || "");
  const { theme, setTheme } = useTheme();

  // Resources mega menu state
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [resourcesTimeout, setResourcesTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<
    string | null
  >(null);

  useEffect(() => {
    if ((session as any)?.error === "RefreshAccessTokenError") {
      signOut();
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.image) {
      setCurrentImage(session.user.image);
    }
  }, [session?.user?.image]);

  useEffect(() => {
    const refreshSession = async () => {
      await fetch("/api/auth/session", { method: "GET" });
    };

    const interval = setInterval(refreshSession, 5000);
    return () => clearInterval(interval);
  }, []);

  // Resources mega menu handlers
  const handleResourcesMouseEnter = () => {
    if (resourcesTimeout) {
      clearTimeout(resourcesTimeout);
      setResourcesTimeout(null);
    }
    setIsResourcesOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsResourcesOpen(false);
    }, 150);
    setResourcesTimeout(timeout);
  };

  const AuthSection = () => {
    if (status === "loading") {
      return (
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-700" />
      );
    }

    if (status === "authenticated" && session?.user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar
              className="h-8 w-8 cursor-pointer"
              key={`${currentImage}-${Date.now()}`}
            >
              <AvatarImage
                src={currentImage || ""}
                alt={session.user.name || "User"}
              />
              <AvatarFallback>
                {session.user.name
                  ? session.user.name[0].toUpperCase()
                  : session.user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-[999] w-60 dark:bg-zinc-900 shadow-inner "
          >
            {/* user email */}
            <DropdownMenuItem
              asChild
              className="hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <Link
                href="/profile"
                className="flex items-center px-2 py-1.5 text-sm font-semibold"
              >
                <Profile />
                {session.user.email}
              </Link>
            </DropdownMenuItem>

            <div className="-mx-1 my-1 h-px bg-muted dark:bg-zinc-700" />

            {/* profile */}
            <DropdownMenuItem
              asChild
              className="hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <Link
                href="/profile"
                className="flex items-center px-2 py-1.5 text-sm"
              >
                <ProfileSettings />
                Profile
              </Link>
            </DropdownMenuItem>

            <div className="-mx-1 my-1 h-px bg-muted dark:bg-zinc-700" />

            {/* theme radio group */}
            <div className="px-3 py-2">
              <p className="mb-1 text-xs text-muted-foreground">Theme</p>

              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value)}
                className="flex flex-col gap-1"
              >
                <DropdownMenuRadioItem
                  value="system"
                  className="text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  System
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="dark"
                  className="text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="light"
                  className="text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700"
                >
                  Light
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </div>

            <div className="-mx-1 my-1 h-px bg-muted dark:bg-zinc-700" />

            {/* logout */}
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="group flex items-center px-2 py-1.5 text-sm"
            >
              <Logout />
              <span className="group-hover:text-red-600 dark:group-hover:text-red-400">
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button
          size="sm"
          variant="fancy"
          className="bg-green-500 text-white hover:bg-green-400 dark:bg-green-600 dark:text-white dark:hover:bg-green-500"
          asChild
        >
          <Link href="/signup">Sign up</Link>
        </Button>
      </>
    );
  };

  return (
    <header className="sticky top-0 border-b bg-transparent backdrop-blur-sm bg-[radial-gradient(transparent_1px,_#fafafa_1px)] dark:bg-[radial-gradient(transparent_1px,_#09090b_1px)] bg-[size:4px_4px] dark:bg-black/50 z-[50] ">
      <div className="container mx-auto max-w-[1200px] px-4 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-6">
          <Link
            className="text-sm hover:text-green-600 dark:hover:text-green-400"
            href="/templates"
          >
            Templates
          </Link>
          <Link
            className="text-sm hover:text-green-600 dark:hover:text-green-400"
            href="/components"
          >
            Components
          </Link>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleResourcesMouseEnter}
            onMouseLeave={handleResourcesMouseLeave}
          >
            <button className="flex items-center text-sm hover:text-green-600 dark:hover:text-green-400">
              Resources
              <ChevronDown className="ml-1 h-4 w-4 group-[.open]: hover:rotate-180" />
            </button>

            {/* Resources Mega Menu */}
            {isResourcesOpen && (
              <div
                className="absolute left-1/2 z-50 mt-1 w-screen max-w-5xl -translate-x-1/2 transform px-2 sm:px-0"
                onMouseEnter={handleResourcesMouseEnter}
                onMouseLeave={handleResourcesMouseLeave}
              >
                <ResourcesMegaMenu />
              </div>
            )}
          </div>

          <Link
            className="text-sm hover:text-green-600 dark:hover:text-green-400"
            href="/components/free"
          >
            Free Blocks
          </Link>
          <Link
            className="text-sm hover:text-green-600 dark:hover:text-green-400"
            href="/pricing"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <AuthSection />
          </div>
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} status={status} />
        </div>
      </div>
    </header>
  );
}