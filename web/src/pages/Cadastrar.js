import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import '../styles/pages/cadastrar.css';
import clients from '../assets/images/clients.svg'
import logo from '../assets/logo/logopng.png'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { space } from 'styled-system'
// import { useForm } from "react-hook-form";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '18ch',
            },
        },
    }),
);

function Cadastrar() {
    const classes = useStyles();

    const [name, setName] = useState()
    const [cnpj, setCnpj] = useState()
    const [password, setPassword] = useState()
    const [description, setDescription] = useState()
    const [addressStreet, setAddressStreet] = useState()
    const [addressNumber, setAddressNumber] = useState()
    const [addressComplement, setAddressComplement] = useState()
    const [addressCity, setAddressCity] = useState()
    const [addressState, setAddressState] = useState()
    const [addressCountry, setAddressCountry] = useState()
    const [addressCode, setAddressCode] = useState()

    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [openS, setOpenS] = useState(false);
    const [error, setError] = useState('');
    const [messageError, setMessageError] = useState('');

    const onSubmit = (data) => console.log(data);

    var checkImput = (value) => {
        if (value !== undefined && value !== '') return true
    }

    var handleClose = () => {
        if (error !== '' || error !== undefined) {
            setError('')
        }
        setOpen(false);
    };
    var handleCloseS = () => {
        setOpenS(false);
        setCnpj("")
        setPassword("")
        setDescription("")
        setAddressStreet("")
        setAddressNumber("")
        setAddressComplement("")
        setAddressCity("")
        setAddressState("")
        setAddressCountry("")
        setAddressCode("")
        history.push('');
    };

    var handleSubmit = () => {
        const mock = {
            "cnpj": cnpj,
            "password": password,
            "name": name,
            "description": description,
            "addressStreet": addressStreet,
            "addressNumber": addressNumber,
            "addressComplement": addressComplement,
            "addressCity": addressCity,
            "addressState": addressState,
            "addressCountry": addressCountry,
            "addressCode": addressCode

        }

        api.post('/business', mock).then(response => {

            if (response.status === 200 && response.message !== '') {
                console.log(response)
                setOpenS(true);
            } else {
                setOpen(true);
                setMessageError(response.data.message)
            }
        })
    }


    const DFom = styled.section`
        padding: 0.5em;
    `;
    const DivImg = styled.section`
        padding-top: 3.5em;
    `;
    // const Wrapper = styled.section`
    //     padding: 4em;
    // `;
    const DivBtn = styled.section`
        padding-top: 1em;
        display: flex;
    `;

    var handleChangeName = (event) => {
        setName(event.target.value)
    }

    var handleChangeCnpj = (event) => {
        setCnpj(event.target.value)
    }

    var handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    var handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    var handleChangeAddressStreet = (event) => {
        setAddressStreet(event.target.value)
    }

    var handleChangeAddressNumber = (event) => {
        setAddressNumber(event.target.value)
    }

    var handleChangeAddressComplement = (event) => {
        setAddressComplement(event.target.value)
    }

    var handleChangeAddressCity = (event) => {
        setAddressCity(event.target.value)
    }

    var handleChangeAddressState = (event) => {
        setAddressState(event.target.value)
    }

    var handleChangeAddressCountry = (event) => {
        setAddressCountry(event.target.value)
    }

    var handleChangeAddressCode = (event) => {
        setAddressCode(event.target.value)
    }

    const Button = styled.section`
        background: #fff;
        border-radius: 20px;
        height: 40px;
        width: 260px;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    return (
        <div id="cadastrar-page">
            <div >
                <div className="container">
                    <div className="content">
                        <DivImg>

                            <img src={clients} alt="img" width="80%" />
                        </DivImg>

                    </div>
                    <div className="content">
                        <div class="wrapper">
                            <img src={logo} alt="img" width="25%" />
                            <p>Complete o seu cadastro e faça parte dos nossos clientes.</p>

                            <form noValidate autoComplete="off">
                                <div className="content-form">
                                    <div className="coluna">
                                        <div className="iForm"><TextField id="nameBusiness" label="Nome" onChange={handleChangeName} /></div>
                                        <div className="iForm"><TextField id="cnpj" label="CNPJ" onChange={handleChangeCnpj} /></div>
                                        <div className="iForm"><TextField id="description" label="Descrição" onChange={handleChangeDescription} /></div>
                                        <div className="iForm"><TextField id="addressCode" label="Cep" onChange={handleChangeAddressCode} /></div>
                                        <div className="iForm" ><TextField id="addressStreet" label="Rua" onChange={handleChangeAddressStreet} /></div>
                                        <div className="iForm"><TextField id="addressNumber" label="Número" onChange={handleChangeAddressNumber} /></div>
                                    </div>
                                    <div className="coluna">
                                        <div className="iForm"><TextField id="addressComplement" label="Detalhes endereço" onChange={handleChangeAddressComplement} /></div>
                                        <div className="iForm"><TextField id="addressCity" label="Cidade" onChange={handleChangeAddressCity} /></div>
                                        <div className="iForm"><TextField id="addressState" label="Estado" onChange={handleChangeAddressState} /></div>
                                        <div className="iForm"><TextField id="addressCountry" label="País" onChange={handleChangeAddressCountry} /></div>
                                        <div className="iForm"><TextField id="password" type="password" label="Senha" onChange={handleChangePassword} /></div>
                                        {/* <div className="iForm"><TextField id="confirm" label="Confirmar a senha" onChange={handleChangePassword}/></div> */}
                                    </div>
                                </div>
                            </form>
                            <div className="divbutton">
                                <Button><Link to="" className="">Voltar</Link></Button>
                                <button className="button-cadastro" onClick={handleSubmit}>Enviar Dados</button>



                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {messageError}
                </Alert>
            </Snackbar>
            <Snackbar open={openS} autoHideDuration={6000} onClose={handleCloseS}>
                <Alert onClose={handleCloseS} severity="success">
                    Acesso criado com sucesso!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Cadastrar;