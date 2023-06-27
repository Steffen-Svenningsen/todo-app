import React from 'react';
import './App.sass';
import moment from 'moment';
import 'moment/locale/da';

function App() {
  moment.locale();
  const date = moment().format('dddd [d.] D MMMM');
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
