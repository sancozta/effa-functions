const functions = require("firebase-functions");

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    const session = await stripe.checkout.session.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: "http://localhost:5500/sucess",
        cancel_url: "http:localhost:5500/cancel",
        line_items: [
            {
                quantity: 1,
                price_data: {

                    currency: "usd",
                    unit_amount: (100) * 100, //10000 = 100 USD
                    product_data: {
                        name: "New camera",
                    },
                },
            },
        ],
    });

    return {
        id: session.id,
    };
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// ####################

// const checkoutButton = document.getElementById('checkout-button');
// const createStripeCheckout = firebase.functions().httpsCallable('createStripeCheckout');
// const stripe = Stripe('pk_test_blablabla');
// checkoutButton.addEventListener('click', () => {
//     createStripeCheckout().then(response => {
//         const sessionId = response.data.id;
//         stripe.redirectToCheckout({ sessionId: sessionId})
//     })
// });
