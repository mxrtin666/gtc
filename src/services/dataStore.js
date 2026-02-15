const USERS_STORAGE_KEY = 'gtc_users';
const TRANSACTIONS_STORAGE_KEY = 'gtc_transactions';

function readJsonStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`Failed to read ${key} from localStorage`, error);
    return [];
  }
}

function writeJsonStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

async function loadJsonFile(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.error(`Failed to load ${path}`);
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error loading ${path}`, error);
    return [];
  }
}

function mergeById(baseRows, localRows) {
  const byId = new Map();
  baseRows.forEach((row) => {
    byId.set(row.id, row);
  });
  localRows.forEach((row) => {
    byId.set(row.id, row);
  });
  return Array.from(byId.values());
}

export async function loadUsers() {
  const jsonUsers = await loadJsonFile('/data/users.json');
  const localUsers = readJsonStorage(USERS_STORAGE_KEY);
  return mergeById(jsonUsers, localUsers);
}

export function saveUser(user) {
  const users = readJsonStorage(USERS_STORAGE_KEY);
  users.push(user);
  writeJsonStorage(USERS_STORAGE_KEY, users);
}

export async function loadTransactions() {
  const jsonTransactions = await loadJsonFile('/data/transactions.json');
  const localTransactions = readJsonStorage(TRANSACTIONS_STORAGE_KEY);

  return mergeById(jsonTransactions, localTransactions).sort((a, b) => {
    return new Date(b.transactionDate) - new Date(a.transactionDate);
  });
}

export function saveTransaction(transaction) {
  const transactions = readJsonStorage(TRANSACTIONS_STORAGE_KEY);
  transactions.push(transaction);
  writeJsonStorage(TRANSACTIONS_STORAGE_KEY, transactions);
}
