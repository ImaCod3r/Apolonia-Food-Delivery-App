import { supabase } from "@/utils/supabase";

async function uploadImage(uri: string) {
  try {
    const arraybuffer = await fetch(uri).then((res) => res.arrayBuffer());
    const fileExt = uri.split('.').pop()?.toLowerCase() ?? 'jpeg';
    const path = `${Date.now()}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, arraybuffer, {
        contentType: `image/${fileExt}`,
      })

    if (uploadError) {
      throw uploadError;
    }

    return data;
   
  } catch (error) {
    console.log('Error uploading image:', error);
    throw error;
  } 
}

async function getImageUrl(path: string) {
  try {
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(path);

    if (!data) {
      throw new Error('Failed to retrieve public URL');
    }

    const publicURL = data.publicUrl;

    return publicURL;
    
  } catch (error) {
    console.log('Error getting image URL:', error);
    throw error;
  }
}

async function deleteImage(path: string) {
  try {
    const { error } = await supabase.storage
      .from('avatars')
      .remove([path]);

    if (error) {
      throw error;
    }

    return true;
    
  } catch (error) {
    console.log('Error deleting image:', error);
    throw error;
  }
}

export { uploadImage, deleteImage, getImageUrl };