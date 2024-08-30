import * as filter from 'leo-profanity';

const filterText = (text) => filter.clean(text);

export default filterText;
