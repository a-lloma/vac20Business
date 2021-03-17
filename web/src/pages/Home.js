import React, { useState, useEffect } from 'react';
import Rodape from '../components/Rodape'
import Menu from '../components/Menu'
import Card from '../components/Card'
import { Link } from 'react-router-dom';

function Home() {

    const handleLogout = () => {
        localStorage.removeItem('@token')
        localStorage.removeItem('@cnpj')
    }


    return (
        <div className="dark">
            <Menu />
            <h1>home</h1>
            <Card /> #selo   <Link to="/selo" className="">selo</Link>
            <Card /> validar cliente <Link to="/cliente-status" className="">cliente checar</Link>
            <Card /> #checar histórico <Link to="/historico" className="">consulta historico</Link>

            <div className="flex-end">

                <Link to="" className="logout" onClick={handleLogout}>
                    <p>
                        <span className="material-icons md-32">logout</span>
                    </p>
                    <p>Sair</p>
                </Link>
            </div>

            <footer>
                <Rodape />
            </footer>
        </div>
    )
}

export default Home;