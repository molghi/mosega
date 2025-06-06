// Format date
export const formatDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long", // full month name
    day: "numeric",
});

// Format budget
export const formatBudget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
});

// Format runtime
export const formatRuntime = (runtime: number): string => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
};
