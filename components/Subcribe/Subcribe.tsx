import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

const Subcribe = () => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
};

export default Subcribe;
