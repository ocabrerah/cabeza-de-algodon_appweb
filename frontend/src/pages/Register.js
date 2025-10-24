import React from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
  // Registro solo desde el sistema
  return <Navigate to="/login" replace />;
};

export default Register;

