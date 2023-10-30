// import the required modules
const express = require('express'); // main server
const bodyParser = require('body-parser'); // parsing POST requests
const fs = require('fs'); // file system access
const hogan = require('hogan.js');

// create an express app using the module
const app = express();

// define the port number we plan on using for our server
const port = 12345;

// tell the app to use the public 'middleware'
// this will allow us to serve public content to the client
// via the 'public' folder
app.use(express.static('public'));

// Use the body-parser middleware to parse the request body for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// load any templates we plan on using with this app
const index_template_string = fs.readFileSync('./templates/index.template', 'utf-8');

// compile the template into a usable form for hogan.js
const index_template = hogan.compile(index_template_string);

// set our our routes

// when the user issues a 'GET' request to '/'
app.get('/', function(request, result) {
  // tell the client what kind of data we plan on sending
  result.type('html');

  // render the hogan template with some variables
  const html = index_template.render({});

  // send the rendered HTML to the client
  result.write(html);

  // signify that we are done sending data
  result.end();
});



// when the user issues a 'GET' request to '/getdata'
app.get('/getdata', async function(request, result) {
    // tell the client what kind of data we plan on sending
    result.type('html');
  
    // send the rendered HTML to the client
    //result.write("yay it works -  you sent me " + request.query.name);

    // make a proxy request to this URL
    const proxyResponse = await fetch(request.query.name);
    const html = await proxyResponse.text();
    console.log(html);
    result.write(html);
  
    // signify that we are done sending data
    result.end();
  });

// tell the app to listen on our port (this starts the server)
app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})