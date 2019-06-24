class DiaryView {
    constructor(id) {
        this.mainContainer = document.querySelector("#main");
        this.dateContainer = document.querySelector("#date");
        this.promptContainer = document.querySelector("#prompt");
        this.diaryContainer = document.querySelector("#diary");
        this.editContainer = document.querySelector("#edit");
        this.prevButton = document.querySelector("#prev");
        this.nextButton = document.querySelector("#next");
        this.homeButton = document.querySelector("#home");
        this.id = id;
        this.today = new Date();
        this.options = { month: 'long', day: 'numeric' };

        this._updateView = this._updateView.bind(this);
        this._toPrev = this._toPrev.bind(this);
        this._toNext = this._toNext.bind(this);
        this._toHome = this._toHome.bind(this);
        this._onEdit = this._onEdit.bind(this);
        this._editMode = this._editMode.bind(this);
        this._onSave = this._onSave.bind(this);
        this._saveMode = this._saveMode.bind(this);

        this.prevButton.addEventListener('click', this._toPrev);
        this.nextButton.addEventListener('click', this._toNext);
        this.homeButton.addEventListener('click', this._toHome);
        this.mainContainer.addEventListener('click', this._onEdit);

        this._updateView();
    }

    async _updateView() {
        const index = Math.floor(Math.random() * PROMPTS.length);
        this.dateContainer.textContent = this.today.toLocaleDateString('en-US', this.options);
        this.promptContainer.textContent = PROMPTS[index];

        const response = await fetch(`/id/${this.id}/${this.today.toLocaleDateString()}`);
        const result =  await response.json();
        
        if(result) {
            this.diaryContainer.textContent = result.content;
        }else {
            this.diaryContainer.textContent = '';
        }
    }

    _editMode() {
        this.mainContainer.removeEventListener('click', this._onEdit);
        this.homeButton.removeEventListener('click', this._toHome);
        this.dateContainer.classList.add('inactive');
        this.diaryContainer.classList.add('inactive');
        this.editContainer.classList.remove('inactive');
        this.prevButton.classList.add('inactive');
        this.nextButton.classList.add('inactive');
        this.homeButton.classList.add('save');
        this.homeButton.textContent = '';
        this.mainContainer.addEventListener('click', this._onSave);
        this.homeButton.addEventListener('click', this._onSave);
    }

    _saveMode() {
        this.dateContainer.classList.remove('inactive');
        this.diaryContainer.classList.remove('inactive');
        this.editContainer.classList.add('inactive');
        this.prevButton.classList.remove('inactive');
        this.nextButton.classList.remove('inactive');
        this.homeButton.classList.remove('save');
        this.homeButton.textContent = 'HOME';
        this.mainContainer.addEventListener('click', this._onEdit);
        this.homeButton.addEventListener('click', this._toHome);
    }

    _onEdit() {
        this._editMode();
        this.editContainer.value = this.diaryContainer.textContent;
    }

    async _onSave() {
        this.mainContainer.removeEventListener('click', this._onSave);
        this.homeButton.removeEventListener('click', this._onSave);
        
        const data = {
            id: this.id,
            date: this.today.toLocaleDateString(),
            content: this.editContainer.value
        };
        const fetchOptions = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch('/save', fetchOptions);
        this._saveMode();
        this._updateView();
    }

    _toPrev() {
        this.today.setDate(this.today.getDate() - 1);
        this._updateView();
    }

    _toNext() {
        this.today.setDate(this.today.getDate() + 1);
        this._updateView();
    }

    _toHome() {
        this.today = new Date();
        this._updateView();
    }
}