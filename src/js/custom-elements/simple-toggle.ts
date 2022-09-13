export default class SimpleToggle extends HTMLElement {
  get id() {
    return this.getAttribute('id');
  }

  connectedCallback() {
    // console.log(this.id);
    const $el = this.querySelector(`#${this.id}`);
    $el.showModal();
  }
}
