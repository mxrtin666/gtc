const CURRENT_USER_STORAGE_KEY = 'gtc_current_user';

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to read current user from localStorage', error);
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getCurrentUser());
}

export function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('gtc-auth-changed'));
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
  window.dispatchEvent(new Event('gtc-auth-changed'));
}
