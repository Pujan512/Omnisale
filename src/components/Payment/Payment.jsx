import React, { useState } from 'react';

const Payment = ({price = 1, btnName = "Make Payment", order = "cart", orderId = 1234}) => {
    const [paymentUrl, setPaymentUrl] = useState('');

    const handlePayment = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL_PAYMENT+ "initiate-payment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                }, body: JSON.stringify({
                    amount: `${price * 100}`,
                    orderId: orderId,
                    orderName: order,
                })
            })

            const result = await response.json();
            console.log(result)
            if (result.payment_url) 
                setPaymentUrl(result.payment_url);
        } catch (error) {
            console.log('Payment error:', error);
        }
    };


    return (
        <div className="flex justify-center bg-purple-800 rounded-md text-white cursor-pointer">
            {paymentUrl ?
             <a className='p-2' href={paymentUrl}>Pay with Khalti</a> :
            <button className="w-full rounded-md p-2 cursor-pointer bg-red-500" onClick={handlePayment}>{btnName}</button>
        }
        </div>
    );
};

export default Payment;
