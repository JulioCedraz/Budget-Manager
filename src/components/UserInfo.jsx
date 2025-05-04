import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LogoutButton from "./LogoutButton";

function UserInfo() {
  const { usuario } = useContext(AuthContext);

  if (!usuario) return null;

  // Extrair o primeiro nome do displayName ou do email
  const getFirstName = () => {
    if (usuario.displayName) {
      return usuario.displayName.split(' ')[0];
    }
    // Se não tiver displayName, usa a parte antes do @ do email
    return usuario.email.split('@')[0];
  };

  return (
    <div className="flex items-center justify-end space-x-4">
      <div className="flex items-center">
        <span className="mr-2 text-sm font-medium">Olá, {getFirstName()}</span>
        {usuario.photoURL ? (
          <img 
            src={usuario.photoURL} 
            alt="Foto de perfil" 
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            {getFirstName().charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <LogoutButton />
    </div>
  );
}

export default UserInfo;