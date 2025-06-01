import Result from "./Result";

interface ResultsTypes {
    data: any[];
    showType: number;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Results = ({ data, showType, setIsLoading }: ResultsTypes) => {
    console.log(data);

    let gameScreens: any = null;
    if (showType === 2) gameScreens = data.map((x) => x);

    return (
        <section className="max-w-[1400px] px-10 mx-auto py-6 pb-60">
            {data && data.length > 0 ? (
                <div className="grid grid-cols-4 gap-4">
                    {data &&
                        data.length > 0 &&
                        data.map((entry) => (
                            <Result
                                key={entry.id}
                                data={entry}
                                showType={showType}
                                setIsLoading={setIsLoading}
                                gameScreens={gameScreens}
                            />
                        ))}
                </div>
            ) : (
                <div className="text-center"></div>
            )}
        </section>
    );
};

export default Results;
//Nothing was found
