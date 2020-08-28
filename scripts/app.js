import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class App extends React.Component {
  
  formatAMPM(date) {
    date = new Date(date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
  constructor(props) {
    super(props);
    var date_aus = new Date(); date_aus.setHours(4); date_aus.setMinutes(0);
    var date_usW = new Date(); date_usW.setHours(11); date_usW.setMinutes(0);
    var date_usE = new Date(); date_usE.setHours(14); date_usE.setMinutes(0);
    var date_eng = new Date();date_eng.setHours(20);date_eng.setMinutes(0);
    this.state = {
      time_in_aus: date_aus,
      time_in_us_west: date_usW,
      time_in_us_east: date_usE,
      time_in_england: date_eng
    }
    this.onDrag = this.onDrag.bind(this);
  }
  
  onDrag(e, draggable) {
    // Drag left = back in time
    let percentageIn = -draggable.x / window.outerWidth;
    let hourChunk = Math.round(percentageIn * 24);
    // Re-convert into a Date object
    let new_aus_time = new Date(this.state.time_in_aus);
    let new_us_west_time = new Date(this.state.time_in_us_west);
    let new_us_east_time = new Date(this.state.time_in_us_east);
	let new_england_time = new Date(this.state.time_in_england);
        
    this.setState(prevState => ({
      time_in_aus: new_aus_time.setHours(hourChunk + 4),
      time_in_us_west: new_us_west_time.setHours(hourChunk + 11),
      time_in_us_east: new_us_east_time.setHours(hourChunk + 14),
      time_in_england: new_england_time.setHours(hourChunk + 20)
    }));
  }

  render() {
    
    const dragHandlers = {
      onDrag: this.onDrag
  	}
        
    return (
      <div>
        
        <div className="timepole">
          <div className="time-readout time-readout-aus">
            {this.formatAMPM(this.state.time_in_aus)}
          </div>
          <div className="time-readout time-readout-us-west">
            {this.formatAMPM(this.state.time_in_us_west)}
          </div>
          <div className="time-readout time-readout-us-east">
            {this.formatAMPM(this.state.time_in_us_east)}
          </div>
          <div className="time-readout time-readout-england">
            {this.formatAMPM(this.state.time_in_england)}
          </div>
        </div>

        <Draggable axis="x" {...dragHandlers}>
          <div className="all-timezones">
            <div className="timezone timezone-aus">
              Australia
            </div>
            <div className="timezone timezone-us-west">
              U.S. West
            </div>
            <div className="timezone timezone-us-east">
              U.S. East
            </div>
            <div className="timezone timezone-england">
              England
            </div>
          </div>
        </Draggable>

      </div>
    );
  }
  
}

ReactDOM.render(<App />, document.getElementById('container'));
