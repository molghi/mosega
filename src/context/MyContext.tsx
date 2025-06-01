import { createContext, ReactNode, useState } from "react";

// Define types
interface MyContextType {
    results: any[];
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
    details: { [key: string]: any };
    setDetails: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    showType: number;
    setShowType: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    gameScreens: any;
    setGameScreens: React.Dispatch<React.SetStateAction<any>>;
}

// Create Context
const MyContext = createContext<MyContextType | undefined>(undefined);

// Context Provider Props
interface ContextProviderProps {
    children: ReactNode;
}

// Context Provider
export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [results, setResults] = useState<any[]>([]); // type: array of objects
    const [showType, setShowType] = useState<number>(0); // 0 for Movies, 1 for Series, 2 for Games
    const [details, setDetails] = useState<{ [key: string]: any }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [gameScreens, setGameScreens] = useState<any>(null);

    return (
        <MyContext.Provider
            value={{
                results,
                setResults,
                showType,
                setShowType,
                details,
                setDetails,
                isLoading,
                setIsLoading,
                gameScreens,
                setGameScreens,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
