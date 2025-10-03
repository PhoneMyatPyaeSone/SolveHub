import { Link } from 'react-router-dom';
import NavBar from './NavBar';

export default function Header(){
    return(
        <header className="bg-white border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center p-4 gap-3">
                
                {/* Logo */}
                <div className="text-xl font-bold text-gray-800">SolveHub</div>
                
                {/* NavBar */}
                <NavBar />

                {/* Sign In / Register buttons */}
                <div className="flex space-x-3">
                <Link 
                    to="/login" 
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
                >
                    Sign In
                </Link>
                <Link 
                    to="/register" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Register
                </Link>
                </div>

            </div>
        </header>

    )
}