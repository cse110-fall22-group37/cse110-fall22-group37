# Manual Test Scripts to be automated
## Test Suites
#### This would be separate files and the title of each describe.
1. [Add, edit, delete](#add-edit-delete)
2. [Filter](#filter)
3. [Search](#search)
4. [Export](#export)
5. [Delete all](#delete-all)

## Add, edit, serach, delete
1. Add new entry
   - Name: Panda Express
   - Rating: 3/5
   - Price: $
   - Describe: Orange chicken is really good.
   - Tags: Chinese
   - Image: Download image and add it
   - Click "Save Restaurant"
   - Verify if form is empty
2. Verify new Entry
   - Verify if all values in list entry matches
3. Add another entry
   - Name: Plumeria
   - Rating: 4/5
   - Price: $$
   - Describe: Really good vegan food with cool vibes.
   - Tags: Vegan, Kids
   - Image: Download image and add it
   - Click "Save Restaurant"
4. Verify 2 entries
   - Verify if there are 2 entries in the list
5. Verify Second entry
   Verify if all values in new list entry matches
7. Search the second entry
   - Verify if seachred result is the second entry
   - Delete string on search bar
   - Check left column shows all entries
6. Edit entry
   - Click edit button on Panda Express Entry
   - Verify if form is prefilled with correct values(look at step 1 for values)
   - Edit Ratings from 3/5 to 1/5
   - Click "Save Restaurant"
7. Verify entry edit
   - Verify if changes has been saved in list entry
   - Verify if form is empty
8. Delete
   - Delete panda express
9.  Verify if panda express is deleted
   - Verify if only one item on list
   - Verify only item available is Plumeria

## Search
1. Add first entry
   - Name: Panda
   - Rating: 3/5
   - Price: $
   - Describe: Orange chicken is really good.
   - Tags: Chinese
   - Click "Save Restaurant"
   - Verify if form is empty
2. Add second entry
   - Name: Plumeria
   - Rating: 4/5
   - Price: $$
   - Describe: Really good vegan food with cool vibes.
   - Tags: Vegan, Kids
   - Click "Save Restaurant"
3. Search for Plue
   - Type "Plu" in search bar
   - Verify only Plumeria is visible


## Filter
1. Add first entry
   - Name: Panda
   - Rating: 3/5
   - Price: $
   - Describe: Orange chicken is really good.
   - Tags: Chinese
   - Click "Save Restaurant"
   - Verify if form is empty
2. Add second entry
   - Name: Plumeria
   - Rating: 4/5
   - Price: $$
   - Describe: Really good vegan food with cool vibes.
   - Tags: Vegan, Kids
   - Click "Save Restaurant"
3. Add third entry
   - Name: VeganDTF
   - Rating: 4/5
   - Price: $$$
   - Describe: A nice vegan place for vagan food.
   - Tags: Vegan, Chinese
   - Click "Save Restaurant"
4. Verify all three entries visible
5. Sort and verify by vegan
6. Sort and verify by vegan and chinese
7. Sort and verify by vegan, chinese and kids

## Sort
1. Add first entry
   - Name: Panda
   - Rating: 3/5
   - Price: $
   - Describe: Orange chicken is really good.
   - Tags: Chinese
   - Click "Save Restaurant"
   - Verify if form is empty
2. Add second entry
   - Name: Plumeria
   - Rating: 4/5
   - Price: $$
   - Describe: Really good vegan food with cool vibes.
   - Tags: Vegan, Kids
   - Click "Save Restaurant"
3. Add third entry
   - Name: VeganDTF
   - Rating: 4/5
   - Price: $$$
   - Describe: A nice vegan place for vagan food.
   - Tags: Vegan, Chinese
   - Click "Save Restaurant"
4. Verify default sorting (Plumeria, VeganDTF, Panda)
5. Verify price low (Panda, Plumeria, VeganDTF)
6. Verify price high (VeganDTF, Plumeria, Panda)

## Delete all
1. Add new entry
   - Name: Panda Express
   - Rating: 3/5
   - Price: $
   - Describe: Orange chicken is really good.
   - Tags: Chinese
   - Image: Download image and add it
   - Click "Save Restaurant"
   - Verify if form is empty
2. Add another entry
   - Name: Plumeria
   - Rating: 4/5
   - Price: $$
   - Describe: Really good vegan food with cool vibes.
   - Tags: Vegan, Kids
   - Image: Download image and add it
   - Click "Save Restaurant"
3. Verify there are 2 entries
4. Click Delete all
5. Verify if all entries have been deleted