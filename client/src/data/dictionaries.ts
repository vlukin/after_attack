import type { SecurityEvent, Excuse } from '../types';

const API_URL = `${window.location.protocol}//${window.location.hostname}:3001`;

interface DictionariesData {
  adjectivesEN: string[];
  animalNounsEN: string[];
  adjectives: string[];
  animalNouns: string[];
  departments: string[];
  securityEvents: SecurityEvent[];
  excuses: Excuse[];
}

const fallbackData: DictionariesData = {
  adjectivesEN: [
    "Swift", "Clever", "Brave", "Calm", "Eager", "Gentle", "Happy", "Jolly",
    "Kind", "Lively", "Merry", "Noble", "Proud", "Silly", "Wise", "Young",
    "Bold", "Cool", "Elegant", "Fancy", "Grand", "Ideal", "Jazzy"
  ],
  animalNounsEN: [
    "Lion", "Tiger", "Eagle", "Wolf", "Bear", "Fox", "Owl", "Hawk",
    "Deer", "Lynx", "Otter", "Seal", "Whale", "Dolphin", "Shark", "Fish"
  ],
  adjectives: [
    "Быстрый", "Умный", "Храбрый", "Спокойный", "Стремящийся", "Нежный", "Счастливый", "Весёлый",
    "Добрый", "Живой", "Весёлый", "Благородный", "Гордый", "Глупый", "Мудрый", "Молодой"
  ],
  animalNouns: [
    "Лев", "Тигр", "Орёл", "Волк", "Медведь", "Лиса", "Сова", "Ястреб",
    "Олень", "Рысь", "Выдра", "Тюлень", "Кит", "Дельфин", "Акула", "Рыба"
  ],
  departments: [
    "IT Department", "Finance", "HR", "Marketing", "Sales", "Operations", "Legal", "Customer Support"
  ],
  securityEvents: [
    { id: 1, event: "Сотрудник перешёл по ссылке в фишинговом письме", consequences: "Кража данных", type: "phishing" }
  ],
  excuses: [
    { id: 1, description: "Это был тестовый письмо от отдела безопасности!", type: "phishing" }
  ]
};

let cachedDictionaries: DictionariesData | null = null;

export async function fetchDictionaries(): Promise<DictionariesData> {
  if (cachedDictionaries) {
    return cachedDictionaries;
  }
  try {
    const response = await fetch(`${API_URL}/api/dictionaries`);
    if (!response.ok) throw new Error('Failed to fetch');
    cachedDictionaries = await response.json();
    return cachedDictionaries!;
  } catch (error) {
    console.warn('Using fallback dictionaries:', error);
    cachedDictionaries = fallbackData;
    return fallbackData;
  }
}

export const adjectivesEN: string[] = [...fallbackData.adjectivesEN];
export const animalNounsEN: string[] = [...fallbackData.animalNounsEN];
export const adjectives: string[] = [...fallbackData.adjectives];
export const animalNouns: string[] = [...fallbackData.animalNouns];
export const departments: string[] = [...fallbackData.departments];
export const securityEvents: SecurityEvent[] = [...fallbackData.securityEvents];
export const excuses: Excuse[] = [...fallbackData.excuses];

export function generateRandomName(): string {
  const adjList = adjectives.length > 0 ? adjectives : adjectivesEN;
  const nounList = animalNouns.length > 0 ? animalNouns : animalNounsEN;
  const adj = adjList[Math.floor(Math.random() * adjList.length)];
  const noun = nounList[Math.floor(Math.random() * nounList.length)];
  return `${adj} ${noun}`;
}

export function generateRandomDepartment(): string {
  const deptList = departments.length > 0 ? departments : fallbackData.departments;
  return deptList[Math.floor(Math.random() * deptList.length)];
}

export function getRandomEvent(): SecurityEvent {
  const events = securityEvents.length > 0 ? securityEvents : fallbackData.securityEvents;
  return events[Math.floor(Math.random() * events.length)];
}

export function getExcuseByType(type: string): Excuse {
  const excuseList = excuses.length > 0 ? excuses : fallbackData.excuses;
  const filtered = excuseList.filter(e => e.type === type);
  if (filtered.length > 0) {
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
  return excuseList[Math.floor(Math.random() * excuseList.length)];
}

export async function loadDictionaries(): Promise<void> {
  try {
    const dict = await fetchDictionaries();
    adjectivesEN.length = 0;
    animalNounsEN.length = 0;
    adjectives.length = 0;
    animalNouns.length = 0;
    departments.length = 0;
    securityEvents.length = 0;
    excuses.length = 0;
    
    adjectivesEN.push(...dict.adjectivesEN);
    animalNounsEN.push(...dict.animalNounsEN);
    adjectives.push(...dict.adjectives);
    animalNouns.push(...dict.animalNouns);
    departments.push(...dict.departments);
    securityEvents.push(...dict.securityEvents);
    excuses.push(...dict.excuses);
  } catch (error) {
    console.error('Failed to load dictionaries:', error);
  }
}
