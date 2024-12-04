import CrateProduct from "@/components/Dashboard/CreateProduct";
import LayoutDashboard from "@/components/ui/LayoutDashboard/LayoutDashboard";

const AddProductPage = () => {
  return (
    <LayoutDashboard>
      <h2>Add Product</h2>
      <div className="w-full mx-auto py-5">
        <CrateProduct />
      </div>
    </LayoutDashboard>
  );
};

export default AddProductPage;
