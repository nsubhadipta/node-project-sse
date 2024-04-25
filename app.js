const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { 
  
  res.render('index.ejs'); 
}); 

app.get('/stream', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
  
    const intervalId = setInterval(() => {
      const data = {
        timestamp: new Date().toISOString(),
        message: 'Real-time update! (❁´◡`❁) 🤣',
      };
  
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 5000);
  
    req.on('close', () => {
      clearInterval(intervalId);
    });
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
