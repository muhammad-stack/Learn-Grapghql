import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { Product } from "@/app/types/type";

const gql = String.raw;
let dunmmyProducts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg",
      "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    ],
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/2/1.jpg",
      "https://cdn.dummyjson.com/product-images/2/2.jpg",
      "https://cdn.dummyjson.com/product-images/2/3.jpg",
      "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    ],
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
    images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
  },
];
const typeDefs = gql`
  type Query {
    getProducts: [Product]
    getUserName: String
  }

  type Mutation {
    createProduct(products: Producttype): Product
    deleteProduct(id: Int): String
  }
  input Producttype {
    id: ID
    title: String
    description: String
    price: Float
    discountPercentage: Float
    rating: Float
    stock: Int
    brand: String
    category: String
    thumbnail: String
    images: [String]
  }
  type Product {
    id: ID
    title: String
    description: String
    price: Float
    discountPercentage: Float
    rating: Float
    stock: Int
    brand: String
    category: String
    thumbnail: String
    images: [String]
  }
`;
const resolvers = {
  Query: {
    getProducts: () => {
      return dunmmyProducts;
    },
    getUserName: () => {
      return "Muhammad Ali";
    },
  },
  Mutation: {
    createProduct: (
      root: {},
      args: {
        products: {};
      },
      context: {},
      info: {}
    ) => {
      console.log(args, "args");
      dunmmyProducts.push(args.products);
      return args.products;
    },

    deleteProduct: (
      root: {},
      args: {
        id: number;
      },
      context: {},
      info: {}
    ) => {
      dunmmyProducts = dunmmyProducts.filter(
        (product) => product.id !== args.id
      );
      return "Product is Sucssefully deleted";
    },
  },
};

// POST,PUT,DELETE,GET

// QUERY = GET
// MUTATION = PUT,DELETE,GET
// SUBSCRIPTIONS

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
