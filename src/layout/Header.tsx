import { Link } from 'react-router-dom'

import Logo from '../assets/logo.png'

const Header = ({ logo }: any) => {
  return (
    <header className="header">
      <div className="flex px-12 py-6">
        <Link to="/" className="logo">
          <img src={logo ? Logo : Logo} alt="Logo" />
        </Link>
      </div>
    </header>
  )
}

export default Header
