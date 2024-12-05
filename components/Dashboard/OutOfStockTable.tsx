"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/Product";

type Props = {
  products: Product[];
};

const OutOfStockTable = ({ products }: Props) => {
  const outStockProducts = products.filter(
    (product) => product.inStock === "out"
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Out of Stock Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {outStockProducts.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-red-500">
                    Out of Stock
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutOfStockTable;
