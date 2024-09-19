import { supabase, supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not get loaded');
  }

  return data;
}

//this edits and creates a cabin. Adding the id parameter will edit the cabin data if the check for id is successful.
export async function createUpdateCabin(newCabin, id) {
  //check to see if the cabin already has an image value or not
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  //create a unique data and use the replace to prevent the "/" from making folders
  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  //create a path to the supabase storage directory
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://ewqqjgtkmjwcsdckefxh.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = supabase.from('cabins');
  //1. create a new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //2. edit an existing cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // If the cabin was created or updated successfully, upload the image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    // Delete cabin if there was an error uploading the image
    if (storageError) {
      console.error('Error uploading image:', storageError);
      await supabase.from('cabins').delete().eq('id', data.id);
      throw new Error(
        'Cabin image could not be uploaded, so the cabin was not created or updated successfully'
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin by that id could not be deleted');
  }

  return data;
}
