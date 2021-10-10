/* your global dependencies */
import 'wicg-inert';
// import 'focus-visible';

/**
 * Utilities
 */
// import './utilities/conditioner';
// import './utilities/setExtLinks';

// import './ce'

// import './ce.svelte';
import Accordeon from './modules/accordeon';
import DetailsModal from './custom-elements/details-modal';

customElements.define('details-summary', Accordeon);
customElements.define('details-modal', DetailsModal);
