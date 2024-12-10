export const fetchAPI = async (url) => {
    try {
        let r = await fetch(url);
        let data = await r.json();
        return data;
    } catch (error) {
        alert(error.message);
    }
}