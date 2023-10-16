import gsmarena from 'gsmarena-api';

export const fun = async (device) => {
    try {
        const brands = await gsmarena.search.search(device);
        return brands;
    } catch (error) {
        console.error('An error occurred:', error);
        // Handle the error as needed
    }
}

