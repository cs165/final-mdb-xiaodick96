class MenuView {
    constructor() {
        this.createButton = document.querySelector("#create");
        this.loadButton = document.querySelector("#load");
        this.keyContainer = document.querySelector("#key");
        this.submitButton = document.querySelector("#submit");
    
        this._onCreate = this._onCreate.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._onToggle = this._onToggle.bind(this);

        this.createButton.addEventListener('click', this._onCreate);
        this.loadButton.addEventListener('click', this._onToggle);
        this.submitButton.addEventListener('click', this._onSubmit);
    }

    async _onCreate() {
        const response = await fetch('/create', { method: 'POST'} );
        const result = await response.json();
        if(result) {
            window.location.href = `/id/${result.id}`;
        }
    }

    _onSubmit() {
        const key = this.keyContainer.value;
        window.location.href = `/id/${key}`;
    }

    _onToggle() {
        this.keyContainer.classList.toggle('inactive');
        this.submitButton.classList.toggle('inactive');
    }
}