import React from "react";

class App extends React.Component{

    state = {
        second:0,
        minute: 0,
        hour: 0,
        btnDisabled: false,
        interval: "",
        intervalsStorage: [],
    };

    startClicked = ()=>{
        this.setState({
            btnDisabled: true
        })
       let timer = setInterval(() => { 
            const {second, minute, hour} = this.state
            if(second === 59){
                if(minute === 59){
                    this.setState({
                        second: 0,
                        minute: 0,
                        hour: hour + 1
                    })
                }
                else{
                    this.setState({
                        second: 0,
                        minute: minute + 1
                    })
                } 
            }
            else{
                this.setState({
                second: second + 1
                })

            };
            
        }, 1000);
        this.setState({
            interval: timer,
        })
    };

    stopClicked = ()=>{
        clearInterval(this.state.interval);
        this.setState({
            btnDisabled: false,
        })

    };
    intervalClicked = ()=>{

        const {intervalsStorage, hour, minute, second,} = this.state;
        intervalsStorage.push(`${hour}:${minute}:${second}`);
        this.setState({ 
            intervalsStorage: intervalsStorage, 
            
        });

    }

    clearClicked = ()=>{
        this.stopClicked();
        this.setState({
            second:0,
            minute: 0,
            hour: 0,
            intervalsStorage: []
        })
    }


    render(){
        const {second, minute, hour,btnDisabled, intervalsStorage} = this.state
        return(
            <div>
                <div className="timer-container">
                    <h1> <span>Online</span> <span className="text-danger"> Stopwatch</span> </h1>

                    <div className="timer-col">
                        <p className="timer-hours">{hour}</p>
                        <p className="timer-label">Hours</p>
                    </div>
                    
                    <div className="timer-col">
                        <p className="timer-minutes">{minute}</p>
                        <p className="timer-label">Minutes</p>
                    </div>
                    <div className="timer-col">
                        <p className="timer-seconds">{second}</p>
                        <p className="timer-label">Seconds</p>
                    </div>
                </div>
                <div className="timer-container text-center">
                    <div className="timer-btn">
                        <button onClick={this.startClicked} className="btn btn-success" disabled={btnDisabled}>Start</button>
                    </div>
                    <div className="timer-btn">
                        <button onClick={this.stopClicked} className="btn btn-danger">Stop</button>
                    </div>
                    <div className="timer-btn">
                        <button className="btn btn-primary" disabled={!btnDisabled} onClick={this.intervalClicked}>Interval</button>
                    </div>
                    <div className="timer-btn">
                        <button className="btn btn-warning" onClick={this.clearClicked}>Clear</button>
                    </div>
                </div>

                <div className="timer-container-intervals text-center">
                    {intervalsStorage.map( (item, index) => <p>{index + 1} .=&gt; {item}</p> )}
                </div>
            </div>
        )
    }
}
export default App;