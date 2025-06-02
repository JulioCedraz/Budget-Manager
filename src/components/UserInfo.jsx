import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LogoutButton from "./LogoutButton";

function UserInfo() {
  const { usuario } = useContext(AuthContext);

  if (!usuario) return null;

  const isAnonymous = usuario.isAnonymous;

  const getFirstName = () => {
    if (isAnonymous) {
      return "Usuário";
    }

    if (usuario.displayName) {
      return usuario.displayName.split(" ")[0];
    }

    return usuario.email.split("@")[0];
  };

  const getAvatarInitial = () => {
    if (isAnonymous) {
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    }
    return getFirstName().charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center justify-end py-4 space-x-4">
      <div className="flex items-center">
        <span className="mr-2 text-sm font-medium">
          Olá, {isAnonymous ? "Usuário" : getFirstName()}!
        </span>
        {usuario.photoURL && !isAnonymous ? (
          <img
            src={usuario.photoURL}
            alt="Foto de perfil"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div
            className={`w-8 h-8 rounded-full ${
              isAnonymous ? "bg-gray-500" : "bg-blue-600"
            } flex items-center justify-center text-white`}
          >
            {getAvatarInitial()}
          </div>
        )}
      </div>
      <LogoutButton />
    </div>
  );
}

export default UserInfo;