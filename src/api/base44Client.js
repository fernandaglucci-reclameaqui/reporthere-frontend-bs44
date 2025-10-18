import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68cf655520c2199be90281b3", 
  requiresAuth: false // Temporarily disabled to allow app to load
});
