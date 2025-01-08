import { useEffect, useRef } from "react";
import { useGlobalStore } from "../../store/global.store";
import { Cart } from "./Cart";
import { Search } from "./Search";

export const Sheet = () => {
  const sheetContent = useGlobalStore((state) => state.sheetContent);
  const closeSheet = useGlobalStore((state) => state.closeSheet);

  const sheetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    //funcion para manejar clicks fuera del sheet
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event?.target as Node)
      ) {
        closeSheet();
      }
    };

    //agregar el evento de click fuera del shet
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeSheet]);

  //funcion para saber el componente a renderizar
  const renderContent = () => {
    switch (sheetContent) {
      case "cart":
        return <Cart />;
      case "search":
        return <Search />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end animate-fade-in">
      <div
        ref={sheetRef}
        className="bg-white text-black h-screen w-[500px] shadow-lg animate-slide-in"
      >
        {renderContent()}
      </div>
    </div>
  );
};
