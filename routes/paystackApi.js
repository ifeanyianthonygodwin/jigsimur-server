const router = require('express').Router()
require('dotenv').config();
const https = require('https');

// Route to initialize payment
// router.post('/api/paystack/pay', async (req, res) => {
//     try{
//         const {email, amount} = req.body
//         const response = await paystack.transaction.initialize({
//             email, amount: amount * 100 
//             // Paystack API expects amount in kobo ( 1 NGN = 100 kobo)
//         })
//         res.json(response.data)
//     }catch(error){
//         console.log("Error initializing payment:", error)
//         res.status(500).json({error: "Failed to intialize payment"})
//     }
// })

// // Route to verify payment
// router.get('api/paystack/verify/:reference', async (req, res) => {
//     try{
//         const {reference} = req.params
//         const response = await paystack.transaction.verify(reference)
//         res.json(response.data)
//     }catch(error){
//         console.log("Error verifying payment:", error)
//         res.status(500).json({
//             error: "Failed to verify payment"
//         })
//     }
// })

router.get("/acceptpayment/", async(req, res) => {
    try {
      // request body from the clients
      const email = "feco@gmail.com";
      const amount = "3000";
      // params
      const params = JSON.stringify({
        "email": email,
        "amount": amount * 100
      })
      // options
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
          Authorization: "Bearer sk_test_b40530b8a9806975cdf2ccbc78ada7079d0484fa", // where you place your secret key copied from your dashboard
          'Content-Type': 'application/json'
        }
      }
      // client request to paystack API
      const clientReq = https.request(options, apiRes => {
        let data = ''
        apiRes.on('data', (chunk) => {
          data += chunk
        });
        apiRes.on('end', () => {
          console.log(JSON.parse(data));
          return res.status(200).json(data);
        })
      }).on('error', error => {
        console.error(error)
      })
      clientReq.write(params)
      clientReq.end()
      
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
)



module.exports = router