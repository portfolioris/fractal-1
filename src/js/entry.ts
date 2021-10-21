/* your global dependencies */
import 'wicg-inert';
import DetailsSummary from './custom-elements/details-summary';
import DetailsModal from './custom-elements/details-modal';
import ShowMore from './custom-elements/show-more';

customElements.define('details-summary', DetailsSummary);
customElements.define('details-modal', DetailsModal);
customElements.define('show-more', ShowMore);
