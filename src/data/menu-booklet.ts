export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    image?: string; // We might use placeholders or generated images later
    tags?: string[];
};

export type MenuCategory = {
    id: string;
    title: string;
    tagline: string;
    coverImage?: string; // URL for the category cover
    items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
    {
        id: "coffee-specialties",
        title: "Coffee Specialties",
        tagline: "Brewed the old-school way",
        items: [
            {
                id: "americano",
                name: "Americano",
                description: "Rich espresso diluted with hot water for a smooth finish.",
                price: "₹320",
                image: "/images/menu/americano.png",
                tags: ["BOLD", "CLASSIC"],
            },
            {
                id: "espresso",
                name: "Espresso",
                description: "A concentrated shot of straight caffeine.",
                price: "₹240",
                image: "/images/menu/espresso.png",
                tags: ["STRONG", "PURE"],
            },
            {
                id: "cappuccino",
                name: "Cappuccino",
                description: "Equal parts espresso, steamed milk, and foam.",
                price: "₹360",
                image: "/images/menu/cappuccino.png",
                tags: ["CREAMY", "TRADITIONAL"],
            },
            {
                id: "latte",
                name: "Latte",
                description: "Espresso with steamed milk and a light layer of foam.",
                price: "₹380",
                image: "/images/menu/latte.png",
                tags: ["SMOOTH", "MILKY"],
            },
            {
                id: "flat-white",
                name: "Flat White",
                description: "Espresso with microfoam milk.",
                price: "₹380",
                image: "/images/menu/flat-white.png",
                tags: ["VELVETY"],
            },
            {
                id: "cold-brew",
                name: "Cold Brew",
                description: "Steeped for 24 hours for maximum smoothness.",
                price: "₹400",
                image: "/images/menu/cold-brew.png",
                tags: ["COLD", "SMOOTH"],
            },
        ],
    },
    {
        id: "non-caffeinated",
        title: "Non-Caffeinated Drinks",
        tagline: "Comfort in a cup, sans jitters",
        items: [
            {
                id: "hot-chocolate",
                name: "Hot Chocolate",
                description: "Rich cocoa with steamed milk and marshmallows.",
                price: "₹340",
                image: "/images/menu/hot-chocolate.png",
                tags: ["SWEET", "WARM"],
            },
            {
                id: "turmeric-milk",
                name: "Turmeric Milk",
                description: "Golden milk with warming spices.",
                price: "₹360",
                image: "/images/menu/turmeric-milk.png",
                tags: ["SPICY", "HEALING"],
            },
            {
                id: "vanilla-steamer",
                name: "Vanilla Steamed Milk",
                description: "Warm milk with vanilla bean syrup.",
                price: "₹280",
                image: "/images/menu/vanilla-steamed-milk.png",
                tags: ["SIMPLE", "COMFORT"],
            },
        ],
    },
    {
        id: "tea",
        title: "Tea & Green Tea",
        tagline: "Leafy goodness for the soul",
        items: [
            {
                id: "classic-green",
                name: "Classic Green Tea",
                description: "Pure green tea leaves steeped to perfection.",
                price: "₹280",
                image: "/images/menu/classic-green-tea.png",
                tags: ["REFRESHING"],
            },
            {
                id: "jasmine-green",
                name: "Jasmine Green Tea",
                description: "Green tea scented with jasmine blossoms.",
                price: "₹300",
                image: "/images/menu/jasmine-green-tea.png",
                tags: ["WALLFLOWER"],
            },
            {
                id: "lemon-honey",
                name: "Lemon Honey Tea",
                description: "Black tea with fresh lemon and honey.",
                price: "₹300",
                image: "/images/menu/lemon-honey-tea.png",
                tags: ["CITRUSY", "SWEET"],
            },
        ],
    },
    {
        id: "matcha",
        title: "Matcha",
        tagline: "Vibrant green energy",
        items: [
            {
                id: "matcha-latte",
                name: "Matcha Latte",
                description: "Premium matcha whisked with steamed milk.",
                price: "₹420",
                image: "/images/menu/matcha-latte.png",
                tags: ["EARTHY", "CREAMY"],
            },
            {
                id: "iced-matcha",
                name: "Iced Matcha",
                description: "Matcha served over ice with choice of milk.",
                price: "₹420",
                image: "/images/menu/iced-matcha.png",
                tags: ["COOL", "VIBRANT"],
            },
            {
                id: "matcha-vanilla",
                name: "Matcha Vanilla Blend",
                description: "Matcha blended with vanilla and ice.",
                price: "₹460",
                image: "/images/menu/matcha-vanilla-blend.png",
                tags: ["SWEET", "FROZEN"],
            },
        ],
    },
    {
        id: "smoothies",
        title: "Smoothies",
        tagline: "Fruit-forward refreshments",
        items: [
            {
                id: "berry-smoothie",
                name: "Berry Smoothie",
                description: "Mixed berries blended with yogurt.",
                price: "₹480",
                image: "/images/menu/berry-smoothie.png",
                tags: ["FRUITY", "TART"],
            },
            {
                id: "mango-smoothie",
                name: "Mango Smoothie",
                description: "Sweet mango blended with ice and milk.",
                price: "₹480",
                image: "/images/menu/mango-smoothie.png",
                tags: ["TROPICAL", "SWEET"],
            },
            {
                id: "banana-peanut",
                name: "Banana Peanut Smoothie",
                description: "Banana and peanut butter protein blend.",
                price: "₹520",
                image: "/images/menu/banana-peanut-smoothie.png",
                tags: ["PROTEIN", "NUTTY"],
            },
        ],
    },
    {
        id: "juices",
        title: "Juices",
        tagline: "Freshly squeezed vitality",
        items: [
            {
                id: "cucumber-celery-detox",
                name: "Cucumber Celery Detox",
                description: "Cool cucumber and crisp celery for a refreshing reset.",
                price: "₹520",
                image: "/images/menu/cucumber-celery-detox.png",
                tags: ["DETOX", "FRESH"],
            },
            {
                id: "orange-carrot-glow",
                name: "Orange Carrot Glow",
                description: "Zesty orange and sweet carrot for a vitamin boost.",
                price: "₹520",
                image: "/images/menu/orange-carrot-glow.png",
                tags: ["VITAMIN C", "GLOW"],
            },
            {
                id: "orange-pineapple",
                name: "Orange Pineapple",
                description: "Tropical sweetness with a citrus kick.",
                price: "₹540",
                image: "/images/menu/orange-pineapple.png",
                tags: ["TROPICAL", "SWEET"],
            },
            {
                id: "bcg",
                name: "BCG",
                description: "Beetroot, Carrot, Ginger. The ultimate root energy mix.",
                price: "₹540",
                image: "/images/menu/bcg.png",
                tags: ["ENERGY", "ROOTS"],
            },
            {
                id: "fennel-apple",
                name: "Fennel Apple",
                description: "Crisp apple with the aromatic calm of fennel.",
                price: "₹520",
                image: "/images/menu/fennel-apple.png",
                tags: ["AROMATIC", "CRISP"],
            },
        ],
    },
];
