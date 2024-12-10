import React from "react";
import { useDispatch } from "react-redux";
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from "../actions/orderActions";
export default function Checkout({subtotal}) {
    const dispatch=useDispatch()
    function tokenHander(token)
    {
        console.log(token);
        dispatch(placeOrder(token,subtotal))
    }
    return(
        <div>
        <StripeCheckout
        amount={subtotal*100}
        shippingAddress
        token={tokenHander}
        stripeKey='pk_test_51O3EiRSGI8zxTnmbw13W3on94ahL8gPA6rGi3Eb70lfHlawZvnZCsgSVhGoPExE6MEhQp18j37DkCEJk9Xs0uDiU00zsuBTVvO'
        currency='INR'
        >
            <button className='btn'>Pay Now</button>
        </StripeCheckout>
        </div>
    )
}