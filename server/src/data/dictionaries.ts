export const adjectivesEN = [
  "Swift", "Clever", "Brave", "Calm", "Eager", "Gentle", "Happy", "Jolly", 
  "Kind", "Lively", "Merry", "Noble", "Proud", "Silly", "Wise", "Young",
  "Bold", "Cool", "Elegant", "Fancy", "Grand", "Ideal", "Jazzy",
  "Lucky", "Magic", "Nice", "Open", "Peace", "Quiet", "Royal",
  "Safe", "Top", "Unique", "Vital", "Wild", "Zealous", "Amiable", "Bright"
];

export const animalNounsEN = [
  "Lion", "Tiger", "Eagle", "Wolf", "Bear", "Fox", "Owl", "Hawk",
  "Deer", "Lynx", "Otter", "Seal", "Whale", "Dolphin",
  "Shark", "Fish", "Crab", "Octopus", "Squid",
  "Frog", "Toad", "Salamander", "Lizard", "Iguana",
  "Snake", "Cobra", "Python", "Turtle", "Tortoise", "Crocodile",
  "Monkey", "Ape", "Gorilla", "Chimpanzee", "Baboon", "Lemur",
  "Elephant", "Rhino", "Hippo", "Giraffe", "Zebra", "Horse",
  "Cow", "Pig", "Sheep", "Goat", "Moose", "Buffalo",
  "Koala", "Kangaroo", "Platypus", "Wombat",
  "Panda", "Raccoon", "Badger", "Skunk", "Weasel",
  "Hedgehog", "Porcupine", "Beaver", "Chipmunk", "Squirrel",
  "Mouse", "Rat", "Hamster", "Gerbil", "Rabbit", "Hare",
  "Hyena", "Jackal", "Coyote", "Cheetah", "Leopard", "Panther"
];

export const adjectives = [
  "Быстрый", "Умный", "Храбрый", "Спокойный", "Стремящийся", "Нежный", "Счастливый", "Весёлый",
  "Добрый", "Живой", "Весёлый", "Благородный", "Гордый", "Глупый", "Мудрый", "Молодой",
  "Смелый", "Крутой", "Элегантный", "Причудливый", "Величественный", "Счастливый", "Идеальный", "Яркий",
  "Острый", "Удачливый", "Волшебный", "Милый", "Открытый", "Мирный", "Тихий", "Королевский",
  "Безопасный", "Лучший", "Уникальный", "Жизненно важный", "Дикий", "Рьяный", "Дружелюбный", "Яркий"
];

export const animalNouns = [
  "Лев", "Тигр", "Орёл", "Волк", "Медведь", "Лиса", "Сова", "Ястреб",
  "Олень", "Рысь", "Выдра", "Тюлень", "Кит", "Дельфин",
  "Акула", "Рыба", "Краб", "Омар", "Медуза", "Осьминог", "Кальмар", "Морской конёк",
  "Лягушка", "Жаба", "Саламандра", "Тритон", "Ящерица", "Игуана", "Хамелеон", "Геккон",
  "Змея", "Кобра", "Гадюка", "Питон", "Черепаха", "Тортилла", "Крокодил", "Аллигатор",
  "Обезьяна", "Примат", "Горилла", "Шимпанзе", "Бабуин", "Лемур", "Гиббон", "Орангутан",
  "Слон", "Носорог", "Бегемот", "Жираф", "Зебра", "Лошадь", "Осёл", "Мул",
  "Корова", "Свинья", "Овца", "Козёл", "Лось", "Вапити", "Буйвол",
  "Бизон", "Антилопа", "Газель", "Лама", "Альпака", "Верблюд",
  "Коала", "Кенгуру", "Валлаби", "Утконос", "Ехидна", "Вомбат", "Бандикут", "Билби",
  "Панда", "Енот", "Барсук", "Скунс", "Ласка", "Куница", "Хорёк",
  "Норка", "Ёж", "Дикобраз", "Бобр", "Бурундук", "Белка",
  "Сурок", "Лесной сурок", "Гофер", "Полевка", "Мышь", "Крыса", "Хомяк", "Песчанка",
  "Шиншилла", "Кролик", "Заяц", "Пищуха", "Гиена", "Шакал", "Койот",
  "Гепард", "Леопард", "Пантера", "Ягуар", "Пума", "Бобкэт",
  "Каракал", "Сервал", "Оцелот", "Вомбат", "Тапир", "Ибекс", "Куница", "Нилгай"
];

export const departments = [
  "IT Department",
  "Finance",
  "HR",
  "Marketing",
  "Sales",
  "Operations",
  "Legal",
  "Customer Support",
  "Research & Development",
  "Quality Assurance"
];

export function generateRandomName(): string {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = animalNouns[Math.floor(Math.random() * animalNouns.length)];
  return `${adj} ${noun}`;
}

export function generateRandomDepartment(): string {
  return departments[Math.floor(Math.random() * departments.length)];
}
