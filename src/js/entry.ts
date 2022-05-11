import 'wicg-inert';
import DetailsSummary from './custom-elements/details-summary';
import DetailsModal from './custom-elements/details-modal';
import ShowMore from './custom-elements/show-more';
import ToggleFlyout from './custom-elements/toggle-flyout';
import InputAutocomplete from './custom-elements/input-autocomplete';
import FacetFilter from './custom-elements/facet-filter';

customElements.define('details-summary', DetailsSummary);
customElements.define('details-modal', DetailsModal);
customElements.define('show-more', ShowMore);
customElements.define('toggle-flyout', ToggleFlyout);
customElements.define('input-autocomplete', InputAutocomplete);
customElements.define('facet-filter', FacetFilter);
