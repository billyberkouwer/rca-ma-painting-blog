import Link from "next/link"
import "./navbar.scss"
export default function Navbar() {
    return (
        <nav className="navbar__wrapper">
            <ul className="navbar__container">
                <li className="page-title">
                    <Link href="/">
                        <h1 className="dark-theme">RCA MA Painting 2025 / 2026</h1>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}