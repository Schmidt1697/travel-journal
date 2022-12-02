import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavBar = ({ user, setUser }) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  let navigate = useNavigate()

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" }).then((res) => {
      if (res.ok) {
        setUser(null)
        navigate('/login')
      }
    });
  }

  return (
    <div className='nav'>

            <button className='hamburger' onClick={() => {
                setIsNavExpanded(!isNavExpanded)
              }}>
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="white"
                  >
                      <path
                          fillRule="evenodd"
                          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                          clipRule="evenodd"
                      />
                  </svg>
              </button>

           <div className={isNavExpanded ? 'nav-menu expanded' : 'nav-menu'}>
              <NavLink to='/'>Home</NavLink>
              <NavLink to='user/profile'>Profile</NavLink>
              <NavLink to='user/trips'> My Trips</NavLink>
              <NavLink to='trips/publicTrips'>Explore</NavLink>
          </div>

                <span>Hello, {user.name}!</span>

                <button className='logout-btn' onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default NavBar