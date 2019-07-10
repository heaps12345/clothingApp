import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearEntireCart } from '../../redux/cart/cart.actions';
import { toast } from 'react-toastify';
import axios from 'axios';

const StripeCheckoutButton = ({ price, clearEntireCart, history }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_hNWz8QIOQ0GjoGoeVyOcLRiC00LZWU15xg';

  const onToken = token => {
    const body = {
      amount: priceForStripe,
      token
    };
    axios
      .post('/payment', body)
      .then(res => {
        toast.success('Payment Succesful!!');
      })
      .catch(error => {
        console.log('Payment error', JSON.parse(error));
        toast.error('There was an issue with your payment. Please make sure you used the provided credit card.');
      });
    // toast.success('Payment Succesful!');
    history.push('/');
    clearEntireCart();
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your Total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default withRouter(
  connect(
    null,
    { clearEntireCart }
  )(StripeCheckoutButton)
);
