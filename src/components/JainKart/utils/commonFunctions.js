// this function will return specific data for particular category
export const filterByCategory = (filter, ProductDetails) => {
    const filteredData = ProductDetails.filter(item => item.Category.toLowerCase().replaceAll(' ','-') === filter)
    return filteredData
}

// this function will return full data with category as key 
export const splitByCategory = (data) => {
    const categories = {};
    data.forEach((item) => {
        if (!categories[item.Category]) {
        categories[item.Category] = [];
        }
        categories[item.Category].push(item);
    });
    return categories;
}