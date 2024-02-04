var express = require('express');
var router = express.Router();
var axios = require('axios');
var headers = require('../lib/headers');
var generateLog = require('../lib/logs');

router.post('/', function(req, res, next) {
  var {product} = req.body;

  if (!product) {
    res.send({error: '\'product\' is required'});
    return;
  }

  axios.post(
    process.env.PPLX_URL,
    {
      model: 'mistral-7b-instruct',
      messages: [
        {
          role: 'user', 
          content: `Write a persuasive post using the AIDA copywriting framework to promote our new product/service: ${product}. Craft the post to grab the reader’s attention, generate interest, create desire, and encourage them to take action. Structure of the post could ideally be as follows: 1. Start with an attention-grabbing headline or opening statement that immediately captures the reader’s interest and entices them to keep reading. 2. Provide compelling information about the product/service that highlights its unique features, benefits, or solutions it offers. Focus on how it can positively impact the reader’s life or address their pain points. 3. Evoke a sense of desire by painting a vivid picture of the benefits and outcomes the reader can experience by using the product/service. Showcase testimonials, success stories, or case studies to enhance credibility. 4. Clearly instruct the reader on the next steps they should take to engage with the product/service. This can include signing up for a free trial, making a purchase, scheduling a demo, or any other desired action.`
        }
      ]
    },
    {headers}
  )
    .then(({ data }) => {
      console.log(generateLog('Success', 'Text Generator (Perplexity)', product));
      res.send(data);
    })
    .catch((error) => {
      console.log(generateLog('Error', 'Text Generator (Perplexity)', product));
      res.send(error);
    })
});

module.exports = router;
