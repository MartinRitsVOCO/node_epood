import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Products</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  )
}

export default Header