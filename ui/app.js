import React from 'react';
import { AlertProvider, Alert } from 'meteor/quave:alert-react-tailwind';
import { BrowserRouter as Router } from 'react-router-dom';

import { SelectCommunity } from './components/select-community';
import { PeopleTable } from './components/people-table';
import { Metrics } from './components/metrics';

export const App = () => (
  <Router>
    <AlertProvider>
      <Alert />

      <main className="m-auto flex w-[90vw] max-w-screen-lg flex-col gap-4 pt-4 text-white">
        <SelectCommunity />

        <Metrics />

        <section className="mb-6 max-h-[600px] overflow-auto rounded-lg bg-muted p-6">
          <header className="mb-4">
            <h2 className="text-xl font-semibold">Registered Attendees</h2>
          </header>

          <PeopleTable />
        </section>
      </main>
    </AlertProvider>
  </Router>
);
