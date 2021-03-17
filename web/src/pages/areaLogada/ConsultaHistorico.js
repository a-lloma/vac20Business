
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'

function ConsultaHistorico() {
    const history = useHistory();
    const [token, setToken] = useState(localStorage.getItem('@token'));

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleBack = () => {
        history.goBack()
    }

    const handleLogout = () => {
        localStorage.removeItem('@token')
        localStorage.removeItem('@cnpj')
    }

    const cnpj = localStorage.getItem('@cnpj');
    const [listClient, setListClient] = useState()

    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [messageError, setMessageError] = useState('');

    var handleClose = () => {
        if (error !== '' || error !== undefined) {
            setError('')
        }
        setOpen(false);
    };

    const verifyList = () => {
        // chama api
        axios({
            method: 'get',
            url: `https://vac-20.herokuapp.com/business/visitors/${cnpj}`,
            headers: {
                authorization: token
            }
        }).then(response => {

            console.log('api', response.data)
            setListClient(response.data.message)
            
        }).catch((error) => {
            console.log(error)
            if (error.statusCode !== "200") {
                setMessageError(`Não foi possível trazer a list`)
                setOpen(true)
            }
        })
    }

    return(
        <div className="dark">
            ConsultaHistorico

            {/* <div className="flex-end">
                <button onClick={handleBack}>
                    <p>
                        <span className="material-icons md-32">keyboard_arrow_left</span>
                    </p>
                    <p>Voltar</p>
                </button>
            </div> */}
            <div className="flex-end">
                <button onClick={handleLogout}>
                <p>
                        <span className="material-icons md-32">logout</span>
                    </p>
                    <p>Sair</p>
                </button>
            </div>

            <h3> Ver lista de visitações </h3>
            <button onClick={verifyList}>Carregar Lista</button>
            <p> Quantidade de Contamidados:
                {listClient?.contaminated} 
                </p> 
                <p>
                Quantidade de visitas:
            {listClient?.visitors}
                </p>

            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {messageError}
                </Alert>
            </Snackbar>

        </div>
    )
}
export default ConsultaHistorico;