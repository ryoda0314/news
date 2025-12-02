import { fetchFeeds } from '../src/lib/fetchFeeds';

async function main() {
    console.log('Testing fetchFeeds...');
    try {
        const items = await fetchFeeds();
        console.log(`Fetched ${items.length} items.`);
        if (items.length > 0) {
            console.log('First item:', items[0].title);
        }
    } catch (error) {
        console.error('Error fetching feeds:', error);
    }
}

main();
