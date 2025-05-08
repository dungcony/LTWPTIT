
const FetchBlog = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTimeout(async () => {
            const response = await fetch("http://localhost:8080/blogs");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();

            return result
        }, 1000);

    } catch (error) {
        return null
    } finally {
        return null
    }
};

const FetchDescBlog = async (id) => {
    try {

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(`http://localhost:8080/blog/${id}`);
        if (!response.ok) throw new Error("Không thể lấy bài viết");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Lỗi khi lấy bài viết ${id}:`, error);
        return null;
    }
};

export { FetchBlog, FetchDescBlog };