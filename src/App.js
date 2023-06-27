import React from 'react';
import './App.sass';

function App() {
  var moment = require('moment'); // require
  moment.locale();
  const date = moment().format('dddd - LL');
  return (
    <div className="App">
      <header>
        <p className='date'>{date}</p>
      </header>
      <main>
        <h1>Mine opgaver</h1>
      </main>
    </div>
  );
};

export default App;
