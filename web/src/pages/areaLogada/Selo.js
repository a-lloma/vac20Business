
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function Selo() {
    const history = useHistory();

    const handleBack = () => {
        history.goBack()
    }
    
    return(
        <div className="dark">
            Selo

            <div className="flex-end">
                <button onClick={handleBack}>
                    <p>
                        <span className="material-icons md-32">keyboard_arrow_left</span>
                    </p>
                    <p>Voltar</p>
                </button>
            </div>

        </div>

    )
}
export default Selo;