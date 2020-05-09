/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { customElement, html, property, TemplateResult } from 'lit-element';
import { Providers } from '../../../../../Providers';
import { ProviderState } from '../../../../../providers/IProvider';
import { BetaGraph } from '../../../../BetaGraph';
import { BasePersonCardSection } from '../BasePersonCardSection';
import { styles } from './mgt-person-card-emails-css';

/**
 * foo
 */
interface IEmail {
  // tslint:disable-next-line: completed-docs
  date: string;
  // tslint:disable-next-line: completed-docs
  subject: string;
  // tslint:disable-next-line: completed-docs
  from: string;
  // tslint:disable-next-line: completed-docs
  message: string;
}

/**
 * foo
 *
 * @export
 * @class MgtPersonCardEmails
 * @extends {MgtTemplatedComponent}
 */
@customElement('mgt-person-card-emails')
export class MgtPersonCardEmails extends BasePersonCardSection {
  /**
   * Array of styles to apply to the element. The styles should be defined
   * using the `css` tag function.
   */
  static get styles() {
    return styles;
  }

  /**
   * foo
   *
   * @readonly
   * @type {string}
   * @memberof MgtPersonCardEmails
   */
  public get displayName(): string {
    return 'Emails';
  }

  private _emails: IEmail[];

  /**
   * foo
   *
   * @returns {TemplateResult}
   * @memberof MgtPersonCardEmails
   */
  public renderIcon(): TemplateResult {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 3.5C4 3.22386 4.22386 3 4.5 3H16C17.1046 3 18 3.89543 18 5V12.5C18 12.7761 17.7761 13 17.5 13C17.2239 13 17 12.7761 17 12.5V5C17 4.44772 16.5523 4 16 4H4.5C4.22386 4 4 3.77614 4 3.5ZM4.04886 6H13.8473L9.04316 9.19968C8.86969 9.31522 8.64273 9.31103 8.47364 9.18916L4.04886 6ZM3 14V6.47671L7.88894 10.0004C8.39621 10.366 9.07706 10.3786 9.59749 10.032L15 6.43376V14H3ZM3 5C2.44772 5 2 5.44772 2 6V14C2 14.5523 2.44772 15 3 15H15C15.5523 15 16 14.5523 16 14V6C16 5.44772 15.5523 5 15 5H3Z"
        />
      </svg>
    `;
  }

  /**
   * foo
   *
   * @returns {TemplateResult}
   * @memberof MgtPersonCardEmails
   */
  public renderCompactView(): TemplateResult {
    const emailTemplates = this._emails ? this._emails.slice(0, 3).map(email => this.renderEmail(email)) : [];

    return html`
      <div class="root compact">
        ${emailTemplates}
      </div>
    `;
  }

  /**
   * foo
   *
   * @protected
   * @returns {TemplateResult}
   * @memberof MgtPersonCardEmails
   */
  protected renderFullView(): TemplateResult {
    const emailTemplates = this._emails ? this._emails.map(email => this.renderEmail(email)) : [];

    return html`
      <div class="root">
        <div class="title">Emails</div>
        ${emailTemplates}
      </div>
    `;
  }

  /**
   * foo
   *
   * @protected
   * @param {IEmail} email
   * @returns {TemplateResult}
   * @memberof MgtPersonCardEmails
   */
  protected renderEmail(email: IEmail): TemplateResult {
    return html`
      <div class="email">
        <div class="email__detail">
          <div class="email__subject">${email.subject}</div>
          <div class="email__from">${email.from}</div>
          <div class="email__message">${email.message}</div>
        </div>
        <div class="email__date">${email.date}</div>
      </div>
    `;
  }

  /**
   * load state into the component
   *
   * @protected
   * @returns {Promise<void>}
   * @memberof MgtPersonCardEmails
   */
  protected async loadState(): Promise<void> {
    const provider = Providers.globalProvider;

    // check if user is signed in
    if (!provider || provider.state !== ProviderState.SignedIn) {
      return;
    }

    if (!this.personDetails) {
      return;
    }

    const graph = provider.graph.forComponent(this);
    const betaGraph = BetaGraph.fromGraph(graph);

    // const userId = this.personDetails.id;
    // const profile = await getProfile(betaGraph, userId);

    this._emails = [];
    this.injectDummyData();

    this.requestUpdate();
  }

  private injectDummyData(): void {
    this._emails.push({
      date: '1:36 PM',
      from: 'Dan Rosenstein',
      message: 'Follow the white rabbit.',
      subject: 'RE: Important message from the future'
    });
    this._emails.push({
      date: '1:36 PM',
      from: 'Dan Rosenstein',
      message: 'This message is loooooooooooooooooooooooooooooooooooooooooooong.',
      subject: 'RE: Important message from the future'
    });
    this._emails.push({
      date: '1:36 PM',
      from: 'Dan Rosenstein',
      message: 'Follow the white rabbit.',
      subject: 'RE: Important message from the future. You will not even believe it, it is so amazing. wow'
    });
    this._emails.push({
      date: '1:36 PM',
      from: 'Dan Rosenstein',
      message: 'Follow the white rabbit.',
      subject: 'RE: Important message from the future'
    });
  }
}