/*
 * Copyright © 2020 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

import * as Helpers from '../helpers';
let headers = {};

const { dataCy } = Helpers;

const MOCK_SECURE_KEYS: any[] = [
  {
    name: 'secure-key-1-id',
    description: 'Example Secure Key 1',
    data: 'WARNING: this is secure data',
    createdEpochMs: 1471718010326,
  },
  {
    name: 'secure-key-2-id',
    description: 'Example Secure Key 2',
    data: 'WARNING: this is secure data',
    createdEpochMs: 1471718010327,
  },
  {
    name: 'secure-key-3-id',
    description: 'Example Secure Key 3',
    data: 'WARNING: this is secure data',
    createdEpochMs: 1471718010328,
  },
];

describe('Secure Key Manager Page', () => {
  // Uses API call to login instead of logging in manually through UI
  before(() => {
    Helpers.loginIfRequired().then(() => {
      cy.getCookie('CDAP_Auth_Token').then((cookie) => {
        if (!cookie) {
          return;
        }
        headers = {
          Authorization: 'Bearer ' + cookie.value,
        };
      });
    });
    const stub = cy.stub();
    cy.window().then((win) => {
      win.onbeforeunload = null;
    });
    cy.on('window:confirm', stub);

    Helpers.getArtifactsPoll(headers);
  });

  describe('Accessing and managing secure keys', () => {
    before(() => {
      cy.visit('/cdap/ns/default/securekeys');
      cy.wait(6000); // wait for secure keys to be loaded
    });

    it('should delete MOCK_SECURE_KEYS before testing if they already exist in the secure storage', () => {
      cy.get('body').then((body) => {
        MOCK_SECURE_KEYS.forEach((key) => {
          const secureKeyRow = dataCy(`secure-key-row-${key.name}`);
          if (body.find(secureKeyRow).length > 0) {
            cy.get(secureKeyRow).click();

            // open a delete dialog
            cy.get(dataCy('delete-secure-key')).click();

            // confirm delete
            cy.get(dataCy('secure-key-delete-confirm')).click();
            cy.wait(6000); // wait for success alert component to disappear
          }
        });
      });
    });

    it('should add secure keys', () => {
      MOCK_SECURE_KEYS.forEach((key) => {
        cy.get(dataCy('create-secure-key')).click({ force: true });

        cy.get(dataCy('secure-key-name'))
          .click()
          .type(key.name);
        cy.get(dataCy('secure-key-description'))
          .click()
          .type(key.description);
        cy.get(dataCy('secure-key-data'))
          .click()
          .type(key.data);

        cy.get(dataCy('save-secure-key')).click();
        cy.wait(6000); // wait for success alert component to disappear
      });
    });

    it('should edit a secure key', () => {
      const keyToEdit = MOCK_SECURE_KEYS[0];
      const additionalLetter = '1';

      // Click on a table row of the first secure key
      cy.get(dataCy(`secure-key-row-${keyToEdit.name}`)).click();

      // open a edit dialog
      cy.get(dataCy('edit-secure-key')).click();

      // edit the description of secure key
      cy.get(dataCy('secure-key-description'))
        .click()
        .type(additionalLetter);

      // edit the data of secure key
      cy.get(dataCy('secure-key-data'))
        .click()
        .type(additionalLetter);

      cy.get(dataCy('save-secure-key')).click();
      cy.wait(6000); // wait for success alert component to disappear

      // validate whether the description is updated successfully
      cy.get(`${dataCy('secure-key-description-view-only')} input`)
        .invoke('val')
        .then((val) => {
          expect(val).equals(keyToEdit.description + additionalLetter); // since we typed '1'
        });

      // validate whether the data is updated successfully
      cy.get(dataCy('toggle-secure-data-visibility')).click(); // toggle visibility for secure data
      cy.get(`${dataCy('secure-key-data-view-only')} input`)
        .invoke('val')
        .then((val) => {
          expect(val).equals(keyToEdit.data + additionalLetter); // since we typed '1'
        });

      cy.get(dataCy('back-button')).click(); // go back to secure key list
    });

    it('should search for secure keys', () => {
      cy.get(dataCy('search-secure-key'))
        .click()
        .type('secure');

      // since MOCK_SECURE_KEYS contains 'secure' in their description and name,
      // they must be included in the search results
      MOCK_SECURE_KEYS.forEach((key) => {
        const secureKeyRow = dataCy(`secure-key-row-${key.name}`);
        cy.get(secureKeyRow).should('exist');
      });
    });
  });
});
