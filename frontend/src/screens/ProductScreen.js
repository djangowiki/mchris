import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
// import products from '../products';
// import axios from 'axios';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import Meta from '../components/Meta';

const ProductScreen = (props) => {
  // const [product, setProduct] = useState({});
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const res = await axios.get(`/api/products/${props.match.params.id}`);
  //     setProduct(res.data);
  //   };
  //   fetchProduct();
  // }, [props.match.params.id]);
  // const product = products.find((p) => p._id === props.match.params.id);

  // Working on Add to Cart.
  const [qty, setQty] = useState(1);

  // Working on reviews
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Create dispatch.
  const dispatch = useDispatch();

  // Getting the product from state using useSelector
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  // Getting the product review create from the state.
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { error: errorProductReview, success: successProductReview } =
    productReviewCreate;

  // Get User info from the state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(props.match.params.id));
  }, [dispatch, props, successProductReview]);

  // const product = {};

  // Add to cart handler.
  const addToCartHandler = () => {
    // http://localhost:3000/cart/613206417662cbf7aac46ec4?qty=3
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  // Leave a review handler
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(rating);
    dispatch(
      createProductReview(props.match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:{product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}>
                            {/* [0,1,2,3,4] */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}>
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Leave a Review
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>login</Link> to leave a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
