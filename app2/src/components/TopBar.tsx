import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[72%] h-[55px] z-50 bg-white/20 backdrop-blur-md rounded-xl shadow-md border border-white/40 px-4 flex items-center gap-4">
      <div className="text-xl font-bold text-blue-900 whitespace-nowrap">CU Navigate</div>
      <Input
        id="search-box"
        className="flex-1 h-9 rounded-md text-sm px-3"
        placeholder="Search for a room..."
      />
      <Button id="resetRouteBtn" className="bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-1 rounded-md">
        Reset
      </Button>
    </div>
  );
}