
import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import api from '../../services/api'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import '../../styles/pages/cliente.css';
import logo from '../../assets/logo/logopng2.png'
import Grid from '@material-ui/core/Grid';

function ValidaCliente() {

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    function TextMaskCustom(props) {
        const { inputRef, ...other } = props;

        return (
            <MaskedInput
                {...other}
                ref={(ref) => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
                showMask
            />
        );
    }

    const history = useHistory();

    const handleBack = () => {
        history.goBack()
    }

    const [token, setToken] = useState(localStorage.getItem('@token'));
    const cnpj = localStorage.getItem('@cnpj');
    const [listClient, setListClient] = useState()

    var handleClose = () => {
        if (error !== '' || error !== undefined) {
            setError('')
        }
        setOpen(false);
    };

    const [cpf, setCpf] = useState()
    const [statusCliente, setStatusCliente] = useState()
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [statusVisit, setStatusVisit] = useState()
    const [hideNextStep, setHideNextStep] = useState(false)
    const [firstMessage, setFirstMessage] = useState(false)

    const handleCpf = (event) => {
        setCpf(parseInt(event.target.value))
    }

    const handleLogout = () => {
        localStorage.removeItem('@token')
        localStorage.removeItem('@cnpj')
    }

    const clean = () => {
        setCpf('');
        setHideNextStep(false);
    }

    const verifyCPF = () => {
        // chama api
        axios({
            method: 'get',
            url: `https://vac-20.herokuapp.com/business/validate/${cpf}`,
            headers: {
                authorization: token
            }
        }).then(response => {

            console.log('api', response.data)
            setStatusCliente(response.data.message)
           
            setHideNextStep(response)
            // setHideNextStep(true)

        }).catch((error) => {
            console.log(error)
            if (error.statusCode !== "200") {
                setMessageError(`Não foi possível validar o usuário`)
                setOpen(true)
                setHideNextStep(false)
            }
        })
    }
    const handleVisit = () => {
        // chama api
        console.log(cnpj[0])
        axios({
            method: 'post',
            url: `https://vac-20.herokuapp.com/business/visit`,
            data: { cnpj: cnpj[0], cpf: cpf?.toString() },
            headers: {
                authorization: token
            }
        }).then(response => {

            setStatusVisit(response.data.message)

        }).catch((error) => {
            console.log(error)
            if (error.statusCode !== "200") {
                setMessageError(`Não foi possível registrar essa visita`)
                setOpen(true)
            }
        })


    }


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

    const handleCloseFirstMessage = () => {
        setFirstMessage(false)
    }

    useEffect(() => {
        verifyList();
        setFirstMessage(true);
    }, [])
    return (

        <div id="cliente">
            <Grid >

                <div className="dark" >
                    <Grid
                        className="header"
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >

                        <Grid item xs={12} sm={3} >
                            <img src={logo} alt="img" width="25%" />
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <h2 className="pagina"> eVac Empresarial</h2>
                        </Grid>
                        <Grid item xs={12} sm={3}  >
                            <Grid container justify="flex-end">
                                <Link to="" className="btn_icon" onClick={handleLogout}>
                                    <p>
                                        <span className="material-icons md-32">logout</span>
                                    </p>
                                    <p>Sair</p>
                                </Link>

                            </Grid>
                        </Grid>
                    </Grid>

                    <div className="titulopagina">
                        <h1 >Home</h1>
                    </div>

                    {/* <div className="flex-end">
                        <Link to="" className="btn_icon" onClick={handleBack}>
                            <p>
                                <span className="material-icons md-32">keyboard_arrow_left</span>
                            </p>
                            <p>Voltar</p>
                        </Link>
                    </div>



                    <div className="flex-end">

                        <Link to="" className="btn_icon" onClick={handleLogout}>
                            <p>
                                <span className="material-icons md-32">logout</span>
                            </p>
                            <p>Sair</p>
                        </Link>
                    </div> */}




                    <Grid
                        className="contentVisitas"
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >
                        <div id="visitas">
                            <h3>
                                Visitas até o momento
                        </h3>
                            <p> Quantidade de Contamidados:
                {listClient?.contaminated}
                            </p>
                            <p>
                                Quantidade de visitas:
            {listClient?.visitors}
                            </p>
                        </div>

                    </Grid>

                    <Grid
                        className="contentValida"
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >


                        <Grid
                            justify="space-around"
                            alignItems="center"
                        >

                            <div id="verifica">
                                <h3>
                                    (1) Verificar se o cliente não tem covid
            </h3>
                                <p> Informe o CPF do cliente</p>
                                <p>
                                    <input placeholder="cpf" onChange={handleCpf} value={cpf}/>
                                    <button onClick={verifyCPF} className="button-cliente"> Validar Cliente</button>
                                    <button onClick={clean} className="button-limpa"> Limpar</button>
                                </p>
                                <h3>
                                    <p> Status do cliente: </p> {statusCliente}

                                </h3>

                            </div>
                        </Grid>


                        <Grid
                            justify="space-around"
                            alignItems="center"
                        >

                            <div id="registra">
                                <h3>
                                    (2) Registrar a visita
                                </h3>
                                <p> Para executar esse passo, é necessário validar o cliente previamente.</p>
                                {hideNextStep && (
                                    <div>
                                        <button onClick={handleVisit} className="button-cliente"> Registrar a visita</button>

                                        <h3>
                                            <p> Status do cliente: </p> {statusVisit}
                                        </h3>
                                    </div>
                                )}

                            </div>
                        </Grid>
                    </Grid>


                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error">
                            {messageError}
                        </Alert>
                    </Snackbar>
                    <Snackbar open={firstMessage} autoHideDuration={4000} onClose={handleCloseFirstMessage}>
                        <Alert onClose={handleCloseFirstMessage} severity="info">
                            <div>
                                Está é uma versão gratuita e para testes, para ter acessos a mais informações
                                contrate a versão premiun e entre em contato com a gente.
                    </div>
                        </Alert>
                    </Snackbar>

                </div>
            </Grid>
        </div>


    )
}
export default ValidaCliente;