import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav>
        <Link 
            to="/admin/perfil"
            className="font-bold uppercase text-gray-500 mr-5"
            children="Perfil"
        />
        <Link 
            to="/admin/cambiar-password"
            className="font-bold uppercase text-gray-500"
            children="Cambiar Contraseña"
        />
    </nav>
  )
}

export default AdminNav