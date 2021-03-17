import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const GoBack = () => {
    const history = useHistory();

    const handleBack = () => {
        history.goBack()
    }

    return (
        <div>
            <button onClick={handleBack}>
                <p>
                    <span className="material-icons md-32">keyboard_arrow_left</span>
                </p>
                <p>Voltar</p>
            </button>
        </div>
    )
}

export default GoBack;