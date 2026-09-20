/**
 * Everything about the Cheesy Pizzy menu that Wolt itself does not give us.
 *
 * The venue publishes Azerbaijani by hand; English and Russian are Wolt's
 * machine translations of it, and Turkish is not published at all. So the
 * scraper takes prices, sizes, images and the AZ copy straight from the API,
 * and this file supplies:
 *
 *  - the Wolt category -> site category mapping,
 *  - a Turkish name and description for every item,
 *  - fixes where Wolt's EN/RU output is wrong ("Pendirli Sous" left in AZ,
 *    "Американец" for an Americano, "Free" for "fri" = fries, ...),
 *  - the image file name, so public/menu-food stays readable,
 *  - the popular / spicy badges, which are ours, not Wolt's.
 *
 * Items are keyed by their Azerbaijani name with whitespace collapsed. If the
 * venue renames something, the scraper reports the key as unmatched instead of
 * silently shipping an untranslated item.
 */

export const VENUE_SLUG = "cheesy-pizzy";

/** Wolt category slug -> CATEGORY_KEYS entry in data/menu.ts. */
export const CATEGORY_BY_SLUG = {
  "pizzals-2": "pizza",
  "pizza-sandwiches-3": "sandwich",
  "burgers-4": "burger",
  "rolls-5": "roll",
  "spaghetti-6": "pasta",
  "salads-7": "salads",
  "soups-8": "soups",
  "snacks-9": "snacks",
  "milksheiks-11": "milkshake",
  "cold-drinks-12": "drinks",
  "hot-drinks-13": "coffee",
  "sauces-14": "sauces",
};

/**
 * key: AZ name, whitespace-collapsed.
 * slug: public/menu-food/<slug>.webp
 * name / description: per-locale overrides. `tr` is required everywhere; the
 * others appear only where Wolt's own translation is wrong or left in AZ.
 */
export const ITEMS = {
  // ---------------------------------------------------------------- pizza
  "Pizza Marqarita": {
    slug: "pizza-margherita",
    popular: true,
    name: { en: "Margherita Pizza", ru: "Пицца Маргарита", tr: "Margarita Pizza" },
    description: { tr: "Pizza sosu, mozzarella peyniri" },
  },
  "Pizza Pepperoni": {
    slug: "pizza-pepperoni",
    popular: true,
    name: { en: "Pepperoni Pizza", ru: "Пицца Пепперони", tr: "Pepperoni Pizza" },
    description: { tr: "Pizza sosu, gouda peyniri, pepperoni" },
  },
  "Vegetarian Pizza": {
    slug: "pizza-vegetarian",
    name: { en: "Vegetarian Pizza", ru: "Вегетарианская пицца", tr: "Vejetaryen Pizza" },
    description: { tr: "Pizza sosu, mozzarella peyniri, soğan, domates, mantar, biber, zeytin" },
  },
  "Capricciosa Pizza": {
    slug: "pizza-capricciosa",
    name: { en: "Capricciosa Pizza", ru: "Пицца Каприччоза", tr: "Capricciosa Pizza" },
    description: { tr: "Pizza sosu, gouda peyniri, jambon, mantar, zeytin" },
  },
  "Coco Miks Pizza": {
    slug: "pizza-coco-mix",
    name: { en: "Coco Mix Pizza", ru: "Пицца Коко Микс", tr: "Coco Mix Pizza" },
    description: { tr: "Pizza sosu, gouda peyniri, domates, biber, zeytin, tavuk, mısır" },
  },
  "Toyuq Barbekyu Pizza": {
    slug: "pizza-bbq-chicken",
    popular: true,
    name: { en: "BBQ Chicken Pizza", ru: "Пицца Барбекю с курицей", tr: "Barbekü Tavuklu Pizza" },
    description: { tr: "Pizza sosu, mozzarella peyniri, mantar, tavuk, BBQ sos" },
  },
  "Pesto Pizza": {
    slug: "pizza-pesto",
    name: { en: "Pesto Pizza", ru: "Пицца Песто", tr: "Pesto Pizza" },
    description: { tr: "Pesto sos, gouda peyniri, parmesan, soğan, biber, domates, mısır" },
  },
  "Meksika Pizza": {
    slug: "pizza-mexican",
    spicy: true,
    name: { en: "Mexican Pizza", ru: "Мексиканская пицца", tr: "Meksika Pizza" },
    description: { tr: "Pizza sosu, gouda peyniri, biber, domates, jalapeño, dana eti" },
  },
  "Cheesy Pizzy Pizza": {
    slug: "pizza-cheesy-pizzy",
    popular: true,
    name: { en: "Cheesy Pizzy Pizza", ru: "Пицца Cheesy Pizzy", tr: "Cheesy Pizzy Pizza" },
    description: {
      en: "Special sauce, gouda, blue cheese, cheddar, parmesan",
      ru: "Специальный соус, сыр гауда, голубой сыр, чеддер, пармезан",
      tr: "Özel sos, gouda peyniri, mavi peynir, cheddar, parmesan",
    },
  },
  "Tuna Bliss Pizza": {
    slug: "pizza-tuna",
    name: { en: "Tuna Bliss Pizza", ru: "Пицца с тунцом", tr: "Ton Balıklı Pizza" },
    description: { tr: "Pizza sosu, gouda peyniri, mantar, zeytin, ton balığı" },
  },
  "Toyuqlu Pizza": {
    slug: "pizza-chicken",
    name: { en: "Chicken Pizza", ru: "Пицца с курицей", tr: "Tavuklu Pizza" },
    description: { tr: "Pizza sosu, gouda peyniri, mantar, tavuk" },
  },
  "Sosisli Pizza": {
    slug: "pizza-sausage",
    name: { en: "Sausage Pizza", ru: "Пицца с колбасками", tr: "Sosisli Pizza" },
    description: { tr: "Pizza sosu, mozzarella peyniri, soğan, biber, sosis" },
  },
  "Ətli Pizza": {
    slug: "pizza-meat",
    name: { en: "Meaty Pizza", ru: "Мясная пицца", tr: "Etli Pizza" },
    description: { tr: "Özel sos, gouda peyniri, domates, soğan, dana eti" },
  },
  "Wow Pizza": {
    slug: "pizza-wow",
    name: { en: "Wow Pizza", ru: "Пицца Вау", tr: "Wow Pizza" },
    description: { tr: "Özel sos, gouda peyniri, pepperoni, mantar, avokado, parmesan, tavuk" },
  },
  "Qrand Miks Pizza": {
    slug: "pizza-grand-mix",
    popular: true,
    name: { en: "Grand Mix Pizza", ru: "Пицца Гранд Микс", tr: "Grand Mix Pizza" },
    description: { tr: "Pizza sosu, gouda peyniri, pepperoni, sosis, mantar, biber, zeytin, tavuk" },
  },
  "Pizza Sezar": {
    slug: "pizza-caesar",
    name: { en: "Caesar Pizza", ru: "Пицца Цезарь", tr: "Sezar Pizza" },
    description: { tr: "Sezar sos, gouda peyniri, aysberg, tavuk, çeri domates, parmesan" },
  },
  "Mexican Chicken": {
    slug: "pizza-mexican-chicken",
    spicy: true,
    name: {
      en: "Mexican Chicken Pizza",
      ru: "Мексиканская пицца с курицей",
      tr: "Meksika Tavuklu Pizza",
    },
    description: { tr: "Pizza sosu, mantar, biber, gouda peyniri, tavuk, domates, jalapeño" },
  },
  "Naggets Pizza": {
    slug: "pizza-nuggets",
    name: { en: "Nuggets Pizza", ru: "Пицца с наггетсами", tr: "Nuggetlı Pizza" },
    description: { tr: "Pizza sosu, nugget, mantar, mısır, gouda peyniri, domates" },
  },
  "Yunan Pizzasi": {
    slug: "pizza-greek",
    name: { en: "Greek Pizza", ru: "Греческая пицца", tr: "Yunan Pizzası" },
    description: { tr: "Pizza sosu, zeytin, feta peyniri, mozzarella peyniri, domates" },
  },
  "Mushrooms Pizza": {
    slug: "pizza-mushroom",
    name: { en: "Mushroom Pizza", ru: "Грибная пицца", tr: "Mantarlı Pizza" },
    description: { tr: "Mantar sosu, mantar, turşu salatalık, mozzarella peyniri, tavuk" },
  },
  "Bolonyeze Pizza": {
    slug: "pizza-bolognese",
    name: { en: "Bolognese Pizza", ru: "Пицца Болоньезе", tr: "Bolonez Pizza" },
    description: {
      en: "Bolognese sauce, pepperoni, gouda, mushrooms, olives",
      ru: "Соус болоньезе, пепперони, сыр гауда, грибы, оливки",
      tr: "Bolonez sos, pepperoni, gouda peyniri, mantar, zeytin",
    },
  },
  "Hawaiian Pizza": {
    slug: "pizza-hawaiian",
    name: { en: "Hawaiian Pizza", ru: "Гавайская пицца", tr: "Hawaii Pizza" },
    description: { tr: "Pizza sosu, jambon, gouda peyniri, domates, ananas, tavuk" },
  },
  "Texas Pizza": {
    slug: "pizza-texas",
    name: { en: "Texas Pizza", ru: "Техасская пицца", tr: "Teksas Pizza" },
    description: { tr: "BBQ sos, gouda peyniri, sosis, patates kızartması, turşu salatalık" },
  },

  // ------------------------------------------------------------- sandwich
  "Barbekyu Sendviç": {
    slug: "sandwich-bbq",
    name: { en: "BBQ Sandwich", ru: "Сэндвич барбекю", tr: "Barbekü Sandviç" },
    description: { tr: "BBQ sos, gouda peyniri, soğan, tavuk" },
  },
  "Sendviç Tuna Balığı ilə": {
    slug: "sandwich-tuna",
    name: { en: "Tuna Sandwich", ru: "Сэндвич с тунцом", tr: "Ton Balıklı Sandviç" },
    description: { tr: "Pizza sosu, gouda peyniri, soğan, mısır, ton balığı" },
  },
  "Beef Sandwich": {
    slug: "sandwich-beef",
    spicy: true,
    name: { en: "Beef Sandwich", ru: "Сэндвич с говядиной", tr: "Dana Etli Sandviç" },
    description: { tr: "Özel sos, mantar, gouda peyniri, dana eti, domates, jalapeño" },
  },
  "Chicken Sandwich": {
    slug: "sandwich-chicken",
    name: { en: "Chicken Sandwich", ru: "Сэндвич с курицей", tr: "Tavuklu Sandviç" },
    description: { tr: "Peynir sosu, mantar, biber, gouda peyniri, tavuk, mısır" },
  },
  "Pizza Bread": {
    slug: "sandwich-pizza-bread",
    name: { en: "Pizza Bread", ru: "Пицца-хлеб", tr: "Pizza Ekmeği" },
    description: { tr: "Pizza sosu, pepperoni, gouda peyniri, zeytin" },
  },

  // --------------------------------------------------------------- burger
  "Cheesy Burger": {
    slug: "burger-cheesy",
    popular: true,
    name: { en: "Cheesy Burger", ru: "Бургер Cheesy", tr: "Cheesy Burger" },
    description: { tr: "Hardal, et, cheddar peyniri, turşu salatalık, soğan, ketçap" },
  },
  "Pizzy Burger": {
    slug: "burger-pizzy",
    name: { en: "Pizzy Burger", ru: "Бургер Pizzy", tr: "Pizzy Burger" },
    description: { tr: "" },
  },
  "Zi Burger": {
    slug: "burger-zi",
    name: { en: "Zi Burger", ru: "Бургер Zi", tr: "Zi Burger" },
    description: { tr: "" },
  },

  // ----------------------------------------------------------------- roll
  "Pizza roll": {
    slug: "roll-pizza",
    popular: true,
    name: { en: "Pizza Roll", ru: "Пицца-ролл", tr: "Pizza Dürüm" },
    description: { tr: "Özel sos, mantar, sosis, mozzarella peyniri, tavuk, mısır, domates" },
  },
  "Beef roll": {
    slug: "roll-beef",
    name: { en: "Beef Roll", ru: "Ролл с говядиной", tr: "Dana Etli Dürüm" },
    description: { tr: "Özel sos, turşu salatalık, mozzarella peyniri, dana eti, domates" },
  },
  "Sezar roll": {
    slug: "roll-caesar",
    name: { en: "Caesar Roll", ru: "Ролл Цезарь", tr: "Sezar Dürüm" },
    description: { tr: "Aysberg, çeri domates, tavuk, mozzarella peyniri, parmesan, sezar sos" },
  },
  "Cheesy Toyuq Roll": {
    slug: "roll-cheesy-chicken",
    name: { en: "Cheesy Chicken Roll", ru: "Сырный ролл с курицей", tr: "Cheesy Tavuklu Dürüm" },
    description: {
      tr: "Barbekü sos, aysberg, mozzarella peyniri, cheddar, domates, biber, tavuk",
    },
  },
  "Chicken Melt Roll": {
    slug: "roll-chicken-melt",
    name: { en: "Chicken Melt Roll", ru: "Ролл Chicken Melt", tr: "Chicken Melt Dürüm" },
    description: {
      tr: "Özel sos, aysberg, mozzarella peyniri, patates kızartması, turşu salatalık, tavuk",
    },
  },

  // ---------------------------------------------------------------- pasta
  "Spaqetti Bolonyeze": {
    slug: "pasta-bolognese",
    name: { en: "Spaghetti Bolognese", ru: "Спагетти Болоньезе", tr: "Spaghetti Bolonez" },
    description: { tr: "Spagetti, bolonez sos, parmesan" },
  },
  "Spaqetti Pomodoro": {
    slug: "pasta-pomodoro",
    name: { en: "Spaghetti Pomodoro", ru: "Спагетти Помодоро", tr: "Spaghetti Pomodoro" },
    description: {
      en: "Spaghetti, pomodoro sauce, parmesan",
      ru: "Спагетти, соус помодоро, пармезан",
      tr: "Spagetti, pomodoro sos, parmesan",
    },
  },

  // --------------------------------------------------------------- salads
  "Sezar Salatı Toyuq ilə": {
    slug: "salad-caesar-chicken",
    popular: true,
    name: { en: "Caesar Salad with Chicken", ru: "Цезарь с курицей", tr: "Tavuklu Sezar Salata" },
    description: {
      en: "Caesar sauce, iceberg, croutons, cherry tomatoes, parmesan, chicken",
      ru: "Соус цезарь, айсберг, гренки, помидоры черри, пармезан, курица",
      tr: "Sezar sos, aysberg, kruton, çeri domates, parmesan, tavuk",
    },
  },
  "Sezar Salatı Krevet ilə": {
    slug: "salad-caesar-shrimp",
    name: { en: "Caesar Salad with Shrimp", ru: "Цезарь с креветками", tr: "Karidesli Sezar Salata" },
    description: {
      en: "Caesar sauce, iceberg, croutons, cherry tomatoes, parmesan, shrimp",
      ru: "Соус цезарь, айсберг, гренки, помидоры черри, пармезан, креветки",
      tr: "Sezar sos, aysberg, kruton, çeri domates, parmesan, karides",
    },
  },
  "Vegetarian Salatı": {
    slug: "salad-vegetarian",
    name: { en: "Vegetarian Salad", ru: "Вегетарианский салат", tr: "Vejetaryen Salata" },
    description: {
      tr: "Aysberg, salatalık, domates, biber, avokado, havuç, mısır, zeytinyağı, limon suyu",
    },
  },
  "Meksiakana Salatı": {
    slug: "salad-mexican",
    name: { en: "Mexican Salad", ru: "Мексиканский салат", tr: "Meksika Salata" },
    description: { tr: "Aysberg, özel sos, mısır, fasulye, domates, avokado, soğan, tavuk" },
  },
  "Salat Ət ilə": {
    slug: "salad-beef",
    name: { en: "Salad with Beef", ru: "Салат с мясом", tr: "Etli Salata" },
    description: { tr: "Aysberg, domates, salatalık, soğan, özel sos, dana eti" },
  },
  "Tuna salati": {
    slug: "salad-tuna",
    name: { en: "Tuna Salad", ru: "Салат с тунцом", tr: "Ton Balıklı Salata" },
    description: {
      en: "Iceberg, cherry tomatoes, cucumber, olives, pepper, feta, oregano, special sauce",
      ru: "Айсберг, помидоры черри, огурец, оливки, перец, сыр фета, орегано, специальный соус",
      tr: "Aysberg, çeri domates, salatalık, zeytin, biber, feta peyniri, kekik, özel sos",
    },
  },
  "Yunan salati": {
    slug: "salad-greek",
    name: { en: "Greek Salad", ru: "Греческий салат", tr: "Yunan Salata" },
    description: { tr: "Aysberg, çeri domates, salatalık, zeytin, ton balığı, mısır, özel sos" },
  },

  // ---------------------------------------------------------------- soups
  "Mərci Şorbası": {
    slug: "soup-lentil",
    name: { en: "Lentil Soup", ru: "Чечевичный суп", tr: "Mercimek Çorbası" },
    description: {
      en: "Lentils, tomato paste, carrot, onion, spices",
      ru: "Чечевица, томатная паста, морковь, лук, специи",
      tr: "Mercimek, domates salçası, havuç, soğan, baharatlar",
    },
  },

  // --------------------------------------------------------------- snacks
  "Kartof Fri": {
    slug: "snack-fries",
    popular: true,
    name: { en: "French Fries", ru: "Картофель фри", tr: "Patates Kızartması" },
    description: { tr: "Klasik kızarmış patates" },
  },
  "Kartof Dilimləri": {
    slug: "snack-potato-slices",
    spicy: true,
    name: { en: "Potato Slices", ru: "Картофельные ломтики", tr: "Patates Dilimleri" },
    description: { tr: "Baharatlı patates dilimleri" },
  },
  Naggets: {
    slug: "snack-nuggets",
    name: { en: "Nuggets", ru: "Наггетсы", tr: "Nugget" },
    description: { tr: "Tavuk nugget" },
  },
  "Pendir Çubuqları": {
    slug: "snack-cheese-sticks",
    name: { en: "Cheese Sticks", ru: "Сырные палочки", tr: "Peynir Çubukları" },
    description: { tr: "Ekmek krutonu, mozzarella peyniri" },
  },
  "Toyuq Çubuqlari": {
    slug: "snack-chicken-sticks",
    name: { en: "Chicken Sticks", ru: "Куриные палочки", tr: "Tavuk Çubukları" },
    description: { tr: "Ekmek krutonu, tavuk fileto" },
  },
  "Toyuq qanadlari BBQ sous ile": {
    slug: "snack-chicken-wings",
    name: {
      en: "Chicken Wings with BBQ Sauce",
      ru: "Куриные крылышки с соусом BBQ",
      tr: "BBQ Soslu Tavuk Kanat",
    },
    description: { tr: "Tavuk kanat, BBQ sos, susam" },
  },
  "Chicken Schnitzel": {
    slug: "snack-chicken-schnitzel",
    spicy: true,
    name: { en: "Chicken Schnitzel", ru: "Куриный шницель", tr: "Tavuk Şnitzel" },
    // Wolt reads the AZ "Fri" (fries) as "free" in both translations.
    description: {
      en: "French fries, breaded chicken, spicy sauce, cheese sauce",
      ru: "Картофель фри, курица в панировке, острый соус, сырный соус",
      tr: "Patates kızartması, krutonlu tavuk, acılı sos, peynir sosu",
    },
  },

  // ------------------------------------------------------------ milkshake
  "Oreolu Milkşeyk": {
    slug: "milkshake-oreo",
    popular: true,
    name: { en: "Oreo Milkshake", ru: "Молочный коктейль Орео", tr: "Oreolu Milkshake" },
    description: { tr: "" },
  },
  "Vanilli Milkşeyk": {
    slug: "milkshake-vanilla",
    name: { en: "Vanilla Milkshake", ru: "Ванильный молочный коктейль", tr: "Vanilyalı Milkshake" },
    description: { tr: "" },
  },
  "Çiyələkli Milkşeyk": {
    slug: "milkshake-strawberry",
    name: {
      en: "Strawberry Milkshake",
      ru: "Клубничный молочный коктейль",
      tr: "Çilekli Milkshake",
    },
    description: { tr: "" },
  },

  // --------------------------------------------------------------- drinks
  // The bottle size lives in the AZ name; the scraper moves it into `sizes`,
  // so the names below are the product without its volume.
  "Coca-Cola® 330 ml": {
    slug: "drink-coca-cola-330",
    name: { az: "Coca-Cola®", en: "Coca-Cola®", ru: "Coca-Cola®", tr: "Coca-Cola®" },
    description: { tr: "" },
  },
  "Coca-Cola® 500 ml": {
    slug: "drink-coca-cola-500",
    name: { az: "Coca-Cola®", en: "Coca-Cola®", ru: "Coca-Cola®", tr: "Coca-Cola®" },
    description: { tr: "" },
  },
  "Coca-Cola® Şəkərsiz 330 ml": {
    slug: "drink-coca-cola-zero-330",
    name: {
      az: "Coca-Cola® Şəkərsiz",
      en: "Coca-Cola® Zero Sugar",
      ru: "Coca-Cola® без сахара",
      tr: "Coca-Cola® Şekersiz",
    },
    description: { tr: "" },
  },
  "Coca-Cola® Şəkərsiz 500 ml": {
    slug: "drink-coca-cola-zero-500",
    name: {
      az: "Coca-Cola® Şəkərsiz",
      en: "Coca-Cola® Zero Sugar",
      ru: "Coca-Cola® без сахара",
      tr: "Coca-Cola® Şekersiz",
    },
    description: { tr: "" },
  },
  "Fanta® 330 ml": {
    slug: "drink-fanta-330",
    name: { az: "Fanta®", en: "Fanta®", ru: "Fanta®", tr: "Fanta®" },
    description: { tr: "" },
  },
  "Fanta® 500 ml": {
    slug: "drink-fanta-500",
    name: { az: "Fanta®", en: "Fanta®", ru: "Fanta®", tr: "Fanta®" },
    description: { tr: "" },
  },
  "Sprite® 330 ml": {
    slug: "drink-sprite-330",
    name: { az: "Sprite®", en: "Sprite®", ru: "Sprite®", tr: "Sprite®" },
    description: { tr: "" },
  },
  "Sprite® 500 ml": {
    slug: "drink-sprite-500",
    name: { az: "Sprite®", en: "Sprite®", ru: "Sprite®", tr: "Sprite®" },
    description: { tr: "" },
  },
  "Fuse Tea® Limon 500 ml": {
    slug: "drink-fuse-tea-lemon",
    name: {
      az: "Fuse Tea® Limon",
      en: "Fuse Tea® Lemon",
      ru: "Fuse Tea® Лимон",
      tr: "Fuse Tea® Limon",
    },
    description: { tr: "" },
  },
  "Fuse Tea® Şaftalı 500 ml": {
    slug: "drink-fuse-tea-peach",
    name: {
      az: "Fuse Tea® Şaftalı",
      en: "Fuse Tea® Peach",
      ru: "Fuse Tea® Персик",
      tr: "Fuse Tea® Şeftali",
    },
    description: { tr: "" },
  },
  "Cappy® Portağal 500 ml": {
    slug: "drink-cappy-orange-500",
    name: { az: "Cappy® Portağal", en: "Cappy® Orange", ru: "Cappy® Апельсин", tr: "Cappy® Portakal" },
    description: { tr: "" },
  },
  "Cappy® Şaftalı 500 ml": {
    slug: "drink-cappy-peach-500",
    name: { az: "Cappy® Şaftalı", en: "Cappy® Peach", ru: "Cappy® Персик", tr: "Cappy® Şeftali" },
    description: { tr: "" },
  },
  "Cappy® Albalı 500 ml": {
    slug: "drink-cappy-cherry-500",
    name: { az: "Cappy® Albalı", en: "Cappy® Cherry", ru: "Cappy® Вишня", tr: "Cappy® Vişne" },
    description: { tr: "" },
  },
  "Cappy® Multivitamin 500 ml": {
    slug: "drink-cappy-multivitamin-500",
    name: {
      az: "Cappy® Multivitamin",
      en: "Cappy® Multivitamin",
      ru: "Cappy® Мультивитамин",
      tr: "Cappy® Multivitamin",
    },
    description: { tr: "" },
  },
  "Cappy® Albalı 200 ml": {
    slug: "drink-cappy-cherry-200",
    name: { az: "Cappy® Albalı", en: "Cappy® Cherry", ru: "Cappy® Вишня", tr: "Cappy® Vişne" },
    description: { tr: "" },
  },
  "Cappy® Alma 200 ml": {
    slug: "drink-cappy-apple-200",
    name: { az: "Cappy® Alma", en: "Cappy® Apple", ru: "Cappy® Яблоко", tr: "Cappy® Elma" },
    description: { tr: "" },
  },
  "Cappy® Şaftalı 200 ml": {
    slug: "drink-cappy-peach-200",
    name: { az: "Cappy® Şaftalı", en: "Cappy® Peach", ru: "Cappy® Персик", tr: "Cappy® Şeftali" },
    description: { tr: "" },
  },
  "Cappy® Multivitamin 200 ml": {
    slug: "drink-cappy-multivitamin-200",
    name: {
      az: "Cappy® Multivitamin",
      en: "Cappy® Multivitamin",
      ru: "Cappy® Мультивитамин",
      tr: "Cappy® Multivitamin",
    },
    description: { tr: "" },
  },
  "Sirab® Qazlı 500 ml": {
    slug: "drink-sirab-sparkling",
    name: {
      az: "Sirab® Qazlı",
      en: "Sirab® Sparkling",
      ru: "Sirab® газированная",
      tr: "Sirab® Gazlı",
    },
    description: { tr: "" },
  },
  "Ayran Milla® 200 ml": {
    slug: "drink-ayran-milla",
    name: { az: "Ayran Milla®", en: "Ayran Milla®", ru: "Айран Milla®", tr: "Ayran Milla®" },
    description: { tr: "" },
  },
  "Ayran Milla® Nanəli 200 ml": {
    slug: "drink-ayran-milla-mint",
    name: {
      az: "Ayran Milla® Nanəli",
      en: "Ayran Milla® Mint",
      ru: "Айран Milla® с мятой",
      tr: "Ayran Milla® Naneli",
    },
    description: { tr: "" },
  },

  // --------------------------------------------------------------- coffee
  Kappuçino: {
    slug: "coffee-cappuccino",
    popular: true,
    name: { en: "Cappuccino", ru: "Капучино", tr: "Cappuccino" },
    description: { tr: "" },
  },
  Latte: {
    slug: "coffee-latte",
    name: { en: "Latte", ru: "Латте", tr: "Latte" },
    description: { tr: "" },
  },
  Amerikano: {
    slug: "coffee-americano",
    name: { en: "Americano", ru: "Американо", tr: "Americano" },
    description: { tr: "" },
  },

  // --------------------------------------------------------------- sauces
  Ketçup: {
    slug: "sauce-ketchup",
    name: { en: "Ketchup", ru: "Кетчуп", tr: "Ketçap" },
    description: { tr: "" },
  },
  Mayonez: {
    slug: "sauce-mayonnaise",
    name: { en: "Mayonnaise", ru: "Майонез", tr: "Mayonez" },
    description: { tr: "" },
  },
  "Barbekyu Sousu": {
    slug: "sauce-bbq",
    name: { en: "BBQ Sauce", ru: "Соус барбекю", tr: "Barbekü Sos" },
    description: { tr: "" },
  },
  "Pendirli Sous": {
    slug: "sauce-cheese",
    name: { en: "Cheese Sauce", ru: "Сырный соус", tr: "Peynirli Sos" },
    description: { tr: "" },
  },
  "Acılı Sous": {
    slug: "sauce-spicy",
    spicy: true,
    name: { en: "Spicy Sauce", ru: "Острый соус", tr: "Acı Sos" },
    description: { tr: "" },
  },
  "Turşa-Şirin sous": {
    slug: "sauce-sweet-and-sour",
    name: { en: "Sweet and Sour Sauce", ru: "Кисло-сладкий соус", tr: "Tatlı Ekşi Sos" },
    description: { tr: "" },
  },
};
