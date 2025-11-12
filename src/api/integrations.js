import { supabase } from './supabaseClient';

/**
 * Integration functions for Supabase
 * Replaces Base44 integrations with Supabase alternatives
 */

export const Core = {
  InvokeLLM: async (prompt, options = {}) => {
    // TODO: Implement via Supabase Edge Function calling OpenAI
    const { data, error } = await supabase.functions.invoke('invoke-llm', {
      body: { prompt, ...options }
    });
    if (error) throw error;
    return data;
  },

  SendEmail: async (emailData) => {
    // TODO: Implement via Supabase Edge Function with email service
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData
    });
    if (error) throw error;
    return data;
  },

  UploadFile: async (file, path) => {
    // Use Supabase Storage
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path ? `${path}/${fileName}` : fileName;
    
    const { data, error } = await supabase.storage
      .from('public-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('public-files')
      .getPublicUrl(filePath);
    
    return {
      path: filePath,
      url: urlData.publicUrl
    };
  },

  GenerateImage: async (prompt, options = {}) => {
    // TODO: Implement via Supabase Edge Function calling image generation API
    const { data, error } = await supabase.functions.invoke('generate-image', {
      body: { prompt, ...options }
    });
    if (error) throw error;
    return data;
  },

  ExtractDataFromUploadedFile: async (fileUrl, schema) => {
    // TODO: Implement via Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('extract-file-data', {
      body: { fileUrl, schema }
    });
    if (error) throw error;
    return data;
  },

  CreateFileSignedUrl: async (filePath, expiresIn = 3600) => {
    // Use Supabase Storage signed URLs
    const { data, error } = await supabase.storage
      .from('private-files')
      .createSignedUrl(filePath, expiresIn);
    
    if (error) throw error;
    return data.signedUrl;
  },

  UploadPrivateFile: async (file, path) => {
    // Use Supabase Storage private bucket
    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path ? `${path}/${fileName}` : fileName;
    
    const { data, error } = await supabase.storage
      .from('private-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    return {
      path: filePath
    };
  }
};

// Export individual functions for convenience
export const InvokeLLM = Core.InvokeLLM;
export const SendEmail = Core.SendEmail;
export const UploadFile = Core.UploadFile;
export const GenerateImage = Core.GenerateImage;
export const ExtractDataFromUploadedFile = Core.ExtractDataFromUploadedFile;
export const CreateFileSignedUrl = Core.CreateFileSignedUrl;
export const UploadPrivateFile = Core.UploadPrivateFile;
