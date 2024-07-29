import { Meteor } from 'meteor/meteor';

import { loadInitialData } from '../infra/initial-data';

import { Communities } from '../communities/communities';
import { People } from '../people/people';

import '../people/methods';

Meteor.publish('communities', () => Communities.find());
Meteor.publish('getPeopleByCommunity', ({ communityId }) =>
  People.find({ communityId })
);

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
