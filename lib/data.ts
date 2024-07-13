import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: "Emily",
      email: "emily@krishaq.com",
      password: bcrypt.hashSync("emilyspass"),
      isAdmin: false
    },
    {
      name: "Michael",
      email: "michael@dummy.com",
      password: bcrypt.hashSync("michaelwpass"),
      isAdmin: false
    },
    {
      name: "Sophia",
      email: "sophia@dummy.com",
      password: bcrypt.hashSync("sophiabpass"),
      isAdmin: false
    },
    {
      name: "James",
      email: "james@dummy.com",
      password: bcrypt.hashSync("jamesdpass"),
      isAdmin: false
    },
    {
      name: "Emma",
      email: "emma@dummy.com",
      password: bcrypt.hashSync("emmajpass"),
      isAdmin: false
    },
    {
      name: "Olivia",
      email: "olivia@dummy.com",
      password: bcrypt.hashSync("oliviawpass"),
      isAdmin: false
    },
    {
      name: "Alexander",
      email: "alexander@dummy.com",
      password: bcrypt.hashSync("alexanderjpass"),
      isAdmin: false
    },
    {
      name: "Ava",
      email: "ava@dummy.com",
      password: bcrypt.hashSync("avatpass"),
      isAdmin: false
    },
    {
      name: "Ethan",
      email: "ethan@dummy.com",
      password: bcrypt.hashSync("ethanmpass"),
      isAdmin: false
    },
    {

      name: "Isabella",
      email: "isabella@dummy.com",
      password: bcrypt.hashSync("isabelladpass"),
      isAdmin: false
    }
  ],
  products: [
    {
      title: "Essence Mascara Lash Princess",
      description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      category: "beauty",
      isFeatured: false,
      price: 9.99,
      rating: 4.94,
      stock: 5,
      brand: "Essence",
      sku: "RCH45Q1A",
      reviews: [
        {
          rating: 2,
          comment: "Very unhappy with my purchase!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "John Doe",
          reviewerEmail: "john.doe@x.dummyjson.com"
        },
        {
          rating: 2,
          comment: "Not as described!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Nolan Gonzalez",
          reviewerEmail: "nolan.gonzalez@x.dummyjson.com"
        },
        {
          rating: 5,
          comment: "Very satisfied!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Scarlett Wright",
          reviewerEmail: "scarlett.wright@x.dummyjson.com"
        }
      ],
      returnPolicy: "30 days return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
    },
    {
      title: "Eyeshadow Palette with Mirror",
      description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      category: "beauty",
      isFeatured: true,
      price: 19.99,
      rating: 3.28,
      stock: 44,
      brand: "Glamour Beauty",
      sku: "MVCFH27F",
      reviews: [
        {
          rating: 4,
          comment: "Very satisfied!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Liam Garcia",
          reviewerEmail: "liam.garcia@x.dummyjson.com"
        },
        {
          rating: 1,
          comment: "Very disappointed!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Nora Russell",
          reviewerEmail: "nora.russell@x.dummyjson.com"
        },
        {
          rating: 5,
          comment: "Highly impressed!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Elena Baker",
          reviewerEmail: "elena.baker@x.dummyjson.com"
        }
      ],
      returnPolicy: "30 days return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
    },
    {
      title: "Powder Canister",
      description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
      category: "beauty",
      isFeatured: false,
      price: 14.99,
      rating: 3.82,
      stock: 59,
      brand: "Velvet Touch",
      sku: "9EN8WLT2",
      reviews: [
        {
          rating: 5,
          comment: "Very happy with my purchase!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Ethan Thompson",
          reviewerEmail: "ethan.thompson@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Great value for money!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Levi Hicks",
          reviewerEmail: "levi.hicks@x.dummyjson.com"
        },
        {
          rating: 5,
          comment: "Highly impressed!",
          date: "2024-05-23T08:56:21.618Z",
          reviewerName: "Hazel Gardner",
          reviewerEmail: "hazel.gardner@x.dummyjson.com"
        }
      ],
      returnPolicy: "60 days return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
    },
    {
      title: "Red Lipstick",
      description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
      category: "beauty",
      isFeatured: false,
      price: 12.99,
      rating: 2.51,
      stock: 68,
      brand: "Chic Cosmetics",
      sku: "O5IF1NTA",
      reviews: [
        {
          rating: 5,
          comment: "Great product!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Leo Rivera",
          reviewerEmail: "leo.rivera@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Very pleased!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Oscar Powers",
          reviewerEmail: "oscar.powers@x.dummyjson.com"
        },
        {
          rating: 5,
          comment: "Very pleased!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Carter Rivera",
          reviewerEmail: "carter.rivera@x.dummyjson.com"
        }
      ],
      returnPolicy: "90 days return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/1.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png"
    },
    {
      title: "Red Nail Polish",
      description: "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
      category: "beauty",
      isFeatured: false,
      price: 8.99,
      rating: 3.91,
      stock: 71,
      brand: "Nail Couture",
      sku: "YUIIIP4W",
      reviews: [
        {
          rating: 5,
          comment: "Very pleased!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Leo Rivera",
          reviewerEmail: "leo.rivera@x.dummyjson.com"
        },
        {
          rating: 5,
          comment: "Great product!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Evan Reed",
          reviewerEmail: "evan.reed@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Highly recommended!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Evelyn Sanchez",
          reviewerEmail: "evelyn.sanchez@x.dummyjson.com"
        }
      ],
      returnPolicy: "No return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png"
    },
    {
      title: "Calvin Klein CK One",
      description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
      category: "fragrances",
      isFeatured: false,
      price: 49.99,
      rating: 4.85,
      stock: 17,
      brand: "Calvin Klein",
      sku: "DZM2JQZE",
      reviews: [
        {
          rating: 5,
          comment: "Great value for money!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Sophia Brown",
          reviewerEmail: "sophia.brown@x.dummyjson.com"
        },
        {
          rating: 3,
          comment: "Very disappointed!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Madison Collins",
          reviewerEmail: "madison.collins@x.dummyjson.com"
        },
        {
          rating: 1,
          comment: "Poor quality!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Maya Reed",
          reviewerEmail: "maya.reed@x.dummyjson.com"
        }
      ],
      returnPolicy: "No return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/1.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/2.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/3.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png"
    },
    {
      title: "Chanel Coco Noir Eau De",
      description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
      category: "fragrances",
      isFeatured: true,
      price: 129.99,
      rating: 2.76,
      stock: 41,
      brand: "Chanel",
      sku: "K71HBCGS",
      reviews: [
        {
          rating: 1,
          comment: "Disappointing product!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Lincoln Kelly",
          reviewerEmail: "lincoln.kelly@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Great product!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Lincoln Kelly",
          reviewerEmail: "lincoln.kelly@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Excellent quality!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Lucas Allen",
          reviewerEmail: "lucas.allen@x.dummyjson.com"
        }
      ],
      returnPolicy: "60 days return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/1.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/2.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/3.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png"
    },
    {
      title: "Dior J'adore",
      description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
      category: "fragrances",
      isFeatured: false,
      price: 89.99,
      rating: 3.31,
      stock: 91,
      brand: "Dior",
      sku: "E70NB03B",
      reviews: [
        {
          rating: 5,
          comment: "Fast shipping!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Zoe Nicholson",
          reviewerEmail: "zoe.nicholson@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Excellent quality!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Addison Wright",
          reviewerEmail: "addison.wright@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Would buy again!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Clara Berry",
          reviewerEmail: "clara.berry@x.dummyjson.com"
        }
      ],
      returnPolicy: "7 days return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/1.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/2.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/3.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png"
    },
    {
      title: "Dolce Shine Eau de",
      description: "Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It's a joyful and youthful scent.",
      category: "fragrances",
      isFeatured: true,
      price: 69.99,
      rating: 2.68,
      stock: 3,
      brand: "Dolce & Gabbana",
      sku: "1NBFK980",
      reviews: [
        {
          rating: 4,
          comment: "Very satisfied!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Xavier Wright",
          reviewerEmail: "xavier.wright@x.dummyjson.com"
        },
        {
          rating: 1,
          comment: "Poor quality!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Mila Hernandez",
          reviewerEmail: "mila.hernandez@x.dummyjson.com"
        },
        {
          rating: 5,
          comment: "Very happy with my purchase!",
          date: "2024-05-23T08:56:21.619Z",
          reviewerName: "Sophia Brown",
          reviewerEmail: "sophia.brown@x.dummyjson.com"
        }
      ],
      returnPolicy: "30 days return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/1.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/2.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/3.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png"
    },
    {

      title: "Gucci Bloom Eau de",
      description: "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
      category: "fragrances",
      isFeatured: false,
      price: 79.99,
      rating: 2.69,
      stock: 93,
      brand: "Gucci",
      sku: "FFKZ6HOF",
      reviews: [
        {
          rating: 5,
          comment: "Great value for money!",
          date: "2024-05-23T08:56:21.620Z",
          reviewerName: "Aria Parker",
          reviewerEmail: "aria.parker@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Excellent quality!",
          date: "2024-05-23T08:56:21.620Z",
          reviewerName: "Natalie Harris",
          reviewerEmail: "natalie.harris@x.dummyjson.com"
        },
        {
          rating: 4,
          comment: "Fast shipping!",
          date: "2024-05-23T08:56:21.620Z",
          reviewerName: "Ava Harris",
          reviewerEmail: "ava.harris@x.dummyjson.com"
        }
      ],
      returnPolicy: "No return policy",
      images: [
        "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/2.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/3.png"
      ],
      thumbnail: "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png"
    }
  ]
}

export default data