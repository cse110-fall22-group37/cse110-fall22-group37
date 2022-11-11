/**
 * Reads 'entries' from localStorage and returns an array of
 * all of the entries found (parsed, not in string form). If
 * nothing is found in localStorage for 'entries', an empty array
 * is returned.
 * @returns {Array<Object>} An array of entries found in localStorage
 */
export function getEntriesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.
  return JSON.parse(window.localStorage.getItem('entries'));
}

/**
 * Takes in an array of entries, converts it to a string, and then
 * saves that string to 'entries' in localStorage
 * @param {Array<Object>} entries An array of entries
 */
export function saveEntriesToStorage(entries) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  // Default sort by rating, descending order
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < entries.length; j++) {
      if (entries[j].rating > entries[i].rating) {
        let temp = entries[i];
        entries[i] = entries[j];
        entries[j] = temp;
      }
    }
  }
  window.localStorage.setItem('entries', JSON.stringify(entries));
}

export function removeEntryFromLocalStorage(idx) {
  let entries = getEntriesFromStorage();
  let updatedEntries = [];
  let j = 0;
  for (let i = 0; i < entries.length; i++) {
    if (i != idx) {
      updatedEntries[j] = entries[i];
      j++;
    }
  }
  saveEntriesToStorage(updatedEntries);
}