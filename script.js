class TrafficControlSystem {
    constructor() {
        // Traffic light elements
        this.redLight = document.getElementById('redLight');
        this.yellowLight = document.getElementById('yellowLight');
        this.greenLight = document.getElementById('greenLight');
        
        this.roadRedLight = document.getElementById('roadRedLight');
        this.roadYellowLight = document.getElementById('roadYellowLight');
        this.roadGreenLight = document.getElementById('roadGreenLight');
        
        // Info displays
        this.stateDisplay = document.getElementById('stateDisplay');
        this.timerDisplay = document.getElementById('timerDisplay');
        
        // Vehicles
        this.vehicles = document.querySelectorAll('.vehicle');
        
        // Control state
        this.currentState = 'red';
        this.running = false;
        this.timer = null;
        this.elapsedTime = 0;
        
        // Timing configuration
        this.timings = {
            red: 15,      // 15 seconds
            yellow: 5,    // 5 seconds
            green: 20     // 20 seconds
        };
        
        // State names
        this.stateNames = {
            red: 'STOP',
            yellow: 'READY',
            green: 'GO'
        };
        
        this.initializeControls();
        this.reset();
    }

    initializeControls() {
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('stopBtn').addEventListener('click', () => this.stop());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }

    setSignalState(state) {
        // Remove active class from all lights
        this.redLight.classList.remove('active');
        this.yellowLight.classList.remove('active');
        this.greenLight.classList.remove('active');
        
        this.roadRedLight.classList.remove('active');
        this.roadYellowLight.classList.remove('active');
        this.roadGreenLight.classList.remove('active');

        // Activate the appropriate light
        if (state === 'red') {
            this.redLight.classList.add('active');
            this.roadRedLight.classList.add('active');
        } else if (state === 'yellow') {
            this.yellowLight.classList.add('active');
            this.roadYellowLight.classList.add('active');
        } else if (state === 'green') {
            this.greenLight.classList.add('active');
            this.roadGreenLight.classList.add('active');
        }

        this.currentState = state;
        this.updateVehicles();
        this.updateDisplay();
    }

    updateVehicles() {
        this.vehicles.forEach(vehicle => {
            if (this.currentState === 'red') {
                // Stop vehicles on red light
                vehicle.classList.add('stopped');
            } else {
                // Move vehicles on yellow and green light
                vehicle.classList.remove('stopped');
            }
        });
    }

    updateDisplay() {
        this.stateDisplay.textContent = this.stateNames[this.currentState];
    }

    updateTimer(time) {
        this.timerDisplay.textContent = time + 's';
    }

    start() {
        if (this.running) return;
        
        this.running = true;
        this.elapsedTime = 0;
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;

        this.timer = setInterval(() => {
            this.updateTrafficCycle();
        }, 1000);

        this.updateTrafficCycle();
    }

    stop() {
        this.running = false;
        clearInterval(this.timer);
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    }

    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.setSignalState('red');
        this.updateTimer(this.timings.red);
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    }

    updateTrafficCycle() {
        const totalCycleTime = this.timings.red + this.timings.yellow + this.timings.green;
        const timeInCycle = this.elapsedTime % totalCycleTime;

        let state;
        let timeRemaining;

        // Cycle: Red -> Yellow -> Green
        if (timeInCycle < this.timings.red) {
            state = 'red';
            timeRemaining = this.timings.red - Math.floor(timeInCycle);
        } else if (timeInCycle < this.timings.red + this.timings.yellow) {
            state = 'yellow';
            timeRemaining = this.timings.red + this.timings.yellow - Math.floor(timeInCycle);
        } else {
            state = 'green';
            timeRemaining = totalCycleTime - Math.floor(timeInCycle);
        }

        this.setSignalState(state);
        this.updateTimer(timeRemaining);
        this.elapsedTime++;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const trafficSystem = new TrafficControlSystem();
});
