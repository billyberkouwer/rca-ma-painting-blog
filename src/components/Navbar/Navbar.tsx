import Link from "next/link"
import "./navbar.scss"
export default function Navbar() {
    return (
        <nav className="navbar__wrapper">
            <ul className="navbar__container">
                <li className="page-title">
                    <Link href="/">
                        <div className="dark-theme">RCA MA Painting Blog</div>
                    </Link>
                    <Link href="https://billyberkouwer.dev">
                        <div className="dark-theme">Run by Billy Myles-Berkouwer</div>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}