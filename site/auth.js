// Supabase config
var SUPABASE_URL = 'https://spwylltpedngyigbrcso.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwd3lsbHRwZWRuZ3lpZ2JyY3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MjQzNjIsImV4cCI6MjA5MDQwMDM2Mn0.bIvyUtUL62j8v0w57Z5T3lckESCyaYbJfCfkc9WZGuw';

var supabaseClient = null;

function initSupabase() {
  if (typeof supabase !== 'undefined' && !supabaseClient) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClient;
}

async function getSession() {
  var client = initSupabase();
  if (!client) return null;
  var result = await client.auth.getSession();
  return result.data.session;
}

async function signInWithGoogle() {
  var client = initSupabase();
  if (!client) return;
  var redirectTo = window.location.origin + '/shop.html';
  var result = await client.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectTo }
  });
  if (result.error) {
    console.error('Sign in error:', result.error.message);
    return result.error;
  }
}

async function signInWithEmail(email, password) {
  var client = initSupabase();
  if (!client) return { error: { message: 'Not initialised' } };
  return await client.auth.signInWithPassword({ email: email, password: password });
}

async function signUpWithEmail(name, email, password) {
  var client = initSupabase();
  if (!client) return { error: { message: 'Not initialised' } };
  return await client.auth.signUp({
    email: email,
    password: password,
    options: { data: { full_name: name } }
  });
}

async function signOut() {
  var client = initSupabase();
  if (!client) return;
  await client.auth.signOut();
  window.location.href = 'index.html';
}

async function requireAuth() {
  var session = await getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  return session;
}

async function redirectIfSignedIn() {
  var session = await getSession();
  if (session) {
    window.location.href = 'shop.html';
  }
}
