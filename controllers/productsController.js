const prisma = require('../prismaClient');

// 1. Получить все товары
const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};

// 2. Получить один товар по ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID товара' });
        }

        const product = await prisma.product.findUnique({
            where: { id: numericId }
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Товар не найден' });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        console.error('Ошибка при получении товара:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};

// 3. Создать новый товар
const createProduct = async (req, res) => {
    try {
        const { title, price, quantity } = req.body;

        if (!title || !price) {
            return res.status(400).json({
                success: false,
                message: 'Пожалуйста, укажите название и цену товара'
            });
        }

        const newProduct = await prisma.product.create({
            data: {
                title,
                price: Number(price),
                quantity: Number(quantity) || 0
            }
        });

        res.status(201).json({
            success: true,
            message: 'Товар успешно добавлен',
            data: newProduct
        });
    } catch (error) {
        console.error('Ошибка при создании товара:', error);
        res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }
};

// 4. Обновить товар по ID
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID товара' });
        }

        const { title, price, quantity } = req.body;

        const updatedProduct = await prisma.product.update({
            where: { id: numericId },
            data: {
                ...(title && { title }),
                ...(price !== undefined && { price: Number(price) }),
                ...(quantity !== undefined && { quantity: Number(quantity) })
            }
        });

        res.json({
            success: true,
            message: 'Товар успешно обновлен',
            data: updatedProduct
        });
    } catch (error) {
        console.error('Ошибка при обновлении товара:', error);
        res.status(500).json({ success: false, message: 'Товар не найден или ошибка сервера' });
    }
};

// 5. Удалить товар по ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ success: false, message: 'Некорректный ID товара' });
        }

        await prisma.product.delete({
            where: { id: numericId }
        });

        res.json({
            success: true,
            message: 'Товар успешно удален'
        });
    } catch (error) {
        console.error('Ошибка при удалении товара:', error);
        res.status(500).json({ success: false, message: 'Товар не найден или ошибка сервера' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
