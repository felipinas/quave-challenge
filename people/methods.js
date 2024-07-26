import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { People } from './people';

import { alreadyPassedFiveSeconds } from './utils';

const checkInPerson = async ({ personId }) => {
  check(personId, String);

  await People.updateAsync(
    { _id: personId },
    { $set: { checkIn: new Date() }, $unset: { checkOut: false } }
  );
};

const checkOutPerson = async ({ personId }) => {
  check(personId, String);

  const person = await People.findOneAsync({ _id: personId });

  if (!person) {
    throw new Error('There is no person with this id.');
  }

  const checkInDate = person.checkIn;

  if (!alreadyPassedFiveSeconds(new Date(checkInDate))) {
    throw new Error('You just can do it after 5 seconds.');
  }

  await People.updateAsync(
    { _id: personId },
    { $set: { checkOut: new Date() }, $unset: { checkIn: false } }
  );
};

Meteor.methods({
  'People.checkIn': checkInPerson,
  'People.checkOut': checkOutPerson,
});
