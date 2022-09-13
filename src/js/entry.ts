// import 'wicg-inert';
import DetailsSummary from './custom-elements/details-summary';
import DetailsModal from './custom-elements/details-modal';
import ShowMore from './custom-elements/show-more';
import ToggleFlyout from './custom-elements/toggle-flyout';
import InputAutocomplete from './custom-elements/input-autocomplete';
import FacetFilter from './custom-elements/facet-filter';
import SimpleToggle from './custom-elements/simple-toggle';
import ShareButton from './custom-elements/share-button';
import Layout from '../patterns/00-atoms/objects/layout/o-layout';
import './custom-elements/u-visually-hidden';
import './custom-elements/c-icon';
// import Cell from './custom-elements/o-layout-cell';

customElements.define('details-summary', DetailsSummary);
customElements.define('details-modal', DetailsModal);
customElements.define('show-more', ShowMore);
customElements.define('toggle-flyout', ToggleFlyout);
customElements.define('input-autocomplete', InputAutocomplete);
customElements.define('facet-filter', FacetFilter);
customElements.define('simple-toggle', SimpleToggle);
customElements.define('share-button', ShareButton);
customElements.define('o-layout', Layout);

// class LazyWebcomponent extends HTMLElement {
//   // constructor() {
//   //   super();
//   //   // console.log(this);
//   // }
// }
//
// const myCustomElements = [
//   'lazy-webcomponent',
//   'o-layout',
// ];
//
// myCustomElements.forEach((el) => {
//   window.customElements.define(el, class Foo extends HTMLElement {
//     constructor() {
//       super();
//       import(`./custom-elements/${el}`)
//         .then((module) => {
//           console.log(module);
//         });
//     }
//
//     // connectedCallback() {
//     //   console.log(this);
//     // }
//   });
// });
