import { html, LitElement } from 'lit';
// eslint-disable-next-line import/extensions
import { property, state, customElement } from 'lit/decorators.js';

export default class FacetFilter extends LitElement {
  @property({ type: String }) apiurl = '';

  @state() totalResults = 1;

  @state() facets = [
    {
      id: 1,
      label: 'foo',
    },
    {
      id: 2,
      label: 'bar',
    },
  ];

  render() {
    return html`
      <div>
        <p>Aantal: ${this.totalResults}</p>
      </div>
      <slot></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    // this.fetchData();
  }

  async fetchData() {
    const req = await fetch(this.apiurl, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        place: '',
        placeObject: {
          name: '',
          placeType: '0',
          lng: '0',
          lat: '0',
        },
        placeType: 0,
        priceFrom: 500,
        priceTo: 9999,
        sizes: [],
        sortType: 0,
        bedRooms: 0,
        rootId: 1303,
        unitTypes: [2, 1],
        other: [],
        lat: '0',
        lng: '0',
        radius: 20,
      }),
    });

    const res = await req.json();
    this.totalResults = res.totalResults;
  }
}

@customElement('facet-list')
class FacetCheckbox extends LitElement {
  @state() items = [
    {
      id: 1,
      label: 'foo',
    },
    {
      id: 2,
      label: 'bar',
    },
  ];

  render() {
    return html`
      <h3>List</h3>
      ${this.items.map(
    (item) => html`
          ${item.label}
          <slot name="item"></slot>
        `,
  )}
    `;
  }
}
