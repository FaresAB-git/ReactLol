import React from 'react'
import NavBar from './componentsAcceuil/NavBar';
import Component1 from './componentsAcceuil/component1';
import Historique from './componentsAcceuil/historique';

export default function Acceuil() {
  return (
    <div>
        <NavBar/>
        <Component1/>
        <Historique/>
    </div>

  )
}

