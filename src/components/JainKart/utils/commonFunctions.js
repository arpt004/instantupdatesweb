// this function will return all objects for particular category
export const filterByCategory = (filter, ProductDetails) => {
    const filteredData = ProductDetails.filter(item => item.category.toLowerCase().replaceAll(' ','-') === filter.toLowerCase().replaceAll(' ','-'))
    return filteredData
}

// this function will split all the data with category as key 
export const splitByCategory = (data) => {
    const categories = {};
    data.forEach((item) => {
        if (!categories[item.category]) {
        categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    return categories;
}

// this function return the object based on DeviceCatalogId
export const filterByProductId = (filterId, ProductDetails) => {
    const filteredData = ProductDetails.filter(
      (item) => Number(item.devicecatalogid) === Number(filterId)
    );
    return filteredData[0];
};