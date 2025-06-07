interface illustrationHistory {
  id: string;
  userId: string;
  title: string;
  date:Date
}[]

const HISTORY_KEY = 'illustration_history';

// Save history to localStorage
function saveIllustrationHistory(history: illustrationHistory[]): void {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
        console.error('Failed to save illustration history to localStorage:', error);
    }
}

// Get history from localStorage
function getIllustrationHistory(): illustrationHistory[] {
    try {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (!saved) return [];
        
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        return parsed.map((item: any) => ({
            ...item,
            date: new Date(item.date)
        }));
    } catch (error) {
        console.error('Failed to get illustration history from localStorage:', error);
        return [];
    }
}

// Add a new item to the history
function addToIllustrationHistory(item: illustrationHistory): void {
    const history = getIllustrationHistory();
    history.push(item);
    saveIllustrationHistory(history);
}

// Clear the history
function clearIllustrationHistory(): void {
    try {
        localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
        console.error('Failed to clear illustration history from localStorage:', error);
    }
}

window.addEventListener('load', () => {
    // Check if the current URL matches the /artworks/:id pattern
    const path = window.location.pathname;
    const match = path.match(/^\/artworks\/([^\/]+)$/);

    if (match) {
        const artworkId = match[1];
        
        // Get the artwork details using the ID
        const history = getIllustrationHistory();
        const artwork = history.find(item => item.id === artworkId);
        
        if (artwork) {
            // Display the artwork details on the page
            // You might want to implement a function to render artwork details
            console.log('Found artwork:', artwork);
            // renderArtworkDetails(artwork);
        } else {
            console.error('Artwork not found with ID:', artworkId);
            // Handle not found case - perhaps redirect or show error message
        }
    }
})