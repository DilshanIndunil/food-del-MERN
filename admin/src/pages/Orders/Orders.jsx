import { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

// eslint-disable-next-line react/prop-types
function Orders({ url }) {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list");
            if (response.data.success) {
                setOrders(response.data.data);
                console.log(response.data.data);
            } else {
                toast.error("Error fetching orders");
            }
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            toast.error("Network error");
        }
    };


    const statusHandler = async (event, orderId) => {

        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        })
        if (response.data.success) {
            await fetchAllOrders();
        }
    }



    useEffect(() => {
        fetchAllOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='orders add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt="Parcel Icon" />
                        <div>
                            <p className='order-item-food'>
                                {order.items && order.items.map((item, idx) => {
                                    return idx === order.items.length - 1
                                        ? `${item.name} x ${item.quantity}`
                                        : `${item.name} x ${item.quantity}, `;
                                })}
                            </p>
                            <p className='order-item-name'>{order.address.firstName + "" + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street + ","}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.coutry + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Food Processing">Food Proceessing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Deliverd">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
