import { NavLink } from "react-router-dom"

export default function NavBar() {
    return(
        <nav>           
            <ul className="flex space-x-10">
                <li>
                    <NavLink to="/"
                    className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/discussions"
                    className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}
                    >
                        Discussions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/members"
                    className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}
                    >
                        Members
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/blogs"
                    className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700'}
                    >
                        Blogs
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}