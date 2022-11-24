/**
 * Reads 'entries' from localStorage and returns an array of
 * all of the entries found (parsed, not in string form). If
 * nothing is found in localStorage for 'entries', an empty array
 * is returned.
 * @returns {Array<Object>} An array of entries found in localStorage
 */
export function getEntriesFromStorage() {
  return JSON.parse(window.localStorage.getItem('entries'));
}

/**
 * Takes in an array of entries, converts it to a string, and then
 * saves that string to 'entries' in localStorage
 * @param {Array<Object>} entries An array of entries
 */
export function saveEntriesToStorage(entries) {
  window.localStorage.setItem('entries', JSON.stringify(entries));
}

/**
 * 
 * @param {*} idx The entry to remove from storage
 * Remove the given entry idx from the storage and update the array
 * @returns the deleted entry from storage
 */
export function removeEntryFromLocalStorage(idx) {
  let entries = getEntriesFromStorage();
  let updatedEntries = [];
  let j = 0;
  for (let i = 0; i < entries.length; i++) {
    if (i == idx) {
      var deletedEntry = entries[i];
    } else {
      updatedEntries[j] = entries[i];
      j++;
    }
  }
  saveEntriesToStorage(updatedEntries);
  return deletedEntry;
}