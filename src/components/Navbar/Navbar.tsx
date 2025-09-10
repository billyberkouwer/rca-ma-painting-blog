"use client";

import { usePathname } from "next/navigation";
import Link from "next/link"
import "./navbar.scss"
export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="navbar__wrapper">
            <ul className="navbar__container">
                <li className="page-title">
                    <Link href="/">
                        {pathname === "/" ?
                            <h1 className="dark-theme">RCA MA Painting Blog 2025 / 2026</h1> :
                            <span className="dark-theme">RCA MA Painting Blog 2025 / 2026</span>
                        }
                    </Link>
                </li>
                <li className="about-link">
                    <Link href="/about" className="dark-theme">About</Link>
                </li>
            </ul>
        </nav>
    )
}