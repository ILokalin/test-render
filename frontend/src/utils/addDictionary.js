import * as filter from 'leo-profanity';

const addRussianDictionary = async (dictionary) => {
  const ruDictionary = await filter.getDictionary(dictionary);

  return filter.add(ruDictionary);
};

export default addRussianDictionary;
