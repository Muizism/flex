import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51N5kZOG2OF5HFP88Q3niYUJKqVZyDW67DqMN07w4bKYT3OoIeLlJVyPCSCAmsLSwNrjNd8ipZZifUviD60KNu0B10076btKkcz');

export default stripePromise;