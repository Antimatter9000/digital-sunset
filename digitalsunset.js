class Overlay {
    constructor() {
        this.fps = 30;
        this.minutes = 10;
        this.seconds = this.minutes * 60;
        this.active = false;

        this.now = new Date();
        this.startTime = new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDay(),
            21,
            30,
            0
        );
    }

    startClock() {
        let clock = setInterval(() => {
            if (this.active) {
                clearInterval(clock);
            } else {
                this.checkTime();
            }
        }, 1000);
    }

    checkTime() {
        if (this.now.getTime() > this.startTime.getTime()) {
            this.create();
            this.opacitize();
            this.active = true;
        }
    }

    create() {
        this.node = document.createElement('div');
        this.node.className = 'digital-sunset';

        this.node.style.width = '100%';
        this.node.style.height = '100%';
        this.node.style.position = 'fixed';
        this.node.style.zIndex = '999999';
        this.node.style.pointerEvents = 'none';
        this.node.style.top = 0;
        this.node.style.left = 0;
        this.node.style.backgroundColor = 'rgba(150,0,0,0)';

        document.body.appendChild(this.node);
    }

    opacitize() {
        let opacity = 0;
        const increment = 1/(this.seconds * this.fps);
        let animation = setInterval(() => {
            this.node.style.backgroundColor = `rgba(150,0,0,${opacity})`;
            opacity = opacity + increment;
            if (opacity >= 1) {
                clearInterval(animation);
            }
        }, 1000/this.fps);
    }
}

const overlay = new Overlay();
overlay.startClock();
