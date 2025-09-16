import { 
    createContext, 
    useContext, 
    useState, 
    useRef, 
    useEffect, 
    RefObject, 
    ReactNode 
} from "react";

type SidebarContextType = {
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    sidebarRef: RefObject<HTMLDivElement | null>;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const closeSidebar = () => setIsOpen(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (sidebarRef.current &&!sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } 
        else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar, sidebarRef }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("useSidebar must be used within SidebarProvider");
    }

    return context;
};
