// import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

function Verify() {

    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId })
        if (response.data.success) {
            navigate("/myorders");
        }
        else {
            navigate("/")
        }
    }

    useEffect(() => {
        verifyPayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="verify">
            <div className="spinner">

            </div>
        </div>
    )
}

export default Verify