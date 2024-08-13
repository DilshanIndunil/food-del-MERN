import Stripe from 'stripe';

// Replace with your actual Stripe test key
const stripe = new Stripe('sk_test_sk_test_51PmJrFRscdqfHtvmoKdR99M9d6ak0hiAiQz6OFvXjLOOSckjECMaIVcDmRoIeNfOkUhQ8Nq5MTxvKG9YqkttbyJ900DeevF830');

async function testStripeKey() {
    try {
        // List products to verify API key
        const products = await stripe.products.list();
        console.log('Stripe API works! Products:', products);
    } catch (error) {
        console.error('Error testing Stripe API key:', error);
    }
}

testStripeKey();
