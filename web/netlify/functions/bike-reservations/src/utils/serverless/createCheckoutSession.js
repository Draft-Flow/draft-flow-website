const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async () => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "gbp",
          unit_amount: 500,
          product_data: {
            name: "Course",
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://draftandflow.com/success.html`,
    cancel_url: `https://draftandflow.com/cancel.html`,
    automatic_tax: {enabled: true},
  })

  console.log({session})

  return session
}

module.exports = createCheckoutSession
