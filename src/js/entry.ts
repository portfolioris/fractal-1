/* your global dependencies */
import 'wicg-inert';
import DetailsSummary from './custom-elements/details-summary';
import DetailsModal from './custom-elements/details-modal';
import ShowMore from './custom-elements/show-more';
import ToggleFlyout from './custom-elements/toggle-flyout';
import InputAutocomplete from './custom-elements/input-autocomplete';

customElements.define('details-summary', DetailsSummary);
customElements.define('details-modal', DetailsModal);
customElements.define('show-more', ShowMore);
customElements.define('toggle-flyout', ToggleFlyout);
customElements.define('input-autocomplete', InputAutocomplete);
