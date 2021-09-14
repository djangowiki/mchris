import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch action save shipping address
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              id='Paypal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
