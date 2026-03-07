

class ToggleState {
  isOpen = $state(false);

  constructor(initial = false) {
   this.isOpen = initial;
  }
   open = () => this.isOpen = true;
   close  = () =>  this.isOpen = false;
   toggle  = () =>  this.isOpen = !this.isOpen;
}

export const menuState = new ToggleState;
export const tutorialState = new ToggleState;