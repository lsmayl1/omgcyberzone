"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  sizes: { key: string; price: string }[];
  selectedSizeIndex: number;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
}

interface Category {
  key: string;
  icon: string;
  name: string;
}

const MenuPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("pizza");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: Category[] = [
    { key: "pizza", icon: "/icons/menu/Pizza.png", name: "Пицца" },
    { key: "burger", icon: "/icons/menu/Burger.png", name: "Бургер" },
    { key: "roll", icon: "/icons/menu/Roll.png", name: "Ролл" },
    { key: "sandwich", icon: "/icons/menu/Sandwich.png", name: "Сэндвич" },
    { key: "pasta", icon: "/icons/menu/Pasta.png", name: "Паста" },
    { key: "salads", icon: "/icons/menu/Salad.png", name: "Салаты" },
    { key: "snacks", icon: "/icons/menu/Snacks.png", name: "Закуски" },
    { key: "sweets", icon: "/icons/menu/Sweets.png", name: "Десерт" },
    { key: "drinks", icon: "/icons/menu/Drinks.png", name: "Напитки" },
    { key: "coffee", icon: "/icons/menu/Coffee.png", name: "Кофе" },
    { key: "kalyan", icon: "/icons/menu/Kalyan.png", name: "Кальян" },
  ];

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // Pizza
    {
      id: 1,
      name: "Пицца BBQ с курицей",
      description: "Соус барбекю, сыр гауда, сыр чеддер, лук, перец, курица",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "13.00 ₼" },
        { key: "30 см", price: "15.00 ₼" },
        { key: "35 см", price: "18.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-bbq-chicken.avif",
      isPopular: true,
    },
    {
      id: 2,
      name: "Пепперони классика",
      description: "Томатный соус, моцарелла, пепперони, орегано",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "14.00 ₼" },
        { key: "30 см", price: "17.00 ₼" },
        { key: "35 см", price: "20.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
      isPopular: true,
    },
    {
      id: 3,
      name: "Маргарита",
      description: "Томатный соус, моцарелла, базилик, оливковое масло",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "11.00 ₼" },
        { key: "30 см", price: "14.00 ₼" },
        { key: "35 см", price: "16.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-marqarita.avif",
    },
    {
      id: 4,
      name: "Гавайская",
      description: "Ветчина, ананас, моцарелла, томатный соус",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "12.00 ₼" },
        { key: "30 см", price: "15.00 ₼" },
        { key: "35 см", price: "18.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-hawaiian.avif",
    },
    {
      id: 5,
      name: "Вегетарианская",
      description: "Шампиньоны, перец, оливки, томаты, моцарелла",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "12.00 ₼" },
        { key: "30 см", price: "15.00 ₼" },
        { key: "35 см", price: "18.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-vegetarian.avif",
    },
    {
      id: 6,
      name: "Каприччоза",
      description: "Ветчина, шампиньоны, артишоки, оливки, моцарелла",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "13.00 ₼" },
        { key: "30 см", price: "16.00 ₼" },
        { key: "35 см", price: "19.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-capricciossa.avif",
      isPopular: true,
    },
    {
      id: 7,
      name: "Мексиканская",
      description: "Халапеньо, фарш, фасоль, кукуруза, соус чили",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "14.00 ₼" },
        { key: "30 см", price: "17.00 ₼" },
        { key: "35 см", price: "20.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-mexico.avif",
      isSpicy: true,
    },
    {
      id: 8,
      name: "С тунцом",
      description: "Тунец, моцарелла, лук, томаты, оливки",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "15.00 ₼" },
        { key: "30 см", price: "18.00 ₼" },
        { key: "35 см", price: "21.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-tuna.avif",
    },
    {
      id: 9,
      name: "С курицей",
      description: "Куриное филе, шампиньоны, сыр, сливочный соус",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "13.00 ₼" },
        { key: "30 см", price: "16.00 ₼" },
        { key: "35 см", price: "19.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-chicken.avif",
    },
    {
      id: 10,
      name: "С сосисками",
      description: "Сосиски, сыр моцарелла, томаты, соус",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "12.00 ₼" },
        { key: "30 см", price: "15.00 ₼" },
        { key: "35 см", price: "18.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-sosisli.avif",
    },
    {
      id: 11,
      name: "Мясная",
      description: "Пепперони, ветчина, бекон, фарш, моцарелла",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "16.00 ₼" },
        { key: "30 см", price: "19.00 ₼" },
        { key: "35 см", price: "23.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-et.avif",
      isPopular: true,
    },
    {
      id: 12,
      name: "Вау пицца",
      description: "Фирменный рецепт: курица, бекон, халапеньо, сыр",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "15.00 ₼" },
        { key: "30 см", price: "18.00 ₼" },
        { key: "35 см", price: "22.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-wow.avif",
      isPopular: true,
    },
    {
      id: 13,
      name: "Гранд микс",
      description: "Ассорти: пепперони, ветчина, грибы, оливки",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "17.00 ₼" },
        { key: "30 см", price: "20.00 ₼" },
        { key: "35 см", price: "24.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-qrandmix.avif",
    },
    {
      id: 14,
      name: "Цезарь пицца",
      description: "Курица, пармезан, салат ромэн, соус цезарь",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "14.00 ₼" },
        { key: "30 см", price: "17.00 ₼" },
        { key: "35 см", price: "20.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-sezar.avif",
    },
    {
      id: 15,
      name: "Мексиканская с курицей",
      description: "Курица, халапеньо, кукуруза, фасоль, чипотле",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "14.00 ₼" },
        { key: "30 см", price: "17.00 ₼" },
        { key: "35 см", price: "20.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-mexican-chicken.avif",
      isSpicy: true,
    },
    {
      id: 16,
      name: "С наггетсами",
      description: "Наггетсы, сыр, томаты, соус ранч",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "13.00 ₼" },
        { key: "30 см", price: "16.00 ₼" },
        { key: "35 см", price: "19.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-naggets.avif",
    },
    {
      id: 17,
      name: "Греческая",
      description: "Фета, оливки, томаты, огурцы, орегано",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "13.00 ₼" },
        { key: "30 см", price: "16.00 ₼" },
        { key: "35 см", price: "19.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-yunan.avif",
    },
    {
      id: 18,
      name: "Грибная",
      description: "Шампиньоны, трюфельное масло, моцарелла, лук",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "14.00 ₼" },
        { key: "30 см", price: "17.00 ₼" },
        { key: "35 см", price: "20.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-mushroom.avif",
    },
    {
      id: 19,
      name: "Болоньезе",
      description: "Фарш из говядины, томаты, пармезан, базилик",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "14.00 ₼" },
        { key: "30 см", price: "17.00 ₼" },
        { key: "35 см", price: "20.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-bolonyeze.avif",
    },
    {
      id: 20,
      name: "Техас",
      description: "Говядина, бекон, халапеньо, лук барбекю",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "15.00 ₼" },
        { key: "30 см", price: "18.00 ₼" },
        { key: "35 см", price: "21.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-texas.avif",
      isSpicy: true,
    },
    {
      id: 21,
      name: "Кокомикс",
      description: "Ветчина, шампиньоны, курица, сыр, сливки",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "14.00 ₼" },
        { key: "30 см", price: "17.00 ₼" },
        { key: "35 см", price: "20.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-cocomix.avif",
    },
    {
      id: 22,
      name: "Песто",
      description: "Соус песто, моцарелла, томаты черри, пармезан",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "13.00 ₼" },
        { key: "30 см", price: "16.00 ₼" },
        { key: "35 см", price: "19.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-pesto.avif",
    },
    {
      id: 23,
      name: "Сырная пицца",
      description: "Моцарелла, чеддер, пармезан, сливочный сыр",
      category: "pizza",
      sizes: [
        { key: "25 см", price: "13.00 ₼" },
        { key: "30 см", price: "16.00 ₼" },
        { key: "35 см", price: "19.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-cheezy-pizzy.avif",
      isPopular: true,
    },
    // Burgers
    {
      id: 24,
      name: "Чизбургер",
      description: "Котлета из говядины, чеддер, лук, томат, соус",
      category: "burger",
      sizes: [
        { key: "Стандарт", price: "12.00 ₼" },
        { key: "Двойной", price: "16.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
      isPopular: true,
    },
    {
      id: 25,
      name: "Бургер Классический",
      description: "Котлета из говядины, салат, томат, лук, фирменный соус",
      category: "burger",
      sizes: [
        { key: "Стандарт", price: "14.00 ₼" },
        { key: "Двойной", price: "18.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    // Rolls
    {
      id: 26,
      name: "Филадельфия",
      description: "Лосось, сливочный сыр, огурец, авокадо",
      category: "roll",
      sizes: [
        { key: "8 шт", price: "15.00 ₼" },
        { key: "12 шт", price: "21.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
      isPopular: true,
    },
    {
      id: 27,
      name: "Калифорния",
      description: "Снежный краб, икра масаго, огурец, авокадо",
      category: "roll",
      sizes: [
        { key: "8 шт", price: "13.00 ₼" },
        { key: "12 шт", price: "18.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    // Salads
    {
      id: 28,
      name: "Цезарь с курицей",
      description: "Ромэн, пармезан, сухарики, куриное филе, соус цезарь",
      category: "salads",
      sizes: [
        { key: "250 г", price: "9.00 ₼" },
        { key: "400 г", price: "14.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    {
      id: 29,
      name: "Греческий салат",
      description: "Огурцы, томаты, оливки, фета, оливковое масло",
      category: "salads",
      sizes: [
        { key: "300 г", price: "10.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    // Pasta
    {
      id: 30,
      name: "Карбонара",
      description: "Спагетти, бекон, сливки, пармезан, яичный желток",
      category: "pasta",
      sizes: [
        { key: "350 г", price: "13.00 ₼" },
        { key: "500 г", price: "18.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
      isPopular: true,
    },
    {
      id: 31,
      name: "Болоньезе",
      description: "Спагетти, фарш из говядины, томаты, пармезан",
      category: "pasta",
      sizes: [
        { key: "350 г", price: "14.00 ₼" },
        { key: "500 г", price: "19.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    // Sweets
    {
      id: 32,
      name: "Тирамису",
      description: "Классический итальянский десерт с маскарпоне",
      category: "sweets",
      sizes: [{ key: "150 г", price: "8.00 ₼" }],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    {
      id: 33,
      name: "Чизкейк Нью-Йорк",
      description: "Нежный сливочный сыр, клубничный соус",
      category: "sweets",
      sizes: [{ key: "180 г", price: "9.00 ₼" }],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    // Snacks
    {
      id: 34,
      name: "Картофель фри",
      description: "Хрустящий картофель с солью и специями",
      category: "snacks",
      sizes: [
        { key: "100 г", price: "4.00 ₼" },
        { key: "200 г", price: "7.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    {
      id: 35,
      name: "Куриные крылышки",
      description: "Острые крылышки в соусе барбекю",
      category: "snacks",
      sizes: [
        { key: "6 шт", price: "8.00 ₼" },
        { key: "12 шт", price: "14.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
      isSpicy: true,
    },
    // Drinks
    {
      id: 36,
      name: "Лимонад Домашний",
      description: "Натуральный лимонад с мятой и лимоном",
      category: "drinks",
      sizes: [
        { key: "0.3 л", price: "4.00 ₼" },
        { key: "0.5 л", price: "6.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    {
      id: 37,
      name: "Кофе Капучино",
      description: "Эспрессо с молочной пенкой",
      category: "coffee",
      sizes: [
        { key: "200 мл", price: "5.00 ₼" },
        { key: "300 мл", price: "7.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
    // Kalyan
    {
      id: 38,
      name: "Кальян Классический",
      description: "Табак Al Fakher, классическая чаша",
      category: "kalyan",
      sizes: [
        { key: "Стандарт", price: "25.00 ₼" },
        { key: "Премиум", price: "35.00 ₼" },
      ],
      selectedSizeIndex: 0,
      image: "/menu-food/pizza-peperoni.avif",
    },
  ]);

  const handleSizeChange = (itemId: number, newSizeIndex: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, selectedSizeIndex: newSizeIndex }
          : item,
      ),
    );
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allItems = [{ key: "all", icon: "", name: "Все" }, ...categories];

  return (
    <div className="flex flex-col container-custom pt-26 pb-8 min-h-screen">
      {/* Hero Section - Modern Split Layout */}
      <div className="relative bg-boxColor rounded-3xl overflow-hidden mb-8">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="relative p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-mainRed/20 border border-mainRed/30 rounded-full px-4 py-2 mb-4 w-fit">
              <span className="w-2 h-2 bg-mainRed rounded-full animate-pulse" />
              <span className="text-mainRed text-sm font-semibold">Добро пожаловать</span>
            </div>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Вкусная еда
              <br />
              <span className="text-mainRed">в уютной атмосфере</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg">
              Лучшие блюда от шеф-повара. Свежие ингредиенты, авторские рецепты
              и незабываемый вкус в нашем ресторане.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-white">30+</div>
                <div className="text-gray-400 text-sm">видов пиццы</div>
              </div>
              <div className="w-px bg-gray-700 h-12" />
              <div>
                <div className="text-3xl font-bold text-white">15 мин</div>
                <div className="text-gray-400 text-sm">время подачи</div>
              </div>
              <div className="w-px bg-gray-700 h-12" />
              <div>
                <div className="text-3xl font-bold text-white">4.9</div>
                <div className="text-gray-400 text-sm">рейтинг</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="group bg-mainRed hover:bg-red-700 text-white rounded-xl px-8 py-4 font-bold text-lg transition-all hover:shadow-xl hover:shadow-mainRed/30 active:scale-95 flex items-center gap-2">
                Забронировать столик
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="border-2 border-white/30 text-white rounded-xl px-8 py-4 font-bold text-lg hover:bg-white/10 hover:border-white transition-all active:scale-95">
                Посмотреть меню
              </button>
            </div>
          </div>

          {/* Right - Food Image Showcase */}
          <div className="relative min-h-[400px] lg:min-h-full">
            {/* Main Hero Image */}
            <div className="absolute inset-0">
              <Image
                src="/menu-food/pizza-peperoni.avif"
                alt="Pizza"
                fill
                className="object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-l from-boxColor via-boxColor/50 to-transparent lg:bg-gradient-to-r" />
            </div>

         
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-white text-3xl font-bold border-l-4 border-mainRed pl-4 uppercase">
          Меню
        </h2>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск блюд..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-boxColor text-white px-4 py-3 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-mainRed transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation with Drag Scroll */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-2 pb-4 mb-6 no-scrollbar-buttons scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseDown={(e) => {
          e.preventDefault();
          const container = scrollRef.current;
          if (!container) return;

          const startX = e.pageX;
          const startScroll = container.scrollLeft;
          container.style.cursor = "grabbing";

          const onMove = (e: MouseEvent) => {
            const dx = e.pageX - startX;
            container.scrollLeft = startScroll - dx;
          };

          const onUp = () => {
            container.style.cursor = "grab";
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
          };

          document.addEventListener("mousemove", onMove);
          document.addEventListener("mouseup", onUp);
        }}
      >
        {allItems.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex-shrink-0 flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 min-w-[110px] ${
              activeCategory === cat.key
                ? "bg-mainRed text-white shadow-lg shadow-mainRed/30"
                : "bg-boxColor text-white hover:bg-mainRed/80"
            }`}
          >
            {cat.icon && (
              <Image
                src={cat.icon}
                alt={cat.name}
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
            )}
            <span className="text-xs font-semibold whitespace-nowrap">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">
          Найдено:{" "}
          <span className="text-white font-semibold">
            {filteredItems.length}
          </span>{" "}
          блюд
        </p>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-boxColor rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-mainRed/10 hover:-translate-y-1"
          >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {item.isPopular && (
                  <span className="bg-mainRed text-white text-xs font-bold px-2 py-1 rounded-full">
                    Популярное
                  </span>
                )}
                {item.isSpicy && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Острое
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col gap-3">
              <div>
                <h3 className="text-white text-lg font-bold mb-1 group-hover:text-mainRed transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 min-h-6">
                  {item.description}
                </p>
              </div>

              {/* Size Options */}
              <div className="flex flex-wrap gap-2">
                {item.sizes.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSizeChange(item.id, idx)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                      item.selectedSizeIndex === idx
                        ? "bg-mainRed text-white"
                        : "bg-background text-gray-400 hover:bg-mainRed/50 hover:text-white"
                    }`}
                  >
                    {size.key}
                  </button>
                ))}
              </div>

              {/* Price and Add Button */}
              <div className="flex items-center  pt-3  justify-end">
                <div className="flex flex-col ">
                  <span className="text-gray-400 text-xs">Цена:</span>
                  <span className="text-white text-xl font-bold">
                    {item.sizes[item.selectedSizeIndex].price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-24 h-24 text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-400 text-lg">Ничего не найдено</p>
          <p className="text-gray-500 text-sm mt-1">
            Попробуйте изменить запрос или категорию
          </p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
