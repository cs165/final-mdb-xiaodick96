
class Menu {
  constructor() {

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    
    this.show();
  }
    show(){
        const createbtnElement = document.querySelector('#createbtn');
        createbtnElement.addEventListener('click',this.hide);
        console.log('show Menu');
 
       const newDiary = new Diaryview();

    }   
    hide(){
        console.log('hide Menu');
        const mainPageElement = document.querySelector('#main-page');
        const diaryPageElement = document.querySelector('#diary-page');
        mainPageElement.classList.add('inactive');
        diaryPageElement.classList.remove('inactive');
    }

}
    
