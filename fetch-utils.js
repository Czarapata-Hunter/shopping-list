const SUPABASE_URL = 'https://nudnldbscesultvvymuw.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZG5sZGJzY2VzdWx0dnZ5bXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyOTQ3NTIsImV4cCI6MTk3OTg3MDc1Mn0.gHh3DxZMH5wFFi-4mm7jCtViGY1Fuojkl0Hr4h6FIhY';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

// Create Part A
export async function createItem(item) {
    return await client.from('shopping_list').insert(item).single();
}

// Part D
export async function deleteBoughtItems() {
    // const user = getUser();

    return await client.from('shopping_list').delete().match({ bought: true });
    // .eq('user_id', user.id);
}

export async function deleteAllItems() {
    const user = getUser();
    return await client.from('shopping-list').delete().eq('user_id', user.id);
}

//Part B

export async function getItems() {
    return await client.from('shopping_list').select('*').order('created_at');
}

// Part C

export async function completeItem(id) {
    return await client.from('shopping_list').update({ bought: true }).eq('id', id).single();
}
