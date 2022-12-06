class Steering {
    constructor(t) {
        this.drive = false;
        this.reverse = false;
        this.left = false;
        this.right = false;

        switch(t) {
            case "player":
                this.addKeyboardListeners();
                break;
            case "traffic":
                this.drive = true;
                break;

        }

    }

    addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.drive = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        }


        document.onkeyup = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.drive = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        }
    }
}