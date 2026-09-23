// Rebuilds data/menu-items.json entirely from data/menu-in.json.
//
// menu-in.com is the only source: every item, price, size and photo comes from
// the dump, and anything not in it is gone. The site publishes Azerbaijani text
// only, so the four-locale wording lives here:
//
//   NAMES        one entry per product
//   INGREDIENTS  descriptions are comma-separated ingredient lists, so they are
//                composed token by token instead of written out 117 times
//
// Both are exhaustive by design. An unknown name or token fails the build
// rather than silently emitting Azerbaijani into the Russian menu.
//
// Run scripts/scrape-menu-in.mjs first to refresh the dump.
//
//   node scripts/build-menu-from-dump.mjs        write data/menu-items.json
//   node scripts/build-menu-from-dump.mjs --dry  report only
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const DUMP = join(root, "data", "menu-in.json");
const OUT = join(root, "data", "menu-items.json");
const dryRun = process.argv.includes("--dry");

/** Source category title -> our category key. */
const CATEGORY = {
  "PIZZA 25 / 30 / 35": "pizza",
  Burgers: "burger",
  "Club Sandwich": "sandwich",
  "Pizza - Sandwich": "sandwich",
  "Roll - Sandwich": "roll",
  Pasta: "pasta",
  Snacks: "snacks",
  Salads: "salads",
  SOUS: "sauces",
  Sweets: "sweets",
  Drinks: "drinks",
  Fresh: "fresh",
  Juice: "drinks",
  Lemonades: "lemonade",
  Milkshakes: "milkshake",
  Tea: "tea",
  Coffee: "coffee",
  Qalyan: "hookah",
};

/** Dishes the kitchen marks as its own; the source carries no such flag. */
const POPULAR = new Set([
  "Margarita Pizza",
  "Pepperoni Pizza",
  "Cheese Burger",
  "Kartof Fri",
  "Sezar Toyuq Salad",
]);
const SPICY = new Set(["Mexico Pizza", "Mexican Chicken", "Acılı"]);

const n = (ru, en, az, tr) => ({ ru, en, az, tr });

/** Same word in every locale — brand names, mostly. */
const same = (value) => n(value, value, value, value);

const NAMES = {
  // Pizza
  "BBQ CHICKEN PIZZA": n("Пицца BBQ с курицей", "BBQ Chicken Pizza", "BBQ Toyuqlu Pizza", "BBQ Tavuklu Pizza"),
  "Beef Pizza": n("Пицца с говядиной", "Beef Pizza", "Mal ətli Pizza", "Etli Pizza"),
  "Bolonez Pizza": n("Пицца Болоньезе", "Bolognese Pizza", "Bolonez Pizza", "Bolonez Pizza"),
  "Capricciosa Pizza": n("Пицца Капричоза", "Capricciosa Pizza", "Capricciosa Pizza", "Capricciosa Pizza"),
  "Cheese Pizza": n("Сырная пицца", "Cheese Pizza", "Pendirli Pizza", "Peynirli Pizza"),
  "Chicken Pizza": n("Пицца с курицей", "Chicken Pizza", "Toyuqlu Pizza", "Tavuklu Pizza"),
  "Coco Mix Pizza": n("Пицца Коко Микс", "Coco Mix Pizza", "Coco Mix Pizza", "Coco Mix Pizza"),
  "Grand Mix Pizza": n("Пицца Гранд Микс", "Grand Mix Pizza", "Grand Mix Pizza", "Grand Mix Pizza"),
  "Hawaiian Pizza": n("Пицца Гавайская", "Hawaiian Pizza", "Havay Pizzası", "Hawaii Pizza"),
  "Margarita Pizza": n("Пицца Маргарита", "Margherita Pizza", "Marqarita Pizza", "Margarita Pizza"),
  "Mexican Chicken": n("Мексиканская пицца с курицей", "Mexican Chicken Pizza", "Meksika Toyuqlu Pizza", "Meksika Tavuklu Pizza"),
  "Mexico Pizza": n("Пицца Мексика", "Mexico Pizza", "Meksika Pizzası", "Meksika Pizza"),
  "Mushroom Pizza": n("Грибная пицца", "Mushroom Pizza", "Göbələkli Pizza", "Mantarlı Pizza"),
  "Naggets Pizza": n("Пицца с наггетсами", "Nuggets Pizza", "Nagetsli Pizza", "Nuggetslı Pizza"),
  "Pepperoni Pizza": n("Пицца Пепперони", "Pepperoni Pizza", "Pepperoni Pizza", "Pepperoni Pizza"),
  "Pesto Pizza": n("Пицца Песто", "Pesto Pizza", "Pesto Pizza", "Pesto Pizza"),
  "Sausage Pizza": n("Пицца с колбасками", "Sausage Pizza", "Sosisli Pizza", "Sosisli Pizza"),
  "Sezar Pizza": n("Пицца Цезарь", "Caesar Pizza", "Sezar Pizza", "Sezar Pizza"),
  "Texas Pizza": n("Пицца Техас", "Texas Pizza", "Texas Pizza", "Texas Pizza"),
  "Tuna Pizza": n("Пицца с тунцом", "Tuna Pizza", "Tuna balıqlı Pizza", "Ton Balıklı Pizza"),
  "Vegetarian Pizza": n("Вегетарианская пицца", "Vegetarian Pizza", "Vegetarian Pizza", "Vejetaryen Pizza"),
  "WOW Pizza": n("Пицца WOW", "WOW Pizza", "WOW Pizza", "WOW Pizza"),
  "Yunan Pizza": n("Греческая пицца", "Greek Pizza", "Yunan Pizzası", "Yunan Pizza"),

  // Burgers
  "Cheese Burger": n("Чизбургер", "Cheese Burger", "Pendirli Burger", "Peynirli Burger"),
  "Pizza Burger": n("Пицца-бургер", "Pizza Burger", "Pizza Burger", "Pizza Burger"),
  "BBQ Burger": n("Бургер BBQ", "BBQ Burger", "BBQ Burger", "BBQ Burger"),

  // Sandwiches
  "Chicken Club Sandwich": n("Клаб-сэндвич с курицей", "Chicken Club Sandwich", "Toyuqlu Klub Sendviç", "Tavuklu Club Sandviç"),
  "BBQ Sandwich": n("Сэндвич BBQ", "BBQ Sandwich", "BBQ Sendviç", "BBQ Sandviç"),
  "Beef Sandwich": n("Сэндвич с говядиной", "Beef Sandwich", "Mal ətli Sendviç", "Etli Sandviç"),
  "Chicken Sandwich": n("Сэндвич с курицей", "Chicken Sandwich", "Toyuqlu Sendviç", "Tavuklu Sandviç"),
  "Pizza Bread": n("Пицца-хлеб", "Pizza Bread", "Pizza Çörəyi", "Pizza Ekmeği"),
  "Tuna Sandwich": n("Сэндвич с тунцом", "Tuna Sandwich", "Tuna balıqlı Sendviç", "Ton Balıklı Sandviç"),

  // Rolls
  "Beef Roll": n("Ролл с говядиной", "Beef Roll", "Mal ətli Roll", "Etli Rulo"),
  "Cheese Chicken Roll": n("Ролл с курицей и сыром", "Cheese Chicken Roll", "Pendirli Toyuq Roll", "Peynirli Tavuk Rulo"),
  "Chicken Melt Roll": n("Ролл Чикен Мелт", "Chicken Melt Roll", "Chicken Melt Roll", "Chicken Melt Rulo"),
  "Pizza Roll": n("Пицца-ролл", "Pizza Roll", "Pizza Roll", "Pizza Rulo"),
  "Sezar Roll": n("Ролл Цезарь", "Caesar Roll", "Sezar Roll", "Sezar Rulo"),

  // Pasta
  "Penne Arabiata": n("Пенне Арабьята", "Penne Arrabbiata", "Penne Arabiata", "Penne Arabiata"),
  "Penne Arabiata Toyuq": n("Пенне Арабьята с курицей", "Penne Arrabbiata with Chicken", "Penne Arabiata Toyuq", "Tavuklu Penne Arabiata"),
  "Spagetti Bolognese": n("Спагетти Болоньезе", "Spaghetti Bolognese", "Spagetti Bolognese", "Spagetti Bolonez"),
  "Spagetti Pomodoro": n("Спагетти Помодоро", "Spaghetti Pomodoro", "Spagetti Pomodoro", "Spagetti Pomodoro"),

  // Snacks
  "Kartof Dilimləri": n("Картофельные дольки", "Potato Wedges", "Kartof Dilimləri", "Patates Dilimleri"),
  "Kartof Fri": n("Картофель фри", "French Fries", "Kartof Fri", "Patates Kızartması"),
  "Naggets 4/8": n("Наггетсы", "Nuggets", "Nagets", "Nuggets"),
  "Pendir Çubuqları 4/8": n("Сырные палочки", "Cheese Sticks", "Pendir Çubuqları", "Peynir Çubukları"),
  "Toyuq Çubuqları 4/8": n("Куриные палочки", "Chicken Sticks", "Toyuq Çubuqları", "Tavuk Çubukları"),
  "Toyuq Qanadları 5/8": n("Куриные крылышки", "Chicken Wings", "Toyuq Qanadları", "Tavuk Kanatları"),
  "Chicken Schnitzel": n("Куриный шницель", "Chicken Schnitzel", "Toyuq Şnitseli", "Tavuk Şnitzel"),

  // Salads
  "Beef Salad": n("Салат с говядиной", "Beef Salad", "Mal ətli Salat", "Etli Salata"),
  "Mexico Salad": n("Мексиканский салат", "Mexican Salad", "Meksika Salatı", "Meksika Salata"),
  "Sezar Krevet Salad": n("Цезарь с креветками", "Caesar Salad with Shrimp", "Sezar Krevetli Salat", "Karidesli Sezar Salata"),
  "Sezar Toyuq Salad": n("Цезарь с курицей", "Caesar Salad with Chicken", "Sezar Toyuqlu Salat", "Tavuklu Sezar Salata"),
  "Tuna Salad": n("Салат с тунцом", "Tuna Salad", "Tuna balıqlı Salat", "Ton Balıklı Salata"),
  "Vegetarian Salad": n("Вегетарианский салат", "Vegetarian Salad", "Vegetarian Salat", "Vejetaryen Salata"),
  "Yunan Salad": n("Греческий салат", "Greek Salad", "Yunan Salatı", "Yunan Salata"),

  // Sauces
  "Acılı": n("Острый соус", "Spicy Sauce", "Acılı sous", "Acı Sos"),
  Barbekyu: n("Соус барбекю", "Barbecue Sauce", "Barbekyu sous", "Barbekü Sos"),
  Burger: n("Бургерный соус", "Burger Sauce", "Burger sousu", "Burger Sos"),
  Ketchup: n("Кетчуп", "Ketchup", "Ketçup", "Ketçap"),
  Mayonez: n("Майонез", "Mayonnaise", "Mayonez", "Mayonez"),
  Pendirli: n("Сырный соус", "Cheese Sauce", "Pendirli sous", "Peynirli Sos"),
  Sezar: n("Соус Цезарь", "Caesar Sauce", "Sezar sousu", "Sezar Sos"),
  "Turshu Şirin": n("Кисло-сладкий соус", "Sweet and Sour Sauce", "Turşu-şirin sous", "Tatlı Ekşi Sos"),

  // Sweets
  Twix: same("Twix"),
  Bounty: same("Bounty"),
  "M&M's": same("M&M's"),
  "Bombbar 40": same("Bombbar 40"),
  "Bombbar Cookie": same("Bombbar Cookie"),
  "Snaq Coco": same("Snaq Coco"),
  "Chika Musli": same("Chika Musli"),
  Snaqer: same("Snaqer"),
  "Shocks Brownie": same("Shocks Brownie"),

  // Drinks
  "Sirab Qazsiz, 0.5": n("Sirab без газа, 0.5", "Sirab Still, 0.5", "Sirab Qazsız, 0.5", "Sirab Sade, 0.5"),
  "Sirab Qazli, 0.5": n("Sirab с газом, 0.5", "Sirab Sparkling, 0.5", "Sirab Qazlı, 0.5", "Sirab Sodalı, 0.5"),
  "Sirab Glass Qazsiz, 0.5": n("Sirab Glass без газа, 0.5", "Sirab Glass Still, 0.5", "Sirab Glass Qazsız, 0.5", "Sirab Glass Sade, 0.5"),
  "Sirab Glass Qazli, 0.5": n("Sirab Glass с газом, 0.5", "Sirab Glass Sparkling, 0.5", "Sirab Glass Qazlı, 0.5", "Sirab Glass Sodalı, 0.5"),
  "Coca-Cola Classic 0.5": same("Coca-Cola Classic 0.5"),
  "Coca-Cola Classic 0.33": same("Coca-Cola Classic 0.33"),
  "Coca-Cola Zero 0.33": same("Coca-Cola Zero 0.33"),
  "Fanta 0.33": same("Fanta 0.33"),
  "Sprite 0.33": same("Sprite 0.33"),
  "Fuse Tea Lemon, 0.33": n("Fuse Tea лимон, 0.33", "Fuse Tea Lemon, 0.33", "Fuse Tea Limon, 0.33", "Fuse Tea Limon, 0.33"),
  "Fuse Tea Peach, 0.33": n("Fuse Tea персик, 0.33", "Fuse Tea Peach, 0.33", "Fuse Tea Şaftalı, 0.33", "Fuse Tea Şeftali, 0.33"),
  "Fuse Tea Mango, 0.33": n("Fuse Tea манго, 0.33", "Fuse Tea Mango, 0.33", "Fuse Tea Manqo, 0.33", "Fuse Tea Mango, 0.33"),
  "Pepsi 0.5": same("Pepsi 0.5"),
  "Pepsi 0.33": same("Pepsi 0.33"),
  "Mountain Dew 0.33": same("Mountain Dew 0.33"),
  "Lipton Lemon, 0.33": n("Lipton лимон, 0.33", "Lipton Lemon, 0.33", "Lipton Limon, 0.33", "Lipton Limon, 0.33"),
  "Lipton Peach, 0.33": n("Lipton персик, 0.33", "Lipton Peach, 0.33", "Lipton Şaftalı, 0.33", "Lipton Şeftali, 0.33"),
  "Lipton Green, 0.33": n("Lipton зелёный, 0.33", "Lipton Green, 0.33", "Lipton Yaşıl, 0.33", "Lipton Yeşil, 0.33"),
  "Red Bull Energy Drink, 0.25": same("Red Bull Energy Drink, 0.25"),
  "Red Bull Sugar Free, 0.25": n("Red Bull без сахара, 0.25", "Red Bull Sugar Free, 0.25", "Red Bull Şəkərsiz, 0.25", "Red Bull Şekersiz, 0.25"),
  "Red Bull Yellow Edition, 0.25": same("Red Bull Yellow Edition, 0.25"),
  "Red Bull Watermelon, 0.25": n("Red Bull арбуз, 0.25", "Red Bull Watermelon, 0.25", "Red Bull Qarpız, 0.25", "Red Bull Karpuz, 0.25"),
  "Gorilla, 0.25": same("Gorilla, 0.25"),
  Juice: n("Сок", "Juice", "Şirə", "Meyve Suyu"),

  // Fresh
  "Fresh Orange 0.3": n("Фреш апельсиновый, 0.3", "Fresh Orange Juice, 0.3", "Portağal Freş, 0.3", "Portakal Suyu, 0.3"),
  "Fresh Apple 0.3": n("Фреш яблочный, 0.3", "Fresh Apple Juice, 0.3", "Alma Freş, 0.3", "Elma Suyu, 0.3"),
  "Fresh Carrot 0.3": n("Фреш морковный, 0.3", "Fresh Carrot Juice, 0.3", "Yerkökü Freş, 0.3", "Havuç Suyu, 0.3"),

  // Lemonades
  "Passion Mango": n("Маракуйя — манго", "Passion Fruit — Mango", "Marakuya — Manqo", "Çarkıfelek — Mango"),
  "Strawberry - Kiwi": n("Клубника — киви", "Strawberry — Kiwi", "Çiyələk — Kivi", "Çilek — Kivi"),
  "Kiwi - Pomegranate": n("Киви — гранат", "Kiwi — Pomegranate", "Kivi — Nar", "Kivi — Nar"),
  "Green Apple": n("Зелёное яблоко", "Green Apple", "Yaşıl Alma", "Yeşil Elma"),
  "Tarxun Breeze": n("Тархун Бриз", "Tarragon Breeze", "Tarxun Breeze", "Tarhun Breeze"),
  "Make Your Lemonade": n("Свой лимонад", "Make Your Own Lemonade", "Öz Limonadın", "Kendi Limonatan"),

  // Milkshakes
  "Vanilla Milkshake": n("Ванильный милкшейк", "Vanilla Milkshake", "Vanilli Milkşeyk", "Vanilyalı Milkshake"),
  "Chocolate Milkshake": n("Шоколадный милкшейк", "Chocolate Milkshake", "Şokoladlı Milkşeyk", "Çikolatalı Milkshake"),
  "Strawberry Milkshake": n("Клубничный милкшейк", "Strawberry Milkshake", "Çiyələkli Milkşeyk", "Çilekli Milkshake"),

  // Tea
  "Black Tea 1.0 L": n("Чёрный чай, 1 л", "Black Tea, 1 L", "Qara Çay, 1 l", "Siyah Çay, 1 L"),
  "Green Tea 1.0 L": n("Зелёный чай, 1 л", "Green Tea, 1 L", "Yaşıl Çay, 1 l", "Yeşil Çay, 1 L"),

  // Coffee
  Espresso: n("Эспрессо", "Espresso", "Espresso", "Espresso"),
  "Americano 0.25": n("Американо, 0.25", "Americano, 0.25", "Americano, 0.25", "Americano, 0.25"),
  "Cappuccino 0.3": n("Капучино, 0.3", "Cappuccino, 0.3", "Cappuccino, 0.3", "Cappuccino, 0.3"),
  "Latte 0.3": n("Латте, 0.3", "Latte, 0.3", "Latte, 0.3", "Latte, 0.3"),
  Toppings: n("Топпинг", "Topping", "Topping", "Topping"),

  // Hookah
  "Qalyan Premium": n("Кальян Premium", "Premium Hookah", "Qalyan Premium", "Premium Nargile"),
  "Qalyan WTO": n("Кальян WTO", "WTO Hookah", "Qalyan WTO", "WTO Nargile"),
};

/** Description tokens. The key is the Azerbaijani (or English) source token. */
const INGREDIENTS = {
  "Qauda pendiri": n("Сыр гауда", "Gouda cheese", "Qauda pendiri", "Gouda peyniri"),
  Qauda: n("Гауда", "Gouda", "Qauda", "Gouda"),
  Pomidor: n("Помидор", "Tomato", "Pomidor", "Domates"),
  "Toyuq əti": n("Курица", "Chicken", "Toyuq əti", "Tavuk eti"),
  "Göbələk": n("Грибы", "Mushrooms", "Göbələk", "Mantar"),
  "Pizza sous": n("Соус для пиццы", "Pizza sauce", "Pizza sous", "Pizza sosu"),
  "Bibər": n("Перец", "Peppers", "Bibər", "Biber"),
  "Soğan": n("Лук", "Onion", "Soğan", "Soğan"),
  "Xüsusi sous": n("Фирменный соус", "House sauce", "Xüsusi sous", "Özel sos"),
  "Qarğıdalı": n("Кукуруза", "Sweetcorn", "Qarğıdalı", "Mısır"),
  Zeytun: n("Оливки", "Olives", "Zeytun", "Zeytin"),
  Ayzberq: n("Айсберг", "Iceberg lettuce", "Ayzberq", "Iceberg marul"),
  Aysberq: n("Айсберг", "Iceberg lettuce", "Aysberq", "Iceberg marul"),
  "Aysberq kahı": n("Салат айсберг", "Iceberg lettuce", "Aysberq kahı", "Iceberg marul"),
  "Mal əti": n("Говядина", "Beef", "Mal əti", "Dana eti"),
  "Toyuq filesi": n("Куриное филе", "Chicken fillet", "Toyuq filesi", "Tavuk fileto"),
  "Turşu xiyar": n("Солёный огурец", "Pickled cucumber", "Turşu xiyar", "Turşu salatalık"),
  "Turşu diyar": n("Солёный огурец", "Pickled cucumber", "Turşu xiyar", "Turşu salatalık"),
  Parmezan: n("Пармезан", "Parmesan", "Parmezan", "Parmesan"),
  "Parmezan pendiri": n("Сыр пармезан", "Parmesan cheese", "Parmezan pendiri", "Parmesan peyniri"),
  "Çeddar pendiri": n("Сыр чеддер", "Cheddar cheese", "Çeddar pendiri", "Cheddar peyniri"),
  "Çeddar": n("Чеддер", "Cheddar", "Çeddar", "Cheddar"),
  "Çeri pomidor": n("Помидоры черри", "Cherry tomatoes", "Çeri pomidor", "Cherry domates"),
  "Seri pomidor": n("Помидоры черри", "Cherry tomatoes", "Çeri pomidor", "Cherry domates"),
  Pepperoni: n("Пепперони", "Pepperoni", "Pepperoni", "Pepperoni"),
  Sosis: n("Колбаски", "Sausage", "Sosis", "Sosis"),
  Xiyar: n("Огурец", "Cucumber", "Xiyar", "Salatalık"),
  "Vetçina": n("Ветчина", "Ham", "Vetçina", "Jambon"),
  "Tuna balığı": n("Тунец", "Tuna", "Tuna balığı", "Ton balığı"),
  Avakado: n("Авокадо", "Avocado", "Avakado", "Avokado"),
  "BBQ sous": n("Соус BBQ", "BBQ sauce", "BBQ sous", "BBQ sos"),
  "BBQ Sous": n("Соус BBQ", "BBQ sauce", "BBQ sous", "BBQ sos"),
  "Barbekyu sous": n("Соус барбекю", "Barbecue sauce", "Barbekyu sous", "Barbekü sos"),
  "Sezar sous": n("Соус Цезарь", "Caesar sauce", "Sezar sous", "Sezar sos"),
  "Sezar sousu": n("Соус Цезарь", "Caesar sauce", "Sezar sousu", "Sezar sos"),
  Jalapeno: n("Халапеньо", "Jalapeño", "Jalapeno", "Jalapeño"),
  "Pomidor və Jalapeno": n("Помидор и халапеньо", "Tomato and jalapeño", "Pomidor və Jalapeno", "Domates ve jalapeño"),
  "Pesto sous": n("Соус песто", "Pesto sauce", "Pesto sous", "Pesto sos"),
  "Feta pendiri": n("Сыр фета", "Feta cheese", "Feta pendiri", "Feta peyniri"),
  Xardal: n("Горчица", "Mustard", "Xardal", "Hardal"),
  Rukola: n("Руккола", "Rocket", "Rukola", "Roka"),
  Fri: n("Картофель фри", "French fries", "Fri", "Patates kızartması"),
  "Kartof fri": n("Картофель фри", "French fries", "Kartof fri", "Patates kızartması"),
  "Karton fri": n("Картофель фри", "French fries", "Kartof fri", "Patates kızartması"),
  "Penne makaronu": n("Паста пенне", "Penne pasta", "Penne makaronu", "Penne makarna"),
  "Arabiata sous": n("Соус арабьята", "Arrabbiata sauce", "Arabiata sous", "Arabiata sos"),
  Spagetti: n("Спагетти", "Spaghetti", "Spagetti", "Spagetti"),
  "Çörək krutonları": n("Гренки", "Croutons", "Çörək krutonları", "Kruton"),
  "Çörək krutonlu": n("С гренками", "With croutons", "Çörək krutonlu", "Krutonlu"),
  Suxari: n("Сухарики", "Croutons", "Suxari", "Kruton"),
  "Bolonez sous": n("Соус болоньезе", "Bolognese sauce", "Bolonez sous", "Bolonez sos"),
  Bolonyez: n("Болоньезе", "Bolognese", "Bolonyez", "Bolonez"),
  "Pomodoro sous": n("Соус помодоро", "Pomodoro sauce", "Pomodoro sous", "Pomodoro sos"),
  "Kifli pendir": n("Сыр с плесенью", "Blue cheese", "Kifli pendir", "Küflü peynir"),
  Rikotta: n("Рикотта", "Ricotta", "Rikotta", "Ricotta"),
  Ananas: n("Ананас", "Pineapple", "Ananas", "Ananas"),
  "Boqar bibəri": n("Болгарский перец", "Bell pepper", "Boqar bibəri", "Dolmalık biber"),
  "Göbələkli sous": n("Грибной соус", "Mushroom sauce", "Göbələkli sous", "Mantarlı sos"),
  Naggets: n("Наггетсы", "Nuggets", "Nagets", "Nuggets"),
  "Toyuq nagetsləri": n("Куриные наггетсы", "Chicken nuggets", "Toyuq nagetsləri", "Tavuk nuggets"),
  "Toyuq qanadları": n("Куриные крылышки", "Chicken wings", "Toyuq qanadları", "Tavuk kanatları"),
  "Ketçup": n("Кетчуп", "Ketchup", "Ketçup", "Ketçap"),
  "Burger sous": n("Бургерный соус", "Burger sauce", "Burger sous", "Burger sos"),
  "Sendviç çörəyi": n("Сэндвичный хлеб", "Sandwich bread", "Sendviç çörəyi", "Sandviç ekmeği"),
  Mayonez: n("Майонез", "Mayonnaise", "Mayonez", "Mayonez"),
  "Sarımsaq sous": n("Чесночный соус", "Garlic sauce", "Sarımsaq sous", "Sarımsaklı sos"),
  "Pendir sousu": n("Сырный соус", "Cheese sauce", "Pendir sousu", "Peynir sosu"),
  "Pendirli sous": n("Сырный соус", "Cheese sauce", "Pendirli sous", "Peynirli sos"),
  "Acılı sosu": n("Острый соус", "Spicy sauce", "Acılı sous", "Acı sos"),
  "Qızardılmış kartof dilimləri": n("Жареные картофельные дольки", "Fried potato wedges", "Qızardılmış kartof dilimləri", "Kızarmış patates dilimleri"),
  "Mozzarella pendiri": n("Сыр моцарелла", "Mozzarella cheese", "Mozzarella pendiri", "Mozzarella peyniri"),
  "Mozarella pendiri": n("Сыр моцарелла", "Mozzarella cheese", "Mozzarella pendiri", "Mozzarella peyniri"),
  "Küncüt": n("Кунжут", "Sesame", "Küncüt", "Susam"),
  Lobya: n("Фасоль", "Beans", "Lobya", "Fasulye"),
  Krevet: n("Креветки", "Shrimp", "Krevet", "Karides"),
  "Kök": n("Морковь", "Carrot", "Kök", "Havuç"),
  "Zeytun yağı": n("Оливковое масло", "Olive oil", "Zeytun yağı", "Zeytinyağı"),
  Oreqano: n("Орегано", "Oregano", "Oreqano", "Kekik"),
  "ORTA / BOYUK": n("Средняя / большая", "Medium / large", "Orta / böyük", "Orta / büyük"),
  "Served with French Fries": n("Подаётся с картофелем фри", "Served with French fries", "Kartof fri ilə verilir", "Patates kızartması ile servis edilir"),

  // Sweets and drinks, mostly already English on the source.
  Coconut: n("Кокос", "Coconut", "Kokos", "Hindistan cevizi"),
  "Coconut / Raspberry / Banana": n("Кокос / малина / банан", "Coconut / raspberry / banana", "Kokos / moruq / banan", "Hindistan cevizi / ahududu / muz"),
  "Badam-Duzlu Karamel": n("Миндаль — солёная карамель", "Almond — salted caramel", "Badam — duzlu karamel", "Badem — tuzlu karamel"),
  "Hazelnut / Peanut": n("Фундук / арахис", "Hazelnut / peanut", "Fındıq / yerfındığı", "Fındık / yer fıstığı"),
  "Coffee / Extra Chocolate": n("Кофе / двойной шоколад", "Coffee / extra chocolate", "Qəhvə / əlavə şokolad", "Kahve / ekstra çikolata"),
  "lemon fresh juice": n("свежий лимонный сок", "fresh lemon juice", "təzə limon şirəsi", "taze limon suyu"),
  "sparkling water": n("газированная вода", "sparkling water", "qazlı su", "soda"),
  milk: n("молоко", "milk", "süd", "süt"),
  cream: n("сливки", "cream", "qaymaq", "krema"),
  "Strawberry syrop": n("клубничный сироп", "strawberry syrup", "çiyələk siropu", "çilek şurubu"),
  "Passion fruit syrop": n("сироп маракуйи", "passion fruit syrup", "marakuya siropu", "çarkıfelek şurubu"),
  "mango syrop": n("сироп манго", "mango syrup", "manqo siropu", "mango şurubu"),
  "kiwi syrop": n("сироп киви", "kiwi syrup", "kivi siropu", "kivi şurubu"),
  "Kiwi syrop": n("сироп киви", "kiwi syrup", "kivi siropu", "kivi şurubu"),
  "pomegranate syrop": n("гранатовый сироп", "pomegranate syrup", "nar siropu", "nar şurubu"),
  "Apple syrop": n("яблочный сироп", "apple syrup", "alma siropu", "elma şurubu"),
  "Estragon syrop": n("сироп тархуна", "tarragon syrup", "tarxun siropu", "tarhun şurubu"),
  "feijoa syrop": n("сироп фейхоа", "feijoa syrup", "feyxoa siropu", "feijoa şurubu"),
  "Vanilla syrop": n("ванильный сироп", "vanilla syrup", "vanil siropu", "vanilya şurubu"),
  "Chocolate syrop": n("шоколадный сироп", "chocolate syrup", "şokolad siropu", "çikolata şurubu"),
  "Ask the barmen and you'll get the lemonade of your dream": n(
    "Скажите бармену — он соберёт лимонад вашей мечты",
    "Ask the bartender and you will get the lemonade of your dreams",
    "Barmenə deyin, arzunuzdakı limonadı hazırlasın",
    "Barmene sorun, hayalinizdeki limonatayı hazırlasın",
  ),

  // Hookah tobacco brands.
  "Must Have": same("Must Have"),
  "Dark Side": same("Dark Side"),
  Spectrum: same("Spectrum"),
  Element: same("Element"),
  Deus: same("Deus"),
  Fumari: same("Fumari"),
  Starline: same("Starline"),
  Sarma: same("Sarma"),
};

const LOCALES = ["ru", "en", "az", "tr"];
const LOGO = "/restaurant/logo/";
const money = (value) => Number(value).toFixed(2) + " ₼";

/** Descriptions are ingredient lists; split on commas, newlines and periods. */
const tokenise = (description) =>
  description
    .split(/[,\r\n]+|\.\s+/)
    .map((part) => part.trim().replace(/\.$/, ""))
    .filter(Boolean);

/**
 * Only two size shapes exist in the source. "Seçim 1 / 2 / 3" carries no
 * meaning of its own, so what the sizes are is read off the category and the
 * item name ("Naggets 4/8").
 */
const sizesFor = (item, categoryKey) => {
  const prices = item.variants.length
    ? item.variants.map((v) => v.price)
    : [item.basePrice ?? 0];

  if (categoryKey === "pizza" && prices.length === 3)
    return [25, 30, 35].map((amount, i) => ({
      amount,
      unit: "cm",
      price: money(prices[i]),
    }));

  const pieces = item.name.match(/(\d+)\s*\/\s*(\d+)\s*$/);
  if (pieces && prices.length === 2)
    return [pieces[1], pieces[2]].map((amount, i) => ({
      amount: Number(amount),
      unit: "pcs",
      price: money(prices[i]),
    }));

  if (prices.length === 2)
    return ["medium", "large"].map((label, i) => ({
      label,
      price: money(prices[i]),
    }));

  return [{ price: money(prices[0]) }];
};

const main = () => {
  const dump = JSON.parse(readFileSync(DUMP, "utf8"));
  const out = [];
  const unknownNames = [];
  const unknownTokens = new Set();
  let id = 1;

  for (const category of dump.categories) {
    const categoryKey = CATEGORY[category.title];
    if (!categoryKey) {
      console.warn(`unmapped category: ${category.title}`);
      continue;
    }

    for (const item of category.items) {
      const name = NAMES[item.name];
      if (!name) {
        unknownNames.push(`${category.title} / ${item.name}`);
        continue;
      }

      const tokens = item.description ? tokenise(item.description) : [];
      tokens.forEach((t) => {
        if (!INGREDIENTS[t]) unknownTokens.add(t);
      });

      const description = Object.fromEntries(
        LOCALES.map((locale) => [
          locale,
          tokens.map((t) => INGREDIENTS[t]?.[locale] ?? t).join(", "),
        ]),
      );

      const hasPhoto =
        item.localImages?.length > 0 && !item.images[0].includes(LOGO);

      out.push({
        id: id++,
        category: categoryKey,
        // null means "no photograph" — the card falls back to its icon.
        image: hasPhoto ? item.localImages[0] : null,
        ...(POPULAR.has(item.name) ? { isPopular: true } : {}),
        ...(SPICY.has(item.name) ? { isSpicy: true } : {}),
        selectedSizeIndex: 0,
        name,
        description,
        sizes: sizesFor(item, categoryKey),
      });
    }
  }

  if (unknownNames.length || unknownTokens.size) {
    if (unknownNames.length) {
      console.error("NO ENTRY IN NAMES:");
      unknownNames.forEach((x) => console.error(`  ${x}`));
    }
    if (unknownTokens.size) {
      console.error("NO ENTRY IN INGREDIENTS:");
      [...unknownTokens].forEach((x) => console.error(`  ${JSON.stringify(x)}`));
    }
    process.exit(1);
  }

  const counts = {};
  out.forEach((i) => (counts[i.category] = (counts[i.category] ?? 0) + 1));
  console.log(`built ${out.length} items`);
  Object.entries(counts).forEach(([k, v]) => console.log(`  ${k.padEnd(10)} ${v}`));
  console.log(`  without a photo (icon fallback): ${out.filter((i) => !i.image).length}`);

  if (dryRun) {
    console.log("\n[dry run] nothing written");
    return;
  }
  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${OUT}`);
};

main();
