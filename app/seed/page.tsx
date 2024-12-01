import { seedDataProducts } from "@/actions/products";

const SeedPage = async () => {
  await seedDataProducts();

  return (
    <div>
      <h1>Seed</h1>
    </div>
  );
};

export default SeedPage;
