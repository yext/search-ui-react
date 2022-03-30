import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className='flex flex-row'>
      <Link className='text-blue-500 hover:underline p-2' to='/'>Universal Page</Link>
      <div className='border-l-2 border-indigo-400 h-6 mt-2'></div>
      <Link className='text-blue-500 hover:underline p-2' to='./people'>People Page</Link>
      <div className='border-l-2 border-indigo-400 h-6 mt-2'></div>
      <Link className='text-blue-500 hover:underline p-2' to='./products'>Products Page</Link>
    </nav>
  );
}