const biryanis = [
  {
    name: "CHICKEN DUM BIRYANI BOWL",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 8.99, regular: 12.99, large: 19.99, extraLarge: 24.99 },
    category: "nonveg",
    image:
      "https://vismaifood.com/storage/app/uploads/public/e12/7b7/127/thumb__700_0_0_0_auto.jpg",
    description: "Aromatic chicken dum biryani: Fragrant basmati rice, marinated chicken, and spices cooked to perfection. Rich, flavorful, unforgettable.",
  },

  {
    name: "FRIED PIECE CHICKEN BIRYANI BOWL",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 9.99, regular: 13.99, large: 20.99, extraLarge: 26.99 },
    category: "nonveg",
    image: "https://i.ytimg.com/vi/rKNkggz1Ni4/maxresdefault.jpg",
    description: "Succulent fried chicken pieces layered with aromatic rice, spices, and herbs in a flavorful biryani.",
  },

  {
    name: "CHICKEN LOLLIPOP BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 12.99, regular: 16.99, large: 26.99, extraLarge: 36.99 },
    category: "nonveg",
    image:
      "https://b.zmtcdn.com/data/dish_photos/fbe/2084a6aa0537c78aee3c981dda41afbe.jpg",
    description: "Tender chicken lollipops and fragrant rice harmonize in a delectable union of flavors. A luscious twist on classic biryani.",
  },

  {
    name: "CHICKEN TIKKA BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 12.99, regular: 16.99, large: 26.99, extraLarge: 36.99 },
    category: "nonveg",
    image:
      "https://soyummyrecipes.co.uk/wp-content/uploads/2023/06/Chicken-tikka-biryani.jpg",
    description: "Succulent chicken tikka infused in aromatic basmati rice, layered with spices for a tantalizing one-pot delight.",
  },

  {
    name: "CHICKEN 65 BIRYANI",
    varients: ["mini", "regular"],
    prices: { mini: 12.99, regular: 16.99 },
    category: "nonveg",
    image:
      "https://desertfoodfeed.com/wp-content/uploads/2020/05/chickenbiryani-1-e1590340468535.jpg",
    description: "Spicy medley of Chicken 65 chunks layered with fragrant rice, exuding aromatic fusion.",
  },

  {
    name: "NATUKODI BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 8.99, regular: 12.99, large: 19.99, extraLarge: 24.99 },
    category: "nonveg",
    image: "https://i.ytimg.com/vi/i4IlWa7UK7E/maxresdefault.jpg",
    description: "A spicy Andhra delight featuring tender country chicken, aromatic rice, and bold spices. Rich, rustic, irresistible.",
  },

  {
    name: "MINT CHICKEN BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 8.99, regular: 12.99, large: 20.99, extraLarge: 28.99 },
    category: "nonveg",
    image:
      "https://www.ruchiskitchen.com/wp-content/uploads/2015/05/Chicken-biryani-recipe-1.jpg",
    description: "Fragrant basmati rice, succulent mint-infused chicken, and spices, slow-cooked to perfection. Irresistible flavor harmony.",
  },

  {
    name: "MUTTON DUM BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 8.99, regular: 13.99, large: 22.99, extraLarge: 28.99 },
    category: "nonveg",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4LTRhBywXnhgICpZz2zZk0l9rpBy4kO48Gr0Fbpa_3ldn8J9qAdCPKk5fHCKNw_BcoPQ&usqp=CAU",
    description: "Succulent marinated mutton layered with fragrant rice, slow-cooked to perfection. Aromatic indulgence.",
  },

  {
    name: "MUTTON PICKLED BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 10.99, regular: 14.99, large: 24.99, extraLarge: 29.99 },
    category: "nonveg",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQBmszNIPF0ZpnXCRLuHM8nPqwlUit4bdzZA&usqp=CAU",
    description: "Succulent mutton, tangy pickles, and fragrant rice, slow-cooked for a zesty, indulgent delight.",
  },

  {
    name: "VEG BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 6.99, regular: 8.99, large: 11.99, extraLarge: 16.99 },
    category: "veg",
    image:
      "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/biryani-recipe-2.jpg",
    description: "Fragrant basmati rice, colorful mixed vegetables, and aromatic spices; a vegetarian delight bursting with flavor.",
  },

  {
    name: "PANEER BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 8.99, regular: 12.99, large: 15.99, extraLarge: 21.99 },
    category: "veg",
    image:
      "https://revi.b-cdn.net/wp-content/uploads/2017/01/paneer-biryani-vert3.jpg",
    description: "Fragrant basmati rice, succulent paneer, and aromatic spices in perfect harmony. A vegetarian masterpiece.",
  },

  {
    name: "PANEER LOLLIPOP BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 8.99, regular: 12.99, large: 19.99, extraLarge: 26.99 },
    category: "veg",
    image: "https://i.ytimg.com/vi/ug6h8Eiy5uI/maxresdefault.jpg",
    description: "Fragrant basmati rice layered with marinated paneer lollipops, aromatic spices; a vegetarian delight.",
  },

  {
    name: "NAVRATNAM BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 7.99, regular: 9.99, large: 12.99, extraLarge: 17.99 },
    category: "veg",
    image:
      "https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/honey-upadhyay20170706220427847.jpeg",
    description: "A royal medley of nine flavorful ingredients in fragrant basmati rice; a vegetarian delight.",
  },

  {
    name: "KAJU PANEER BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 8.99, regular: 10.99, large: 14.99, extraLarge: 18.99 },
    category: "veg",
    image:
      "https://www.spiceupthecurry.com/wp-content/uploads/2019/02/paneer-dum-biryani-recipe-15.jpg",
    description: "Fragrant basmati rice cooked with cashews, paneer, and aromatic spices for a rich, flavorful vegetarian delight.",
  },

  {
    name: "GOBI 65 BIRYANI",
    varients: ["mini", "regular", "large", "extraLarge"],
    prices: { mini: 8.99, regular: 10.99, large: 14.99, extraLarge: 18.99 },
    category: "veg",
    image:
      "https://www.relishthebite.com/wp-content/uploads/2019/09/Mushroom_cauliflower_Biryani-2.jpg",
    description: "Fragrant basmati rice layered with spicy Gobi 65, creating a fusion of textures and flavors.",
  },
];

export default biryanis;